const express = require('express')
const app = express()
var fs = require('fs');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');



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


app.listen(3000, () => console.log('listening on port 3000'))