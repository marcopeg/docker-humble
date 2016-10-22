FROM node:latest

ENV NODE_ENV production
ENV API_ROOT /api

ADD . /usr/src/app
WORKDIR /usr/src/app

RUN ["npm", "install", "--production"]
RUN ["npm", "run", "build"]
RUN ["rm", "-rf", "node_modules"]
RUN ["rm", "-rf", "src"]
RUN ["rm", "-f", ".babelrc"]
RUN ["rm", "-f", "package.json"]
RUN ["rm", "-f", "webpack.config.js"]
RUN ["ls", "-la", "."]

VOLUME /usr/src/app
ENTRYPOINT ["/bin/sh"]
