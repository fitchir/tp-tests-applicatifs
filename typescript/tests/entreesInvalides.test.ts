// PARTIE 2 - Tests des ENTREES INVALIDES.

import { describe, it, expect } from "vitest";
import { Task } from "../src/task.js";
import { InvalidInputError } from "../src/errors.js";
import {
  validateTitle,
  validatePriority,
  validateStatus,
  validateDueDate,
  TITLE_MAX,
} from "../src/validators.js";

describe("Entrees invalides", () => {
  it("titre vide est rejete", () => {
    expect(() => validateTitle("")).toThrow(InvalidInputError);
  });

  it("titre uniquement des espaces est rejete", () => {
    expect(() => validateTitle("   ")).toThrow(InvalidInputError);
  });

  it("titre trop long est rejete", () => {
    expect(() => validateTitle("x".repeat(TITLE_MAX + 1))).toThrow(InvalidInputError);
  });

  it("titre non-string est rejete", () => {
    expect(() => validateTitle(42 as unknown as string)).toThrow(InvalidInputError);
  });

  it("priorite inconnue est rejetee", () => {
    expect(() => validatePriority("urgent")).toThrow(InvalidInputError);
  });

  it("statut inconnu est rejete", () => {
    expect(() => validateStatus("en_pause")).toThrow(InvalidInputError);
  });

  it("date non ISO est rejetee", () => {
    expect(() => validateDueDate("31/12/2026")).toThrow(InvalidInputError);
  });

  it("date inexistante (30 fevrier) est rejetee", () => {
    expect(() => validateDueDate("2026-02-30")).toThrow(InvalidInputError);
  });

  it("creer une Task avec titre vide est rejete", () => {
    expect(() => new Task({ id: 1, title: "" })).toThrow(InvalidInputError);
  });

  // TODO ELEVE : ajoutez au moins 1 test d'entree invalide supplementaire.

  it("date 29 fevrier annee non bissextile est rejetee", () => {
    // 2025 n'est pas bissextile
    expect(() => validateDueDate("2025-02-29")).toThrow(InvalidInputError);
  });
});
