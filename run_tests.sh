#!/bin/bash

for users in 10 50 100; do
  echo "🚀 Lancement du test avec $users utilisateurs..."
  locust -f parcours.py \
    --headless \
    --users $users \
    --spawn-rate 10 \
    --run-time 30s \
    --host=http://180.149.198.98:80 \
    --csv=rapport_${users}users
  echo "✅ Rapport généré : rapport_${users}users_stats.csv"
done

echo "🎉 Tous les tests sont terminés !"