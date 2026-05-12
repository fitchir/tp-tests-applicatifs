// PARTIE 2 - Tests des CAS LIMITES (boundaries).

import { describe, it, expect } from "vitest";
import { Task } from "../src/task.js";
import { TaskManager } from "../src/taskManager.js";
import { TITLE_MAX } from "../src/validators.js";
import { InvalidInputError } from "../src/errors.js";

describe("Cas limites", () => {
  it("titre d'un seul caractere est accepte", () => {
    const t = new Task({ id: 1, title: "A" });
    expect(t.title).toBe("A");
  });

  it("titre exactement a la longueur max est accepte", () => {
    const titre = "x".repeat(TITLE_MAX);
    const t = new Task({ id: 1, title: titre });
    expect(t.title.length).toBe(TITLE_MAX);
  });

  it("lister un manager vide renvoie []", () => {
    const mgr = new TaskManager();
    expect(mgr.listTasks()).toEqual([]);
  });

  it("filtrer 'done' alors qu'aucune tache n'est terminee renvoie []", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "Une", priority: "low" });
    mgr.createTask({ title: "Deux", priority: "high" });
    expect(mgr.listTasks({ statusFilter: "done" })).toEqual([]);
  });

  it("stats sur manager vide", () => {
    expect(new TaskManager().getStats()).toEqual({ todo: 0, doing: 0, done: 0, total: 0 });
  });

  // TODO ELEVE : ajoutez 2 tests de cas limites supplementaires.
  it("titre de longueur max+1 est refuse", () => {
    // Frontiere : TITLE_MAX + 1 doit etre rejete
    expect(() => new Task({ id: 1, title: "x".repeat(TITLE_MAX + 1) })).toThrow(InvalidInputError);
  });

  it("manager avec 1000 taches les liste toutes", () => {
    // Volume : gros nombre de taches
    const mgr = new TaskManager();
    for (let i = 0; i < 1000; i++) {
      mgr.createTask({ title: `Tache ${i}` });
    }
    expect(mgr.listTasks().length).toBe(1000);
  });
});
