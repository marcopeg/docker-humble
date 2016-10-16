# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## wp-migrate

Utility to migrate a _Wordpress_ database from a dns to another.

```
./humble utils wp-migrate http://old-domain.com http://new-domain.com mysql://wordpress
```


## Environment Variables

```
MYSQL_HOST              # default: mysql
MYSQL_USER              # default: root
MYSQL_PASSWORD          # default: root
MYSQL_DB                # default: wordpress
WP_MIGRATE_FROM         # 
WP_MIGRATE_TP           # 
```

## Skip Feedback

If you want to skip visual feedback append `--now` as last parameter.