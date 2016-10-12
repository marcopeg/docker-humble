# Docker Utils
> Smooth Experience for Developing and Deploying with Docker  
> [Go to README &raquo;](../../README.md)



## add-dir

Copy files from host file system into a target service:

```
./compose add-dir ./backup/uploads blog://var/www/html/wp-content/uploads
```

It takes the content of `./backup/uploads` and copy it recursively into `/var/www/html/wp-content/uploads` of the service named `blog`.

- it doesn't verify for folders to exists
- it will override the target files
- it will not delete other existing files from the container