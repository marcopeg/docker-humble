# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## fs-seed

Used a `fs-dump` archive to seed a folder in a service

```
./humble utils fs-seed blog___var.www.html.wp-content.uploads___20161011-134942.tar.gz
```

Will seed `/var/www/html/wp-content/uploads` inside `blog` service:

## Environment Variables

```
FS_SEED_ROOT             # default: data/backup
```
