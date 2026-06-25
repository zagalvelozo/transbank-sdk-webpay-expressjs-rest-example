var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./config/logger');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// HTTP request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'warn' : 'info';
    logger[level]('request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    });
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

// Global error handler
app.use((err, req, res, next) => {
  logger.error('unhandled error', { error: err.message, stack: err.stack, url: req.originalUrl });
  res.status(err.status || 500).json({ error: 'Internal server error' });
});

module.exports = app;
