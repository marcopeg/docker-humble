#/bin/bash
MAJOR=0
MINOR=1
FIX=2
docker build -t marcopeg/humble:latest -t marcopeg/humble:$MAJOR -t marcopeg/humble:$MAJOR.$MINOR -t marcopeg/humble:$MAJOR.$MINOR.$FIX .
docker push marcopeg/humble
