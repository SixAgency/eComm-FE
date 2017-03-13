#!/bin/bash
set -e

### Configuration ###
DATE=`date +%Y%m%d%H%M%S`
APP_DIR=/app/eComm_frontend
GIT_URL=git@github.com:CleverSoftwareSolutions/eComm-FE.git

### Automation steps ###

set -x

# Deploy key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa_deploy

# Pull latest code
if [[ -e $APP_DIR/repo ]]; then
  cd $APP_DIR/repo
  git stash
  git checkout master
  git pull origin master
else
  git clone $GIT_URL $APP_DIR/repo
  cd $APP_DIR/repo
fi

# Install dependencies
npm install

# Build the project
npm run build -- --release --verbose

# Move the build to releases
mv build $APP_DIR/releases/$DATE

# Go to last build and install dependencies
cd $APP_DIR/releases/$DATE
npm install --production
npm prune --production

# Link to current
ln -s $APP_DIR/releases/$DATE $APP_DIR/current

cd $APP_DIR/current
# Restart app
pm2 start ecosystem.config.js
sudo service nginx restart
