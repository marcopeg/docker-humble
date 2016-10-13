# Docker Utils
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)

## Multi Service App

```
mkdir my-project && cd my-project
docker run --rm -v $PWD:/cwd marcopeg/humble /bin/ash scaffold.sh app
./compose up
```
