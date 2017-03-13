#!/bin/bash
set -e

### Configuration ###

SERVER=bdenes@45.33.69.61
REMOTE_SCRIPT_PATH=/tmp/build.sh


### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}

run scp bin/build.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh -t $SERVER bash $REMOTE_SCRIPT_PATH
