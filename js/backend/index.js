const cors = require('cors')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.listen(3000, '127.0.0.1/vagary/index.html');



let authorized = false;

function checkAuth(req, res, next) {
  if(authorized){
    next()
  } else {
    res.status(403).send("Unauthorized!");
    return;
  }
}

app.use('/', checkAuth);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
});

module.exports = app;
