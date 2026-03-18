from locust import HttpUser, task, between

class UtilisateurTodoApp(HttpUser):
    wait_time = between(1, 3)  # délai humain entre chaque action

    @task(3)
    def consulter_taches(self):
        self.client.get("/api/tasks")

    @task(1)
    def creer_tache(self):
        self.client.post("/api/tasks", json={
            "title": "Tâche de test",
            "description": "Générée par Locust"
        })