# TODO

## Général
- Bouger la creation de tables dans assets
- ~~Bouger le server.js dans un endroit plus logique~~
- ~~Mettre message quand aucun trajet trouvé~~
- rendre la recherche de trajet insensible à la casse

##FIXME
- ~~Trouver pourquoi apres login la vue auth (inscription|connexion) ne se met pas a jour~~


## Fonctionnalités minimales attendues
- Base MongoDB avec au moins les collections
  - ~~membres (rôle admin/non admin) (users)~~
  - trajets
  - trajetsTypes (si la distance entre deux villes ne peut  être récupérée automatiquement) (à moins qu'on ne pase par l'API google maps)
  - vehicules
  - (Avis) (les infos peuvent être intégrées à membres)
- Serveur Node avec autant de services web que nécessaires
  - Attention à la recherche doit être multifonctions
    - (Ville depart, ville arrivée, prix max, conducteur, avis sur le conducteur, date)
-Appli Angular
  - au moins les deux modules
    - membres (users)
    - trajets
  - Tri des trajets par prix ou par horaire
  - Inscription

## Bonus
- Visualisation trajet sur une carte
- Contrôleur (fortement conseillé)
- Gestion de rôles via des guards
- Statistiques
- (Etapes) (hard !)

## Bonus perso
- Faire l'autocompletion sur les villes départ / arrivée
- Faire l'upload d'image pour genre les profils et voitures
