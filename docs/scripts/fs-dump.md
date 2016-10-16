# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## fs-dump

Export a service folder into a versioned archive that can be seeded later on

```
./humble utils fs-dump blog://var/www/html/wp-content/uploads [fileName]
```

Will create:

```
./data/backup/blog___var.www.html.wp-content.uplads___20161011-134942.tar.gz
```

## Environment Variables

```
BACKUP_ROOT             # default: "data/backup"
BACKUP_DATE_FORMAT      # default: "+%Y%m%d.%H%M%S"

BACKUP_FS_DUMP_FORMAT   # default: "%s___%p___%d"
```

## Skip Feedback

If you want to skip visual feedback append `--now` as last parameter.