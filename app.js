var express = require('express');
var path = require('path');
var http = require('http');

var bodyParser = require('body-parser');

var router = require('./server/routes');
var app = express();

var mongoose = require('mongoose');

// middleware for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// set route controllers
app.use('/', router.form);
app.use('/api', router.api);


// connect to test database
mongoose.connect('mongodb://localhost:27017/test');

// test connection
var db = mongoose.connection;
db.on('error', function(){console.error('db connection error')});
db.once('open', function() {
  // we're connected!
  console.log('db connected');
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
else{
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });
}


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
console.info("== Listening on port %s. Open up http://localhost:%s/ in your browser. ==", port, port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  // console.log('Listening on ' + bind);
}

