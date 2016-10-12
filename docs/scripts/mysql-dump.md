# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## mysql-dump

Dump data from `wordpress` databas in `mysql` service to `/data/mysql-dump/mysql.wordpress.20161010-153008.sql.gz` (default settings)

```
./humble utils mysql-dump
```

Dump data from `typo3` database in `db2` service to `/data/mysql-dump/db2.typo3.20161010-153008.sql.gz` (default settings)


```
./humble utils mysql-dump db2://typo3
```

## Environment Variables

```
MYSQL_HOST              # default: mysql
MYSQL_USER              # default: root
MYSQL_PASSWORD          # default: root
MYSQL_DB                # $1, default: wordpress
MYSQL_DUMP_ROOT         # default: /data/backup
MYSQL_DUMP_GZIP         # yes/no, default: yes
MYSQL_DUMP_DATE         # add date&time to file name, yes/no, default: yes
MYSQL_DUMP_DATE_FORMAT  # default: +%Y%m%d-%H%M%S
```
