var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var ocurrences = require('./routes/ocurrences');
var ocurrenceTypes = require('./routes/ocurrence-types');
var login = require('./routes/login');
var cors = require('cors')

var app = express();


//CORS V02
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', users);
app.use('/', ocurrences);
app.use('/', ocurrenceTypes);
app.use('/', login);


//CORS V01
// app.all('*', function (req, res, next) {
//   // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
//   if (req.method === 'OPTIONS') {
//     // CORS Preflight
//     res.send();
//   } else {
//     var targetURL = req.header('Target-URL');
//     if (!targetURL) {
//       res.send(500, {
//         error: 'There is no Target-Endpoint header in the request'
//       });
//       return;
//     }
//     request({
//         url: targetURL + req.url,
//         method: req.method,
//         json: req.body,
//         headers: {
//           'Authorization': req.header('Authorization')
//         }
//       },
//       function (error, response, body) {
//         if (error) {
//           console.error('error: ' + response.statusCode)
//         }
//         //                console.log(body);
//       }).pipe(res);
//   }
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;