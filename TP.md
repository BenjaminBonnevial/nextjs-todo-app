| Utilisateurs | RPS moyen | Temps médian (ms) | p95 (ms) | Erreurs |
| 10 | 4.8 | 81 | 120 | 0 |
| 50 | 24.1 | 88 | 150 | 0 |
| 100 | 35.6 | 570 | 2000 | 0 |
| 200 | 22.1 | 5900 | 10000 | 0 |

À partir de quel palier le temps de réponse dépasse 1 seconde ? : à partir de 200 utilisateurs
À partir de quel palier des erreurs apparaissent ? : aucune erreur dans les 4 paliers
Quelle route est la plus sollicitée ? Pourquoi ? la route GET, 

locust -f parcours.py --host=http://180.149.198.98:80

Combien de routes différentes apparaissent dans le tableau Locust ? : GET & POST /api/tasks, GET & DELETE & PATCH /api/tasks/id
Quelle route a le temps de réponse le plus élevé ? : La route GET, de loin 
Est-ce que des erreurs 404 ou 500 apparaissent ? : Pas d'erreurs 404, mais plusieurs erreurs 500

Quelle route a le RPS le plus élevé ? : Égalité entre GET /api/tasks et POST /api/tasks
Quelle route a le p99 le plus élevé ? : GET /api/tasks
Y a-t-il des échecs ? Sur quelle route ? : Oui, sur la route PATCH avec les IDs dynamiques

Est-ce que l'app se dégrade progressivement ou reste-t-elle stable ? : Oui
p99 passe d’environ 1800 ms au début à ~38000 ms en fin de run.
p95 monte jusqu’à ~34000 ms.
Le max total atteint ~38742 ms.
Le temps moyen total grimpe d’environ 446 ms à ~3204 ms.
En parallèle, le débit instantané baisse après son pic (autour de 24.5 req/s)