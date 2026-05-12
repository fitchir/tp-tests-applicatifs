"""PARTIE 1 - Premier test vert : tests UNITAIRES sur la classe Task.

Objectif : un test = une assertion sur UNE seule unite de comportement.
Pattern AAA : Arrange (preparer) / Act (executer) / Assert (verifier).
"""

import pytest
from src.task import Task


@pytest.mark.unitaire
def test_task_se_cree_avec_titre():
    # Arrange
    titre = "Faire les courses"
    # Act
    tache = Task(id=1, title=titre)
    # Assert
    assert tache.title == titre


@pytest.mark.unitaire
def test_task_a_un_id():
    tache = Task(id=42, title="Apprendre pytest")
    assert tache.id == 42


@pytest.mark.unitaire
def test_task_demarre_en_statut_todo_par_defaut():
    tache = Task(id=1, title="Demarrer le projet")
    assert tache.status == "todo"


@pytest.mark.unitaire
def test_task_priorite_par_defaut_est_medium():
    tache = Task(id=1, title="Une tache")
    assert tache.priority == "medium"


@pytest.mark.unitaire
def test_task_to_dict_renvoie_les_bons_champs():
    tache = Task(id=1, title="Voyager", priority="high")
    d = tache.to_dict()
    assert d["id"] == 1
    assert d["title"] == "Voyager"
    assert d["priority"] == "high"
    assert "created_at" in d


# ------------------------------------------------------------------
# TODO ELEVE : ajoutez vos propres tests unitaires ci-dessous.
# Idees : description optionnelle, sequence priorite low<medium<high,
# format ISO de la date.
# ------------------------------------------------------------------
@pytest.mark.unitaire
def test_task_description_optionnelle():
    tache = Task(id=1, title="Faire les courses")
    assert tache.description == ""

@pytest.mark.unitaire
def test_task_accepte_une_due_date_iso():
    # Arrange
    tache = Task(id=1, title="Réviser", due_date="2025-12-31")
    # Act & Assert
    assert tache.due_date == "2025-12-31"


@pytest.mark.unitaire
def test_task_to_dict_contient_le_titre_et_id():
    # Arrange
    tache = Task(id=42, title="Apprendre pytest")
    # Act
    d = tache.to_dict()
    # Assert
    assert d["title"] == "Apprendre pytest"
    assert d["id"] == 42