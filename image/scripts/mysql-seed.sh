#
# mysql-seed
#

BACKUP_ROOT=${BACKUP_ROOT:-"data/backup"}

MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-root}

# Compose target database
MYSQL_DB=${2:-$MYSQL_DB}
MYSQL_DB=${MYSQL_DB:-"wordpress"}

# Compose source backup
MYSQL_SEED_FILE_PATH="/$BACKUP_ROOT/$1"
MYSQL_SEED_FORMAT="${MYSQL_SEED_FILE_PATH##*.}"

# Get target database name from file dump (___ as separatpr)
if [[ "" == "$MYSQL_DB" ]]; then
    MYSQL_DB=$(basename "$MYSQL_SEED_FILE_PATH")
    MYSQL_DB="`echo $MYSQL_DB | grep '___' | sed -e's,^\(.*___\).*,\1,g'`"
    MYSQL_DB="${MYSQL_DB%???}"
    MYSQL_DB=$(echo $MYSQL_DB | tr . /)
    MYSQL_DB="${MYSQL_DB/___/://}"
fi


# Get explicit custom host from the command line
CUSTOM_HOST="`echo $MYSQL_DB | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $CUSTOM_HOST ]]; then
    MYSQL_HOST="${CUSTOM_HOST%???}"
    MYSQL_DB=`echo $MYSQL_DB | sed -e s,$CUSTOM_HOST,,g`
fi


echo ""
echo "======== MYSQL SEED ========"
if [ ! -f $MYSQL_SEED_FILE_PATH ]; then
    echo "source file not found!"
    echo "($MYSQL_SEED_FILE_PATH)"
    echo ""
    exit
fi
echo "host:      $MYSQL_HOST"
echo "user:      $MYSQL_USER"
echo "password:  $MYSQL_PASSWORD"
echo "source:    $MYSQL_SEED_FILE_PATH"
echo "target:    $MYSQL_DB"
echo "format:    $MYSQL_SEED_FORMAT"
echo ""
echo "(sleeping 3 secs, you can abort with Ctrl+c)"
sleep 3
echo ""
echo ""

echo "---> seeding data..."
if [[ $MYSQL_SEED_FORMAT == "gz" ]]; then
    TMP_FILE="$MYSQL_SEED_FILE_PATH.$(date +%s).seed"
    TMP_FILE_GZ="$TMP_FILE.gz"
    cp $MYSQL_SEED_FILE_PATH $TMP_FILE_GZ
    gzip -d -f $TMP_FILE_GZ
    mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB < $TMP_FILE;
    rm -f $TMP_FILE
else
    mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB < $MYSQL_SEED_FILE_PATH;
fi

mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -e "show tables;"
echo "---> mysql-seed complete!"
echo ""
echo ""
exit
