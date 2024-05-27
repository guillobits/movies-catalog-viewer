# Movie//List - a TMDB WebApp

Réalisation du test "ReseauEntourage/test-technique-front" par [Guillaume CAUCHOIS](https://github.com/guillobits)

## Introduction

Cette application est développée pour répondre aux exigences du test technique front-end d'Entourage social. Elle utilise l'API de TMDB pour afficher les informations des films.


## Choix techniques

### Framework
- Next.js 14.2.3: J'ai choisi Next.js pour plusieurs raisons. Next.js offre des fonctionnalités avancées telles que le rendu côté serveur (SSR), la génération de pages statiques (SSG) et une configuration simplifiée pour la gestion des routes avec le nouvel App Router. Ces fonctionnalités permettent de créer une application performante et évolutive. Elle m'a également permis d'utiliser la même stack que celle utilisée par Entourage.

### State Management
- Redux: J'ai opté pour redux pour utiliser le même state manager qu'utilisé par Entourage. Au vu de la petite taille du projet, j'aurais également pu opter pour la contexte API native de React.js

### Autres technologies
- TypeScript: Pour des raisons de robustesse et de maintenabilité du code.
- TailWindCSS et Shadcn: Pour avoir une base de composant
- Fetch API: Pour les requêtes HTTP vers l'API Movie Database sans ajouter de sur-couche est utilisé la librairie native.

## Temps passé
En dehors de la lecture du sujet, des recherches effectuées, d'aller-retour pour essayer des choses différentes, je pense avoir passé une bonne journée de travail dessus.

## Fonctionnalités
- Affichage des derniers films: L'utilisateur peut voir les derniers films sur la page d'accueil.
- Affichage des films dans l'ordre: L'utilisateur peut trier les films par leur ordre de sortie.
- Affichage des détails d'un film: L'utilisateur peut voir les détails d'un film sur une page dédiée.
- Suggestions de films: L'utilisateur peut voir les suggestions alternatives en rapport avec un film sur la page de détails.

### Fonctionnalités "Bonus" (pas clairement demandées dans les consignes)

- Déploiement de l'application sur une instance Vercel
- Petite base de test E2E
- (Jolie) design responsive avec light / dark mode inspiré de Netflix
- "Load more" pour afficher plus de films

### Idées d'évolution du projet
- Les fonctionnalités de liste perso / rating proposés par l'énoncé du test
- Implémenter une recherche par nom et d'autres filtres
- Proposer plus de types de tri dans la page d'accueil
- Afficher les séries TV et ajouter une section spécifique
- Plus de tests
- etc...

# Installation et lancement de l'application

## Prérequis
- Node.js (version 14.x ou supérieure)
- Yarn ou npm

## Etapes d'installation

1. Cloner le dépôt:
```
git clone https://github.com/guillobits/movies-catalog-viewer
cd movies-catalog-viewer
```

2. Installer les dépendances:
```
yarn install
# ou
npm install
```

3. Configurer les variables d'environnement:
Créez un fichier .env.local à la racine du projet et ajoutez votre clé API de TMDB:
```
TMDB_API_KEY==YOUR_API_KEY_HERE
```

4. Lancer l'application en mode développement:
```
yarn dev
# ou
npm run dev
```

5. Accéder à l'application:
Ouvrez votre navigateur et allez sur http://localhost:3000.

# Conclusion
Ce projet démontre l'utilisation de Next.js avec React pour créer une application web performante et moderne. Le choix d'utiliser le Context API pour la gestion de l'état a été fait pour sa simplicité et son efficacité dans ce contexte spécifique.

## Visualiser le projet

> Ouvrez votre navigateur et allez sur https://movie--list.vercel.app/

