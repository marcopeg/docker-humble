
# Docker Compose Wrapper

The pourpose of this utility is to facilitate the execution of a project in multiple environments.

A typical project scenario inolves at least two environments:

- development
- production

The differences may vary from simple settings (which port is being used?) to include additional containers for development or maintenance jobs.

If you are working on a _Wordpress_ project you may want _phpMyAdmin_ during development and some backup utilities in production.

## CLI Interface

With **Docker Compose Wrapper** you run a thin layer around `docker-compose` which implements exactly the same CLI interface.

> If you know how to use `docker-compose` you know how to use `./compose`.

## Environment File

`./compose` needs some basic informations to run therefore you need a `.env` file in your project's root:

```
PROJECT_ENV=development
PROJECT_PORT=8080
```

**NOTE:** `.env` will be loaded by `docker-compose` so every variable you define here you can also use it inside your `*.yml` config files :-) 

**NOTE:** multi word strings must be explicitly exported: `export foo="my name is..."`

## Environment Variables

### PROJECT_ENV

Use this setting to tell `./compose` which _Docker Compose_ file to use. Keep in mind that `./compose` uses the [extension pattern](https://docs.docker.com/compose/extends/) whenever is possible.

```
PROJECT_ENV=default -> docker-compose.yml
PROJECT_ENV=development -> docker-compose.development.yml
```

### PROJECT_PORT

We assume that a _Docker Compose_ application runs on a very specific port and probably behind a private _NGiNX_ proxy. Therefore we encourage to use this variable inside your `docker-compose.yml` file so to obtain a very dynamic setup:

```
services:
  proxy:
    image: nginx
    ports:
      - ${PROJECT_PORT}:80
		
```


	
