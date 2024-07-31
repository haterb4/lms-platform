# LMS Backend Repository

## Introduction
Ce dépôt contient le code source du backend de notre application LMS (Learning Management System). Le backend est divisé en plusieurs microservices pour une meilleure modularité et maintenabilité.

## Microservices

### 1. Authentication Service
- **Description**: Gère l'authentification des utilisateurs, y compris l'inscription, la connexion et la gestion des tokens.
- **Technologies**: Express JS, Typescrit, Mongo DB
- **Endpoints**:
  - `POST /register`: Inscription d'un nouvel utilisateur
  - `POST /login`: Connexion d'un utilisateur
  - `POST /refresh-token`: Rafraîchissement du token d'authentification

### 2. Content Management Service
- **Description**: Gère la création, la mise à jour et la suppression de contenu éducatif.
- **Technologies**: Express JS, Typescrit, Mongo DB
- **Endpoints**:
  - `POST /content`: Créer un nouveau contenu
  - `PUT /content/:id`: Mettre à jour un contenu existant
  - `DELETE /content/:id`: Supprimer un contenu

### 3. Courses Management Service
- **Description**: Gère la création, la mise à jour et la suppression des cours.
- **Technologies**: Express JS, Typescrit, Mongo DB
- **Endpoints**:
  - `POST /courses`: Créer un nouveau cours
  - `PUT /courses/:id`: Mettre à jour un cours existant
  - `DELETE /courses/:id`: Supprimer un cours

### 4. User Service
- **Description**: Gère les informations et les profils des utilisateurs.
- **Technologies**: Express JS, Typescrit, Mongo DB
- **Endpoints**:
  - `GET /users`: Récupérer la liste des utilisateurs
  - `GET /users/:id`: Récupérer les informations d'un utilisateur spécifique
  - `PUT /users/:id`: Mettre à jour les informations d'un utilisateur

### 5. Video Streaming Service
- **Description**: Gère le streaming vidéo pour les cours en ligne. Pour l'instant les fichiés vidéos sont stocké sur google drive
- **Technologies**: Express JS, Typescrit, Mongo DB
- **Endpoints**:
  - `GET /videos/:id/stream`: Streamer une vidéo spécifique
  - `POST /videos`: Télécharger une nouvelle vidéo
  - `DELETE /videos/:id`: Supprimer une vidéo

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/lms-backend.git
