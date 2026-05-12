"""PARTIE 1 - Tests unitaires des validateurs (fonctions pures, sans etat)."""

import pytest
from src.validators import (
    validate_title,
    validate_priority,
    validate_status,
    validate_due_date,
)


@pytest.mark.unitaire
def test_validate_title_renvoie_chaine_propre():
    assert validate_title("  Faire le menage  ") == "Faire le menage"


@pytest.mark.unitaire
def test_validate_priority_accepte_high():
    assert validate_priority("high") == "high"


@pytest.mark.unitaire
def test_validate_status_accepte_done():
    assert validate_status("done") == "done"


@pytest.mark.unitaire
def test_validate_due_date_accepte_iso():
    assert validate_due_date("2026-12-31") == "2026-12-31"


@pytest.mark.unitaire
def test_validate_due_date_none_renvoie_none():
    assert validate_due_date(None) is None

@pytest.mark.unitaire
def test_validate_title_accepte_un_seul_caractere():
    assert validate_title("A") == "A"


@pytest.mark.unitaire
def test_validate_priority_accepte_low():
    assert validate_priority("low") == "low"