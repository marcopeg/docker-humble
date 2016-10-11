# Docker Utils
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)

## Multi App Server

```
docker run --rm -v $PWD:/cwd marcopeg/docker-utils /bin/ash scaffold.sh server
./compose-server up
```