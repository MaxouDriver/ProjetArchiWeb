# Projet Architecture Web SERVER

### Tech

Le cote serveur utilise plusieurs bibliothèques pour fonctionner :

* [body-parser] - Parser pour le body des requettes
* [express] - Utilisation du router pour la gestion des "API endpoints"
* [firebase-admin] - Base de données
* [forever] - Outils permettant de lancer le serveur, jusqu'au redemarrage du PC
* [nodemon] - Outils permettant de relancer le serveur après chaque modification, de manière automatique
* [node-cache] - Gestionnaire du cache
* [node-geocoder] - Outils nous permettant d'avoir les coordonnées liés a une adresse. (Utilisé car l'API des musées ne donne pas toutes les coordonnées que l'on a besoin pour notre carte sur le client).
* [nodemailer] - Outils permettant d'envoyer des mails (Partie contact de l'application)

### Installation

Pour installer toutes les dépendances nécessaires  : 

```sh
$ yarn install
```

Puis pour lancer le serveur : 

```sh
$ forever start -c nodemon server.js
```

Puis avoir les logs du serveur : 

```sh
$ forever -f logs server.js
```
