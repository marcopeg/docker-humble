#
# mysql-dump
#

PRINT_FEEDBACK="yes"
P1=$1
P2=$2

for last; do true; done
if [ "--now" == "$last" ]; then
    PRINT_FEEDBACK="no"
    [ "$P1" == "$last" ] && P1=""
    [ "$P2" == "$last" ] && P2=""
fi

BACKUP_DELAY=${BACKUP_DELAY:-3}
BACKUP_ROOT=${BACKUP_ROOT:-"data/backup"}
BACKUP_DATE_FORMAT=${BACKUP_DATE_FORMAT:-"+%Y%m%d.%H%M%S"}
BACKUP_DATE=$(date $BACKUP_DATE_FORMAT)

MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-root}
MYSQL_DB=${MYSQL_DB:-$P1}
MYSQL_DB=${MYSQL_DB:-wordpress}
MYSQL_DUMP_GZIP=${MYSQL_DUMP_GZIP:-"yes"}
MYSQL_DUMP_FORMAT="%s___%p___%d"


# Handle custom host
CUSTOM_HOST="`echo $MYSQL_DB | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $CUSTOM_HOST ]]; then
    MYSQL_HOST="${CUSTOM_HOST%???}"
    MYSQL_DB=`echo $MYSQL_DB | sed -e s,$CUSTOM_HOST,,g`
fi


MYSQL_DUMP_FILE_NAME=${P2:-$MYSQL_DUMP_FORMAT}
MYSQL_DUMP_FILE_NAME="${MYSQL_DUMP_FILE_NAME/\%s/$MYSQL_HOST}"
MYSQL_DUMP_FILE_NAME="${MYSQL_DUMP_FILE_NAME/\%p/$MYSQL_DB}"
MYSQL_DUMP_FILE_NAME="${MYSQL_DUMP_FILE_NAME/\%d/$BACKUP_DATE}"


# Compose target file
MYSQL_DUMP_FILE_PATH="/$BACKUP_ROOT/$MYSQL_DUMP_FILE_NAME"
MYSQL_DUMP_FILE_PATH="$MYSQL_DUMP_FILE_PATH.sql"
[[ $MYSQL_DUMP_GZIP == "yes" ]] && MYSQL_DUMP_FILE_PATH="$MYSQL_DUMP_FILE_PATH.gz"

if [ "$PRINT_FEEDBACK" == "yes" ]; then
    echo ""
    echo "======== MYSQL DUMP ========"
    echo "host:      $MYSQL_HOST"
    echo "user:      $MYSQL_USER"
    echo "password:  $MYSQL_PASSWORD"
    echo "database:  $MYSQL_DB"
    echo "target:    $MYSQL_DUMP_FILE_PATH"
    echo ""
    echo "(sleeping $BACKUP_DELAY secs, you can abort with Ctrl+c)"
    sleep $BACKUP_DELAY
    echo ""
    echo ""
fi

[ "$PRINT_FEEDBACK" == "yes" ] && echo "---> exporting data..."
mkdir -p "/$BACKUP_ROOT"
if [[ $MYSQL_DUMP_GZIP == "yes" ]]; then
    mysqldump -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB | gzip > $MYSQL_DUMP_FILE_PATH;
else
    mysqldump -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB > $MYSQL_DUMP_FILE_PATH;
fi

if [ "$PRINT_FEEDBACK" == "yes" ]; then
    echo "---> mysql-dump complete!"
    echo ""
    echo ""
fi
exit
