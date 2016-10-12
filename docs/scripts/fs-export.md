# Docker Humble
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## fs-export

Copy files from target service into the host file system:

```
./humble utils fs-export blog://var/www/html/wp-content/uploads backup/uploads
```

It takes the content of `/var/www/html/wp-content/uploads` of the service named `blog` and copy it recursively into `$PWD/backup/uploads`.

- it will automatically create the host folder structure if missing
- it will override the target files
- it will not delete existing files from the host's target folder