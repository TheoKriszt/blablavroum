# TODO

## Général
- ~~Bouger la creation de tables dans assets~~
- ~~Bouger le server.js dans un endroit plus logique~~
- ~~Mettre message quand aucun trajet trouvé~~
- rendre la recherche de trajet insensible à la casse (Lyon == lyon == LYON)
- ~~ajouter verif formulaire avant envoi de recherche~~
- faire qu'un admin puisse promouvoir / révoquer un utilisateur admin
- pouvoir lister/supprimer un user depuis l'interface admin
- mettre l'affichage des dates des trajets au format français
- crypter le MDP
- En page d'accueil, afficher les derniers trajets publiés ?
- ~~verifier ce qu'il se pass quand login incorrect~~
- ne pouvoir proposer un trajet que si on a enregistré un véhicule
  - ajouter vehicule à crétion de trajet
- faire le truc pour donner des evaluations
- modifier le modèle de vehicule pour {id_proprio, marque, modele, couleur}
- la suppression d'un user entraine la suppression de ses trajets et vehicules
- Archiver les trajets (tag état => passé) après date et heure de trajet
- Ajouter option pour afficher trajets archivés
- Rendre impossible la réservation/liberation d'un trajet archivé
- Rendre possible l'évaluation du conducteur quand trajet archivé
  - Evaluation : trajet_id, from_id, content, value

##Nouveaux composants
- ~~TripProposal : l'utilisateur loggé peut publier un nouveau trajet~~
- ~~ProposedTrips : liste les trajets déjà proposés pas l'utilisateur~~
- TripDetail : page qui permet de consulter les détails / la map du trajet + réserver
- TripShort : affichage résumé (dans une liste) d'un trajet, style dans les résultats de recherche
- ~~TripReservations : liste les réservations en cours / passées d'un user~~
- ~~UserProfile : Affiche & permet d'editer les infos de l'utilisateur~~


##FIXME
- ~~Trouver pourquoi apres login la vue auth (inscription|connexion) ne se met pas a jour~~
- ~~Regler les appels async foireux sur Node/Mongo~~


## Fonctionnalités minimales attendues
- Base MongoDB avec au moins les collections
  - ~~membres (rôle admin/non admin) (users)~~
  - trajets
  - trajetsTypes (si la distance entre deux villes ne peut  être récupérée automatiquement) (à moins qu'on ne pase par l'API google maps)
  - vehicules
  - (Avis) (les infos peuvent être intégrées à membres)
- Serveur Node avec autant de services web que nécessaires
  - Attention à la recherche doit être multifonctions
    - ~~(Ville depart, ville arrivée, date)~~ 
    - (prix max, conducteur, avis sur le conducteur)
- Appli Angular
  - ~~au moins les deux modules~~
    - ~~membres (users)~~
    - trajets
  - ~~Tri des trajets par prix ou par horaire~~
  - ~~Inscription~~

## Bonus
- Visualisation trajet sur une carte (G Maps)
- Contrôleur (fortement conseillé)
- Gestion de rôles via des guards
- Statistiques
- (Etapes) (hard !)

## Polish / code cleaning
- essayer de virer les service / providers injectés mais non nécessaires
- retirer le Montpellier -> Lyon par défaut (recherche & proposal)
- chercher et traiter toutes les références "todo" et "fixme" dans le code


## Bonus perso
- Faire l'autocompletion sur les villes départ / arrivée
- Faire l'upload d'image pour genre les profils et voitures
