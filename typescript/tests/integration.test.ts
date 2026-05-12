// PARTIE 3 - Tests d'INTEGRATION (taskManager + storage).

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TaskManager } from "../src/taskManager.js";
import { saveTasks, loadTasks } from "../src/storage.js";

describe("Integration : storage + taskManager", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tp-tests-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("sauvegarder puis recharger preserve les taches", () => {
    const fichier = join(tmpDir, "taches.json");
    const mgr = new TaskManager();
    mgr.createTask({ title: "Tache A", priority: "low" });
    mgr.createTask({ title: "Tache B", priority: "high" });

    saveTasks(fichier, mgr.listTasks({ sortBy: "id" }));

    const rechargees = loadTasks(fichier);
    expect(rechargees.length).toBe(2);
    expect(rechargees[0].title).toBe("Tache A");
    expect(rechargees[1].priority).toBe("high");
  });

  it("chargement depuis un fichier inexistant renvoie []", () => {
    expect(loadTasks(join(tmpDir, "inexistant.json"))).toEqual([]);
  });

  it("replaceAll remet le compteur d'id a la bonne valeur", () => {
    const fichier = join(tmpDir, "taches.json");
    const mgr1 = new TaskManager();
    mgr1.createTask({ title: "Existante" });
    saveTasks(fichier, mgr1.listTasks({ sortBy: "id" }));

    const mgr2 = new TaskManager();
    mgr2.replaceAll(loadTasks(fichier));
    const nouvelle = mgr2.createTask({ title: "Suivante" });
    expect(nouvelle.id).toBe(2);
  });
  it("modifier une tache puis verifier la persistance", () => {
    // Arrange
    const fichier = join(tmpDir, "taches.json");
    const mgr = new TaskManager();
    mgr.createTask({ title: "Tache a modifier", priority: "low" });

    // Act : on marque la tache comme done puis on sauvegarde
    mgr.markDone(1);
    saveTasks(fichier, mgr.listTasks());

    // Assert : apres rechargement, le statut est bien "done"
    const rechargees = loadTasks(fichier);
    expect(rechargees[0].status).toBe("done");
  });
});
