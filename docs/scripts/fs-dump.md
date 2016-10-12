# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## fs-dump

Export a service folder into a versioned archive that can be seeded later on

```
./humble utils fs-dump blog://var/www/html/wp-content/uploads
```

Will create:

```
./data/backup/blog___var.www.html.wp-content.uplads___20161011-134942.tar.gz
```

## Environment Variables

```
FS_SEED_ROOT             # default: data/backup
```