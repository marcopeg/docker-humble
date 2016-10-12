# Docker Utils
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## mysql-seed

Seed `/data/dump/mysql-dump.sql` into the database `db_name` of the service named `mysql`:

```
./compose utils mysql-seed my-dump.sql db_name
```

Seed `/data/dump/mysql-dump.sql` into the database `db_name` of the service named `db_host`:

```
./compose utils mysql-seed my-dump.sql db_host://db_name
```

## Environment Variables

```
MYSQL_HOST              # default: mysql
MYSQL_USER              # default: root
MYSQL_PASSWORD          # default: root
MYSQL_DB                # $1, default: wordpress
MYSQL_SEED_ROOT         # default: $MYSQL_DUMP_ROOT, default: /data/backup
MYSQL_SEED_DB           # database to seed, default: $MYSQL_DB
```

## File Name Conventions

The seed source file name is the first argument (and it is optional).

```
Filename:
mysql___wordpress.20161010-153008.sql.gz

Parses as:
{serviceName}___{dbName}.20161010-153008.sql{.compression}
```

> This is also the default format used by `mysql-dump` so you can use just an 
> appropriate file name to fully instruct the seed script :-)

## Target Name Conventions

The seed source file name is the second argument (and it is optional).

```
Target name:
mysql://wordpress

Reads as:
{serviceName}://{dbName}
```

The `{serviceName}` portion is optional and will be defaulted to `$MYSQL_DB` environment variable.

