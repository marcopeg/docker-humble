
# Docker Humble
> Smooth Experience for Developing and Deploying with Docker

[![Stories in Ready](https://badge.waffle.io/marcopeg/docker-humble?label=ready&title=Ready)](https://waffle.io/marcopeg/docker-humble)

## Where is the Poo?

When I begun to work with [Docker](https://www.docker.com/) I was thrilled about the possibility to launch an ElasticSearch server with a single command line. When I met [docker-compose](https://docs.docker.com/compose/) I was thrilled by the possibility to concatenate many different services into one single application.

> My questioning soared when the time had come for me to deploy.

- how do I distribute my app for different environments?
- where do I store my images?
- are DockerCloud and DockerHub good for me?

Those were not so simple questions to answer and on top of it I had a couple of constrains from my boss:

- we can not ask our frontend developers to become bash experts
- we can not afford a virtual server for each app
- we are making Wordpress websites, we are no SpaceX!

For all we knew a shared virtual hosting based on a _*AMP_ machine was all we needed to run our business, still I was thrilled by the idea to put some simple NodeJS services beside the main Wordpress so to run jobs more efficiently, and wrap it up with _NGiNX_. 

I also pulled out my wish list:

- we should work with whatever language suits the job
- we should be able to run a GitHub based release (aiming for CI)
- we should be able to run our apps in different environments easily

We are still working on a solution, and we are bringing ideas and code together under this repository.  
**And that is how `docker-humble` was born!**

## Mainstream Features

### For your App

- use `docker-compose` commands to run your app (`./humble up`)
- describe different environments with different `docker-compose` files
- use a `.env` file to tell which environment to run
- use our utils image to run boring tasks like:
  - seeding file volumes
  - seeding databases (mysql, postgres, mongo)
  - backup file volumes
  - backup databases

### For your Server

- use `docker-compose` commands to run many multi service apps (`./humble-server up`)
- use a _YAML_ config file to distribute ports and set host names for each app
- automagically run an _NGiNX_ reverse proxy
- achieve zero downtime when deploying new stuff (WiP)

### Scaffolding

We believe in time efficiency so whenever you need to start a new project, we aim to provide you with a ready to use template for it:

- [multi service app](./docs/scaffolds/multi-service-app.md)
- [multi app server](./docs/scaffolds/multi-app-server.md)

### Compose Utility Scripts

- [How to use `docker-humble` in a Compose project](./docs/how-to-use-humble-in-a-docker-compose-project.md)
- File System
  - [fs-seed](./docs/scripts/fs-seed.md)
  - [fs-dump](./docs/scripts/fs-dump.md)
  - [fs-import](./docs/scripts/fs-import.md)
  - [fs-export](./docs/scripts/fs-export.md)
- MySQL
  - [mysql-seed](./docs/scripts/mysql-seed.md)
  - [mysql-dump](./docs/scripts/mysql-dump.md)
  - [mysql-create-db](./docs/scripts/mysql-create-db.md)
- Others
  - [wp-migrate](./docs/scripts/wp-migrate.md)
