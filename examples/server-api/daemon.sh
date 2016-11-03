#!/bin/bash

trap processUserSig SIGUSR1
processUserSig() {
  echo "doing stuff"
}

SCRIPT_ROOT=${SCRIPT_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}
CONFIG_ROOT="$SCRIPT_ROOT""/.humble-server"
API_ROOT="$CONFIG_ROOT""/api"
API_QUEUE="$API_ROOT""/queue"
API_STDOUT="$API_ROOT""/stdout"
API_HISTORY="$API_ROOT""/history"

mkdir -p "$API_QUEUE"
mkdir -p "$API_STDOUT"
mkdir -p "$API_HISTORY"

getLastCmd() {
    find "$API_QUEUE" -maxdepth 1 -type f | head -n 1
}

waitLastTime=""
processCmd() {
    cmdFilePath=$(getLastCmd)
    if [ "$cmdFilePath" == "" ]; then
        if [ "$waitLastTime" == "" ]; then
            waitLastTime="yes"
            echo "waiting for commands..."
        fi
    else
        cmdFileName=$(basename $cmdFilePath)
        stdOutFileName="${cmdFileName%.*}.stdout.txt"
        stdOutFilePath="$API_STDOUT/$stdOutFileName"

        echo "RUN $cmdFileName"
        eval $(cat $cmdFilePath) > $stdOutFilePath 2> $stdOutFilePath
        mv $cmdFilePath "$API_HISTORY/$cmdFileName"
        mv $stdOutFilePath "$API_HISTORY/$stdOutFileName"
        waitLastTime=""
    fi
}

# Run it forever
while true; do
    processCmd
    sleep .25
done
