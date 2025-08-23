#utiliaser une image populaire pour laravel
FROM richarvey/nginx-php-fpm:3.1.6

#copier les fichier de l'application dans l'image
COPY . .

#configuration de l'image
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

#configurer l'environement laravel pour la production
ENV APP_ENV production
ENV APP_DEBUG false