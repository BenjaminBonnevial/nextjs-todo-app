from locust import HttpUser, task, between

class ParcoursUtilisateur(HttpUser):
    wait_time = between(1, 2)

    @task
    def parcours_complet(self):

        # Étape 1 — Consulter la liste
        self.client.get("/api/tasks")

        # Étape 2 — Créer une tâche
        reponse = self.client.post("/api/tasks", json={
            "title": "Tâche Locust",
            "description": "Test parcours complet"
        })

        # Gestion d'erreur : si la création échoue, on arrête
        if reponse.status_code != 201:
            return

        # Récupération sécurisée de l'ID
        try:
            tache = reponse.json()
            task_id = tache.get("id")
        except:
            return

        if not task_id:
            return

        # Étape 3 — Consulter le détail
        self.client.get(f"/api/tasks/{task_id}")

        # Étape 4 — Marquer comme terminée
        self.client.patch(f"/api/tasks/{task_id}", json={
            "completed": True
        })

        # Étape 5 — Supprimer la tâche
        self.client.delete(f"/api/tasks/{task_id}")
