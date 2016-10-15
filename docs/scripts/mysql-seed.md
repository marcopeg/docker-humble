# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## mysql-seed

Seed `/data/backup/mysql-dump.sql` into the database `db_name` of the service named `mysql`:

```
./humble utils mysql-seed my-dump.sql dbName
```

Seed `/data/backup/mysql-dump.sql` into the database `db_name` of the service named `db_host`:

```
./humble utils mysql-seed my-dump.sql service://dbName
```

## Environment Variables

```
BACKUP_ROOT             # default: "data/backup"

MYSQL_HOST              # default: "mysql""
MYSQL_USER              # default: "root"
MYSQL_PASSWORD          # default: "root"
MYSQL_DB                # default: "wordpress"
```

## File Name Conventions

The seed source file name is the first argument (and it is optional).

```
Filename:
mysql___wordpress___20161010-153008.sql.gz

Parses as:
{serviceName}___{dbName}___20161010-153008.sql{.compression}
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

The `{serviceName}` portion is optional and will be defaulted to `$MYSQL_HOST` environment variable.

The `{dbName}` portion is defaulted to `$MYSQL_DB` environment variable.

