// PARTIE 1 - Tests unitaires des validateurs.

import { describe, it, expect } from "vitest";
import {
  validateTitle,
  validatePriority,
  validateStatus,
  validateDueDate,
} from "../src/validators.js";

describe("validators (unitaire)", () => {
  it("validateTitle nettoie les espaces", () => {
    expect(validateTitle("  Faire le menage  ")).toBe("Faire le menage");
  });

  it("validatePriority accepte 'high'", () => {
    expect(validatePriority("high")).toBe("high");
  });

  it("validateStatus accepte 'done'", () => {
    expect(validateStatus("done")).toBe("done");
  });

  it("validateDueDate accepte une ISO valide", () => {
    expect(validateDueDate("2026-12-31")).toBe("2026-12-31");
  });

  it("validateDueDate null renvoie null", () => {
    expect(validateDueDate(null)).toBeNull();
  });
  // Tests supplementaires validators
  it("validateTitle accepte un titre d'un seul caractere", () => {
    expect(validateTitle("A")).toBe("A");
  });

  it("validatePriority accepte 'low'", () => {
    expect(validatePriority("low")).toBe("low");
  });
});
