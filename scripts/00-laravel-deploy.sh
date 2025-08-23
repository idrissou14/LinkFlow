#!/usr/bin/env bash
# Script de déploiement pour Laravel sur Render
 
# Arrête le script si une commande échoue
 set -o errexit
 
 echo "Lancement du script de déploiement..."
 
# Installation des dépendances Composer
echo "Installation des dépendances Composer..."
composer install --no-interaction --no-dev --prefer-dist
 
# Lancement des migrations de la base de données
 echo "Lancement des migrations..."
 php artisan migrate --force

# Nettoyage des caches
 echo "Nettoyage des caches..."
 php artisan cache:clear
 php artisan config:clear
 php artisan route:clear
 php artisan view:clear
 
 echo "Script de déploiement terminé."
