"use strict";

module.exports = {
  "services": ["selenium-standalone"],
  "connectionRetryCount": 3,
  "waitforTimeout": 10000,
  "maxInstances": 1,
  "cucumberOpts": {
    "timeout": 20000,
    "tagExpression": "not @Pending"
  },
  "specs": ["./features/otp/gmail/*.feature"],
  "capabilities": [{
    "maxInstances": 1,
    "browserName": "chrome",
    "acceptInsecureCerts": true,
    "chromeOptions": {
      "args": ["disable-web-security"]
    }
  }]
};