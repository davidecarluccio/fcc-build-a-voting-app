'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');
var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');
var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');
var _helmet2 = _interopRequireDefault(_helmet);

var _expressSession = require('express-session');
var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');
var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _express = require('express');
var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');
var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./passport');
var _passport4 = _interopRequireDefault(_passport3);

var _database = require('./database');
var _database2 = _interopRequireDefault(_database);

var _routes = require('../routes');
var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isProd = process.env.NODE_ENV === 'production';
(0, _passport4.default)(_passport2.default);

// Usa l'URL di MongoDB dal file .env
var MongoConnect = _connectMongo2.default.create({
  mongoUrl: process.env.MONGO_URL, // Assicurati che MONGO_URL sia definito nelle variabili di ambiente
  collectionName: 'sessions'
});

exports.default = function (app) {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_express2.default.static('public'));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  // Configura le sessioni
  app.use((0, _expressSession2.default)({
    secret: 'SessionSecret1',
    name: 'Session',
    resave: true,
    saveUninitialized: true,
    store: MongoConnect // MongoStore ora configurato correttamente
  }));

  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());

  app.use('/', _routes2.default);

  // Error handling middleware
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      error: {
        message: err.message
      }
    });
  });
};
