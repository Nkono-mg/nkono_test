Projet Nkono Test
Partie Backend
Lancer le serveur Node.js
cd nkono_test/nodejs
npm install
npm run dev

API Endpoints
🔹 Récupération de la liste des logs
GET http://localhost:5000/api/logs/all

Paramètres possibles :

search : rechercher un collaborateur par nom ou matricule (pin)

date : filtrer sur une date précise

dateDebut et dateFin : filtrer sur une plage de dates

page : numéro de page pour la pagination (par défaut 1)

limit : nombre d’éléments par page (par défaut 20)

Exemples :

Rechercher par nom :
http://localhost:5000/api/logs/all?search=Fitahiana

Rechercher par matricule :
http://localhost:5000/api/logs/all?search=103

Filtrer par plage de dates :
http://localhost:5000/api/logs/all?dateDebut=2025-01-01&dateFin=2025-01-31

Partie Frontend
Lancer le frontend React
cd frontend
npm install
npm start

Le serveur démarre par défaut sur :
👉 http://localhost:3000

Calcul de présence et pauses

Pour simplifier et avoir des chiffres réalistes :

Un collaborateur travaille 8h par jour

Il prend 1h de pause par jour

Total présence effective par jour = 8h

Total avec pause = 9h

Extrait du contrôleur backend :

const maxWorkPerDay = 8;
const maxPausePerDay = 1;

Dépôt Git public
https://github.com/Nkono-mg/nkono_test
