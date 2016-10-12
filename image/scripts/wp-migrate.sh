

MYSQL_HOST=${MYSQL_HOST:-mysql}
MYSQL_USER=${MYSQL_USER:-root}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-root}

MYSQL_DB=${3:-$MYSQL_DB}
MYSQL_DB=${MYSQL_DB:-wordpress}

WP_MIGRATE_FROM=${1:-WP_MIGRATE_FROM}
WP_MIGRATE_TO=${2:-WP_MIGRATE_TO}


# Handle custom host
CUSTOM_HOST="`echo $MYSQL_DB | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $CUSTOM_HOST ]]; then
    MYSQL_HOST="${CUSTOM_HOST%???}"
    MYSQL_DB=`echo $MYSQL_DB | sed -e s,$CUSTOM_HOST,,g`
fi


echo "======== WP-MIGRATE ========"
echo "host:      $MYSQL_HOST"
echo "user:      $MYSQL_USER"
echo "password:  $MYSQL_PASSWORD"
echo "database:  $MYSQL_DB"
echo "wp-from:   $WP_MIGRATE_FROM"
echo "wp-to:     $WP_MIGRATE_TO"
echo ""
echo "(sleeping 5 secs, you can abort with Ctrl+c)"
echo ""
echo ""
echo ""
echo ""
sleep 5

echo "---> migrating database..."
mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -e  "UPDATE wp_options SET option_value = replace(option_value, '${WP_MIGRATE_FROM}', '${WP_MIGRATE_TO}') WHERE option_name = 'home' OR option_name = 'siteurl';"
mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -e  "UPDATE wp_posts SET guid = replace(guid, '${WP_MIGRATE_FROM}','${WP_MIGRATE_TO}');"
mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -e  "UPDATE wp_posts SET post_content = replace(post_content, '${WP_MIGRATE_FROM}', '${WP_MIGRATE_TO}');"
mysql -h $MYSQL_HOST -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB -e  "UPDATE wp_postmeta SET meta_value = replace(meta_value,'${WP_MIGRATE_FROM}','${WP_MIGRATE_TO}');"

echo "migration completed."
echo ""
echo ""
echo ""
