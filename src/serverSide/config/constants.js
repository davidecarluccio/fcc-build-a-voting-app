'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('dotenv').config();

var defaultConfig = {
  PORT: process.env.PORT || 3000,
  LOCAL_STRATEGY: {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  MONGO_URL: process.env.MONGO_URL,
  TWITTER_STRATEGY: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true,
  }
};

exports.default = Object.assign({}, defaultConfig);