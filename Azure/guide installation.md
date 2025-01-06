Guide d'Installation
Prérequis

    Python (v3.8 ou supérieur)
    Node.js (v14.x ou supérieur)
    npm (v6.x ou supérieur) ou yarn (v1.x ou supérieur)

Étapes pour le Backend

    Configurer l'environnement virtuel et installer les dépendances :

    bash

Set-ExecutionPolicy RemoteSigned
.\venv\Scripts\Activate.ps1
python.exe -m pip install --upgrade pip
pip install asgiref autopep8 Django django-cors-headers djangorestframework djangorestframework-simplejwt pycodestyle PyJWT pytz sqlparse toml tzdata --upgrade
pip install -U django-jazzmin
pip install django-import-export django-crispy-forms django-mathfilters django-ckeditor-5 django-taggit djangorestframework django-cors-headers django-ckeditor django-ckeditor5 django-taggit rest_framework_simplejwt django-taggit djangorestframework-simplejwt shortuuid
pip install mistralai

Accéder au répertoire du backend et effectuer les migrations :

bash

cd backend
pip install -r requirements.txt
python manage.py migrate

Créer un super utilisateur pour accéder au panneau d'administration :

bash

python manage.py createsuperuser

(Ou utiliser les informations d'identification de test : desper22@pm.me, mot de passe : barathon123jobbot)

Démarrer le serveur Django :

bash

    python manage.py runserver

    Le panneau d'administration sera accessible à l'adresse suivante :
    http://127.0.0.1:8000/admin/login/?next=/admin/

Étapes pour le Frontend

    Ouvrir un nouveau terminal et accéder au répertoire du frontend :

    bash

cd frontend

Installer les dépendances nécessaires :

bash

npm install react-cookie
npm install

Démarrer le serveur de développement React :

bash

    npm start

    Le frontend sera accessible à l'adresse suivante :
    http://localhost:3000

Résumé des URLS Local (attention le projet est actuellement configuré pour notre service Azure)

    Panneau d'administration Django :
    http://127.0.0.1:8000/admin/login/?next=/admin/

    Frontend React :
    http://localhost:3000

Notes

    Assurez-vous que le backend est démarré avant de lancer le frontend pour garantir la communication entre les deux parties.
    Vérifiez que toutes les dépendances sont correctement installées et que les commandes pip install et npm install n'ont pas échoué.
    Utilisez les informations d'identification de test uniquement dans un environnement de développement.

Ce guide vous permet de configurer et de lancer le projet JobBot IA, vous offrant ainsi une plateforme pour simuler des entretiens d'embauche et faciliter la reconversion des militaires.
