const express = require('express')
const app = express()
var fs = require('fs');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');


app.set('port', (process.env.PORT || 5000));
app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get('*', (req, res, next) => {
  fs.readdir('./data', (error, filelist) => {
    req.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/', topicRouter);


app.listen(app.get('port'), function () {
  console.log('App is running, server is listening on port ', app.get('port'));
});