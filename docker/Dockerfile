FROM phusion/baseimage
MAINTAINER Nick Franken <shnick@gmail.com>

RUN apt-get -q update && \
  apt-get -qy install build-essential libssl-dev libxml2-dev && \
  apt-get -y autoremove && \
  apt-get -y clean && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /tmp/*

ADD AmberWebsocketsExample /app/AmberWebsocketsExample.
WORKDIR /app

EXPOSE 80

CMD ["./AmberWebsocketsExample"]