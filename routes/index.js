const express = require('express');
var router = express.Router();
var template = require('../lib/template.js');


router.get('/', (req, res) => {
    var title = 'Welcome';
    var description = 'Welcome to programming practice';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2><p>${description}</p>`,
      ``
    );
    res.send(html);
  });
  
  router.get('/clan', (req, res) => {
    var title = 'C Language';
    var description = 'Welcome to C-Language';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `<h2>${title}</h2><p>${description}</p>`,
        `<a href="/create">create</a>`
    );
    res.send(html);
    });


module.exports = router;