FROM alpine:latest
RUN apk add --no-cache mysql-client

ADD ./scripts /scripts
ADD ./install /install
ADD ./scaffold /scaffold

WORKDIR /scripts

VOLUME /cwd
VOLUME /data
VOLUME /data/dump

CMD ["/bin/ash"]
