

TARGET_PATH=$1

TARGET_SERVICE="`echo $TARGET_PATH | grep '://' | sed -e's,^\(.*://\).*,\1,g'`"
if [[ ! -z $TARGET_SERVICE ]]; then
    TARGET_PATH=`echo "/"$TARGET_PATH | sed -e s,$TARGET_SERVICE,,g`
    TARGET_SERVICE="${TARGET_SERVICE%???}"
fi

echo "exec: docker run --rm --volumes_from=$TARGET_SERVICE marcopeg/docker-utils /bin/ash ls $TARGET_PATH"
