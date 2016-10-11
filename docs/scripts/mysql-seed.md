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
