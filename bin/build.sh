#!/bin/bash
set -e

### Configuration ###
DATE=`date +%Y%m%d%H%M%S`
APP_DIR=/app/eComm_frontend
GIT_URL=git@github.com:CleverSoftwareSolutions/eComm-FE.git

### Automation steps ###

set -x

# Pull latest code
if [[ -e $APP_DIR/repo ]]; then
  cd $APP_DIR/repo
  git pull
else
  git clone $GIT_URL $APP_DIR/repo
fi

cd $APP_DIR/repo
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
