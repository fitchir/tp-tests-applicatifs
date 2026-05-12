// PARTIE 1 - Premier test vert : tests UNITAIRES sur la classe Task.
// Pattern AAA : Arrange / Act / Assert.

import { describe, it, expect } from "vitest";
import { Task } from "../src/task.js";

describe("Task (unitaire)", () => {
  it("se cree avec un titre", () => {
    // Arrange
    const titre = "Faire les courses";
    // Act
    const tache = new Task({ id: 1, title: titre });
    // Assert
    expect(tache.title).toBe(titre);
  });

  it("garde son id", () => {
    const tache = new Task({ id: 42, title: "Apprendre Vitest" });
    expect(tache.id).toBe(42);
  });

  it("demarre en statut 'todo' par defaut", () => {
    const tache = new Task({ id: 1, title: "Demarrer le projet" });
    expect(tache.status).toBe("todo");
  });

  it("a une priorite 'medium' par defaut", () => {
    const tache = new Task({ id: 1, title: "Une tache" });
    expect(tache.priority).toBe("medium");
  });

  it("expose toDict() avec les bons champs", () => {
    const tache = new Task({ id: 1, title: "Voyager", priority: "high" });
    const d = tache.toDict();
    expect(d.id).toBe(1);
    expect(d.title).toBe("Voyager");
    expect(d.priority).toBe("high");
    expect(d.createdAt).toBeDefined();
  });

  // TODO ELEVE : ajoutez au moins 2 tests unitaires supplementaires ici.
  it("a une description vide par defaut", () => {
    // Arrange
    const tache = new Task({ id: 1, title: "Faire les courses" });
    // Act
    const desc = tache.description;
    // Assert
    expect(desc).toBe("");
  });

  it("accepte une due_date au format ISO", () => {
    // Arrange / Act
    const tache = new Task({ id: 1, title: "Réviser", dueDate: "2025-12-31" });
    // Assert
    expect(tache.dueDate).toBe("2025-12-31");
  });

  it("toDict contient le titre et l'id", () => {
    // Arrange
    const tache = new Task({ id: 42, title: "Apprendre Vitest" });
    // Act
    const d = tache.toDict();
    // Assert
    expect(d.title).toBe("Apprendre Vitest");
    expect(d.id).toBe(42);
    });
});
