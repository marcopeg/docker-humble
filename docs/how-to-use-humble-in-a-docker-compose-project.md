# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../README.md)

## How to use Humble in a Docker Compose project:

Add `docker-humble` image to your `docker-compose.yml` file:

```
services:
  humble:
    image: marcopeg/humble
    volumes:
       - ./data:/data
```

> It it important to connect a `data` volume so to be able to use all the import/export scripts.

