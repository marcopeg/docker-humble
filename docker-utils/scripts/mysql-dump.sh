

MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-root}
MYSQL_DB=${MYSQL_DB:-$1}
MYSQL_DB=${MYSQL_DB:-wordpress}
MYSQL_DUMP_ROOT=${MYSQL_DUMP_ROOT:-"/data/backup"}
MYSQL_DUMP_GZIP=${MYSQL_DUMP_GZIP:-yes}
MYSQL_DUMP_DATE=${MYSQL_DUMP_DATE:-yes}
MYSQL_DUMP_DATE_FORMAT=${MYSQL_DUMP_DATE_FORMAT:-"+%Y%m%d-%H%M%S"}

# Handle custom host
CUSTOM_HOST="`echo $MYSQL_DB | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $CUSTOM_HOST ]]; then
    MYSQL_HOST="${CUSTOM_HOST%???}"
    MYSQL_DB=`echo $MYSQL_DB | sed -e s,$CUSTOM_HOST,,g`
fi

# Compose target file
MYSQL_DUMP_TARGET="$MYSQL_DUMP_ROOT/$MYSQL_HOST""___""$MYSQL_DB"
[[ $MYSQL_DUMP_DATE == "yes" ]] && MYSQL_DUMP_TARGET="$MYSQL_DUMP_TARGET.$(date $MYSQL_DUMP_DATE_FORMAT)"
MYSQL_DUMP_TARGET="$MYSQL_DUMP_TARGET.sql"
[[ $MYSQL_DUMP_GZIP == "yes" ]] && MYSQL_DUMP_TARGET="$MYSQL_DUMP_TARGET.gz"

echo "======== MYSQL DUMP ========"
echo "host:      $MYSQL_HOST"
echo "user:      $MYSQL_USER"
echo "password:  $MYSQL_PASSWORD"
echo "database:  $MYSQL_DB"
echo "target:    $MYSQL_DUMP_TARGET"
echo ""
echo "(sleeping 5 secs, you can abort with Ctrl+c)"
sleep 5

echo "---> exporting data..."
mkdir -p $MYSQL_DUMP_ROOT
if [[ $MYSQL_DUMP_GZIP == "yes" ]]; then
    mysqldump -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB | gzip > $MYSQL_DUMP_TARGET;
else
    mysqldump -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB > $MYSQL_DUMP_TARGET;
fi

echo "---> export succeded:"
ls -la $MYSQL_DUMP_TARGET
echo ""
echo ""
echo ""
echo ""
