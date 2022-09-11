FROM node:16.10-slim

WORKDIR /var/www

RUN apt-get update \
    && apt-get install -y \
    locales \
    locales-all

RUN update-locale LANG=ja_JP.UTF-8

ENV LANG ja_JP.UTF-8

COPY docker/prd.entrypoint.sh /usr/local/bin

COPY .npmrc /var/www/

RUN chmod +x /usr/local/bin/prd.entrypoint.sh \
    && npm install -g npm

ENTRYPOINT ["/usr/local/bin/prd.entrypoint.sh"]
