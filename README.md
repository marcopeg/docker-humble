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

## mysql-seed

Seed `/data/dump/mysql-dump.sql` into the database `db_name` of the service named `mysql`:

```
./compose utils mysql-seed my-dump.sql db_name
```

Seed `/data/dump/mysql-dump.sql` into the database `db_name` of the service named `db_host`:

```
./compose utils mysql-seed my-dump.sql db_host://db_name
```