# Docker Utils
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../README.md)

## How to use `docker-utils` in a Compose project:

Add `docker-utils` image to your `docker-compose.yml` file:

```
services:
  dockerutils:
    image: marcopeg/docker-utils
    volumes:
       - ./data:/data
```

> It it important to connect a `data` volume so to be able to use all the import/export scripts.

