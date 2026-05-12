// PARTIE 4 - Tests de REGRESSION.
// But : capturer un bug deja rencontre pour qu'il ne revienne JAMAIS.
//
// A FAIRE PAR L'ELEVE :
// 1. Trouver le bug dans src/taskManager.ts (indice : deleteTask).
// 2. Ecrire ici le test qui demontre le bug - il doit ECHOUER tel quel.
// 3. Corriger le code dans taskManager.ts.
// 4. Relancer npm test - le test doit DESORMAIS passer.
// 5. Commit : "fix(bug-001): deleteTask utilise l'id, plus l'index"

import { describe, it, expect } from "vitest";
import { TaskManager } from "../src/taskManager.js";

describe("Regressions", () => {
  it("bug-001 : deleteTask supprime par id (pas par index)", () => {
    const mgr = new TaskManager();
    mgr.createTask({ title: "Tache id=1" });
    mgr.createTask({ title: "Tache id=2 - a supprimer" });
    mgr.createTask({ title: "Tache id=3" });

    mgr.deleteTask(2);

    const idsRestants = mgr.listTasks({ sortBy: "id" }).map((t) => t.id);
    expect(idsRestants).toEqual([1, 3]);
  });

  // TODO ELEVE - Partie 4 :
  // Ajoutez un 2eme test de regression qui couvre un autre scenario du meme bug.
  it("bug-001 : deleteTask sur id inexistant leve une erreur sans supprimer", () => {
    // Arrange
    const mgr = new TaskManager();
    mgr.createTask({ title: "Tache id=1" });
    mgr.createTask({ title: "Tache id=2" });

    // Act & Assert : supprimer un id inexistant doit lever une erreur
    expect(() => mgr.deleteTask(999)).toThrow();

    // Les deux taches doivent toujours etre presentes
    const idsRestants = mgr.listTasks({ sortBy: "id" }).map((t) => t.id);
    expect(idsRestants).toEqual([1, 2]);
  });
});
