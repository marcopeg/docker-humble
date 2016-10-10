[![Stories in Ready](https://badge.waffle.io/marcopeg/docker-utils.png?label=ready&title=Ready)](https://waffle.io/marcopeg/docker-utils)

# docker-utils
Smooth Docker Experience

## Scaffolding

```
$(docker run --rm \
  -v $PWD:/cwd \
  marcopeg/docker-utils \
  /bin/ash scaffold.sh \
  project
)
```