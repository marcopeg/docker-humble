#
# Should list all the available scripts
#

echo "SCAFFOLD PROJECT"
cp -f /install/compose  /cwd/
cp -f /scaffold/project/*.*  /cwd/
cp -f /scaffold/project/.env  /cwd/
cp -rf /scaffold/project/services  /cwd/
