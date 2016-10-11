#
# Scaffold a multi service app
#

cp -f /install/compose  /cwd/
cp -f /scaffold/app/*.*  /cwd/
cp -f /scaffold/app/.env  /cwd/
cp -rf /scaffold/app/services  /cwd/
