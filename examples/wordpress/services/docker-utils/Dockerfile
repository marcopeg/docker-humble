FROM alpine:latest
RUN apk add --no-cache mysql-client
ADD . /scripts

VOLUME /data
VOLUME /data/dump

CMD ["/bin/ash"]
