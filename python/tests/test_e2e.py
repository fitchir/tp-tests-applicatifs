"""PARTIE 4 - Tests END-TO-END (E2E).

On simule un PARCOURS UTILISATEUR COMPLET, du debut a la fin,
via les memes points d'entree que la vraie application.
"""

import pytest
from src.task_manager import TaskManager
from src.storage import save_tasks, load_tasks


@pytest.mark.e2e
def test_parcours_complet_journee_de_travail(tmp_path):
    """Scenario : un utilisateur planifie sa journee, fait une tache, sauvegarde."""
    fichier = tmp_path / "ma_journee.json"

    # 1. L'utilisateur lance l'app : aucune tache
    mgr = TaskManager()
    mgr.replace_all(load_tasks(str(fichier)))
    assert mgr.get_stats()["total"] == 0

    # 2. Il ajoute 3 taches de la journee
    mgr.create_task("Lire mes mails", priority="low")
    mgr.create_task("Reunion equipe a 10h", priority="high")
    mgr.create_task("Reviser pytest", priority="medium")

    # 3. Il consulte sa liste triee par priorite : la reunion remonte
    plus_prioritaire = mgr.list_tasks(sort_by="priority")[0]
    assert plus_prioritaire.title == "Reunion equipe a 10h"

    # 4. Il termine deux taches
    mgr.mark_done(1)
    mgr.mark_done(2)

    # 5. Il consulte les stats avant de fermer l'app
    stats = mgr.get_stats()
    assert stats["done"] == 2
    assert stats["todo"] == 1

    # 6. Il sauvegarde
    save_tasks(str(fichier), mgr.list_tasks(sort_by="id"))

    # 7. Il relance l'app le lendemain : les taches doivent etre la
    mgr2 = TaskManager()
    mgr2.replace_all(load_tasks(str(fichier)))
    assert mgr2.get_stats()["total"] == 3
    assert mgr2.get_stats()["done"] == 2

@pytest.mark.e2e
def test_parcours_suppression_et_verification(tmp_path):
    """Scenario : un utilisateur cree des taches, en supprime une, verifie la coherence."""
    fichier = tmp_path / "taches.json"

    # 1. L'utilisateur cree 3 taches
    mgr = TaskManager()
    mgr.create_task("Tache A", priority="low")
    mgr.create_task("Tache B", priority="high")
    mgr.create_task("Tache C", priority="medium")
    assert mgr.get_stats()["total"] == 3

    # 2. Il supprime la tache B (id=2)
    mgr.delete_task(2)
    assert mgr.get_stats()["total"] == 2

    # 3. Il verifie que seules A et C restent
    titres = [t.title for t in mgr.list_tasks(sort_by="id")]
    assert titres == ["Tache A", "Tache C"]

    # 4. Il sauvegarde et recharge
    save_tasks(str(fichier), mgr.list_tasks(sort_by="id"))
    mgr2 = TaskManager()
    mgr2.replace_all(load_tasks(str(fichier)))

    # 5. Apres rechargement, les donnees sont coherentes
    assert mgr2.get_stats()["total"] == 2
    assert mgr2.list_tasks(sort_by="id")[0].title == "Tache A"
    assert mgr2.list_tasks(sort_by="id")[1].title == "Tache C"