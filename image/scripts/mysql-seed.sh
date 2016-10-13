



MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-root}

MYSQL_DUMP_ROOT=${MYSQL_DUMP_ROOT:-"/data/backup"}
MYSQL_SEED_ROOT=${MYSQL_SEED_ROOT:-$MYSQL_DUMP_ROOT}

# Compose target database
MYSQL_SEED_DB=${MYSQL_SEED_DB:-$MYSQL_DB}
MYSQL_SEED_TARGET_DB=${2:-$MYSQL_SEED_DB}

# Compose source backup
MYSQL_SEED_SOURCE="$MYSQL_SEED_ROOT/${1:-$MYSQL_SEED_SOURCE}"
MYSQL_SEED_FORMAT="${MYSQL_SEED_SOURCE##*.}"

# Get target database name from file dump (___ as separatpr)
if [[ "" == "$MYSQL_SEED_TARGET_DB" ]]; then
    MYSQL_SEED_TARGET_DB=$(basename "$MYSQL_SEED_SOURCE")
    MYSQL_SEED_TARGET_DB="`echo $MYSQL_SEED_TARGET_DB | grep '___' | sed -e's,^\(.*___\).*,\1,g'`"
    MYSQL_SEED_TARGET_DB="${MYSQL_SEED_TARGET_DB%???}"
    MYSQL_SEED_TARGET_DB=$(echo $MYSQL_SEED_TARGET_DB | tr . /)
    MYSQL_SEED_TARGET_DB="${MYSQL_SEED_TARGET_DB/___/://}"
fi


# Get explicit custom host from the command line
CUSTOM_HOST="`echo $MYSQL_SEED_TARGET_DB | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $CUSTOM_HOST ]]; then
    MYSQL_HOST="${CUSTOM_HOST%???}"
    MYSQL_SEED_TARGET_DB=`echo $MYSQL_SEED_TARGET_DB | sed -e s,$CUSTOM_HOST,,g`
fi

echo "======== MYSQL SEED ========"
echo "host:      $MYSQL_HOST"
echo "user:      $MYSQL_USER"
echo "password:  $MYSQL_PASSWORD"
echo "source:    $MYSQL_SEED_SOURCE"
echo "target:    $MYSQL_SEED_TARGET_DB"
echo "format:    $MYSQL_SEED_FORMAT"
echo ""
echo "(sleeping 5 secs, you can abort with Ctrl+c)"
echo ""
echo ""
echo ""
echo ""
sleep 5

echo "---> seeding data..."
if [[ $MYSQL_SEED_FORMAT == "gz" ]]; then
    TMP_FILE="$MYSQL_SEED_SOURCE.$(date +%s).seed"
    TMP_FILE_GZ="$TMP_FILE.gz"
    cp $MYSQL_SEED_SOURCE $TMP_FILE_GZ
    gzip -d -f $TMP_FILE_GZ
    mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_SEED_TARGET_DB < $TMP_FILE;
    rm -f $TMP_FILE
else
    mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_SEED_TARGET_DB < $MYSQL_SEED_SOURCE;
fi


echo "---> seed succeded:"
echo ""
mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_SEED_TARGET_DB -e "show tables;"
echo ""
echo ""
echo ""
echo ""
