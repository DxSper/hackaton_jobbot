### Connexion au serveur Azure (Django + React)

Pour vous connecter au serveur Azure, utilisez SSH avec votre clé privée et le mot de passe root :

```bash
ssh -i chemin/vers/le/fichier.pem Equipe11@your.ip.addy
su root
your_password
```

### Connexion au serveur de base de donnée

```bash
psql -h serverdata11.postgres.database.azure.com -p 5432 -U userjob postgres
Password: your_password
```
