FROM php:7.4-apache

COPY . /var/www/html/
RUN apt update && apt upgrade -y 
# RUN pecl install xdebug-2.9.8 && \
#     docker-php-ext-enable xdebug && \
#     echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20131226/xdebug.so" >> /usr/local/etc/php/php.ini && \
#     echo "[xdebug]" >> /usr/local/etc/php/php.ini && \
#     echo "xdebug.remote_enable = 1" >> /usr/local/etc/php/php.ini && \
#     echo "xdebug.remote_connect_back = 0" >> /usr/local/etc/php/php.ini && \
#     echo "xdebug.remote_host = 172.19.0.3" >> /usr/local/etc/php/php.ini && \
#     echo 'xdebug.idekey = "VSCODE"' >> /usr/local/etc/php/php.ini

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite && service apache2 restart

# EXPOSE 80
