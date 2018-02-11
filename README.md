Cucumber Test
====================

# https://github.com/vvo/selenium-standalone/issues/8
npm install -g selenium-standalone@latest
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone install
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone start
NODE_TLS_REJECT_UNAUTHORIZED=0 npm start -- -t '@simple or @lol'

cd ~/.nvm/versions/node/v8.8.1/lib/node_modules
ln -s /Users/wharsojo/Dev/cucumber-test cucumber-test
