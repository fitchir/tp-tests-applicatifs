"""PARTIE 4 - Tests de REGRESSION.

But : capturer un bug SPECIFIQUE deja rencontre, pour qu'il ne revienne JAMAIS.
La regle : on nomme le test avec l'ID du bug et un resume.

A FAIRE PAR L'ELEVE :
1. Trouver le bug dans src/task_manager.py (indice : delete_task).
2. Ecrire ici le test qui demontre le bug -> il doit ECHOUER en l'etat.
3. Corriger le code dans src/task_manager.py.
4. Relancer pytest -> le test doit DESORMAIS passer.
5. Commit avec le message : "fix(bug-001): delete_task utilise l'id, plus l'index"
"""

import pytest
from src.task_manager import TaskManager


@pytest.mark.regression
def test_bug_001_delete_task_supprime_par_id_pas_par_index():
    """
    Bug initial : delete_task(task_id) appelait self._tasks.pop(task_id)
    et traitait l'argument comme un INDEX, pas comme un ID.

    Scenario qui revele le bug :
        - On cree 3 taches (ids 1, 2, 3)
        - On supprime celle d'id=2
        - Le manager doit contenir desormais SEULEMENT les taches 1 et 3
    """
    mgr = TaskManager()
    mgr.create_task("Tache id=1")
    mgr.create_task("Tache id=2 - a supprimer")
    mgr.create_task("Tache id=3")

    mgr.delete_task(2)

    ids_restants = sorted(t.id for t in mgr.list_tasks(sort_by="id"))
    assert ids_restants == [1, 3], (
        f"Bug-001 : delete_task(2) devrait supprimer la tache id=2, "
        f"mais il reste {ids_restants}"
    )


# ------------------------------------------------------------------
# TODO ELEVE - Partie 4 :
# Ajoutez un 2eme test de regression qui couvre un autre scenario
# revelateur du meme bug. Ex : supprimer la derniere tache.
# ------------------------------------------------------------------
@pytest.mark.regression
def test_bug_001_delete_task_inexistante_leve_une_erreur():
    """
    Variante du bug-001 : tenter de supprimer une tache avec un id
    qui n'existe pas doit lever TaskNotFoundError, pas supprimer
    silencieusement une tache au hasard.
    """
    from src.exceptions import TaskNotFoundError
    mgr = TaskManager()
    mgr.create_task("Tache id=1")
    mgr.create_task("Tache id=2")

    with pytest.raises(TaskNotFoundError):
        mgr.delete_task(999)

    # Les deux taches doivent toujours etre presentes
    ids_restants = sorted(t.id for t in mgr.list_tasks(sort_by="id"))
    assert ids_restants == [1, 2]