# Runic Arena

Runic Arena est un projet développé en Symfony. Ce guide vous aidera à initialiser et lancer le projet localement.

## Prérequis

Assurez-vous que les éléments suivants sont installés sur votre machine :
- PHP 8.1 ou supérieur
- Composer
- Symfony CLI
- Serveur MySQL ou MariaDB (MAMP ou WAMP)

---

## Installation et Lancement du Projet

### 1. Cloner le dépôt
Clonez le dépôt sur votre machine locale :
```bash
git clone https://github.com/RitualCoder/runic-arena.git
cd runic-arena
```

### 2. Installer les dépendances PHP
Utilisez Composer pour installer les dépendances :
```bash
composer install
```

### 3. Configurer les variables d'environnement
Copiez le fichier `.env` par défaut et configurez-le :
```bash
cp .env .env.local
```
Modifiez ensuite les informations de connexion à la base de données dans le fichier `.env.local` :
```
DATABASE_URL="mysql://user:password@127.0.0.1:3306/runic_arena"
```

### 4. Créer la base de données
Exécutez les commandes suivantes pour créer la base de données et appliquer les migrations :
```bash
symfony console doctrine:database:create
symfony console doctrine:migrations:migrate
```

### 5. Lancer le serveur local
Vous pouvez lancer le projet avec Symfony CLI ou PHP intégré :

#### Avec Symfony CLI :
```bash
symfony serve
```

Le projet sera accessible sur [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Commandes utiles

### Exécuter des migrations
```bash
symfony console doctrine:migrations:migrate
```
