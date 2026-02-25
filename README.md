# Installation locale — Todo App (Next.js + MongoDB + Prisma)

## Prérequis

Avant de commencer, assure-toi d'avoir installé sur ta machine :

- [Node.js](https://nodejs.org/) v18 ou supérieur → `node --version`
- [MongoDB](https://www.mongodb.com/try/download/community) v6 ou supérieur → `mongod --version`
- npm (inclus avec Node.js) → `npm --version`

---

## 1. Forker puis cloner le projet

```bash
git clone <URL_DU_REPO>
cd nextjs-todo-app
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer les variables d'environnement

Copie le fichier d'exemple et adapte-le :

```bash
cp .env.example .env
```

Le fichier `.env` par défaut est déjà configuré pour une installation locale :

```env
DATABASE_URL="mongodb://localhost:27017/todoapp"
```

> Si ton MongoDB tourne sur un port différent ou nécessite une authentification, adapte l'URL en conséquence.

---

## 4. Démarrer MongoDB

Selon ton système d'exploitation :

**macOS (Homebrew)**
```bash
brew services start mongodb-community
```

**Linux (systemd)**
```bash
sudo systemctl start mongod
```

**Windows**
```bash
net start MongoDB
```

Pour vérifier que MongoDB tourne bien :
```bash
mongosh
```
Tu dois voir un prompt `test>` s'afficher.

---

## 5. Initialiser Prisma

```bash
# Génère le client Prisma à partir du schéma
npm run prisma:generate

# Synchronise le schéma avec MongoDB
npm run prisma:push
```

---

## 6. Lancer l'application

```bash
npm run dev
```

L'application est accessible sur : **http://localhost:3000**

---

## Résumé des commandes

```bash
git clone <URL_DU_REPO> && cd nextjs-todo-app
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:push
npm run dev
```

---

## Tester l'API avec curl

```bash
# Créer une tâche
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma première tâche", "description": "Hello world"}'

# Lister toutes les tâches
curl http://localhost:3000/api/tasks

# Marquer une tâche comme terminée (remplace TASK_ID)
curl -X PATCH http://localhost:3000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Supprimer une tâche
curl -X DELETE http://localhost:3000/api/tasks/TASK_ID
```

---

## Problèmes fréquents

**MongoDB ne démarre pas**
Vérifie que le service est bien lancé et que le port 27017 est libre :
```bash
lsof -i :27017
```

**Erreur `PrismaClientInitializationError`**
Le fichier `.env` est manquant ou mal configuré. Vérifie que `DATABASE_URL` est bien défini et que MongoDB est démarré.

**Erreur `Cannot find module '@prisma/client'`**
Tu as oublié de lancer `npm run prisma:generate`. Relance-le.

**Port 3000 déjà utilisé**
Lance l'app sur un autre port :
```bash
PORT=3001 npm run dev
```