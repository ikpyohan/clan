const express = require('express')
var router = express.Router();
var template = require('../lib/template.js');
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');



router.get('/page/:pageId', (req, res) => {
var filteredId = path.parse(req.params.pageId).base;
fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
    var title = req.params.pageId;
    var sanitizedTitle = sanitizeHtml(title);
    var sanitizedDescription = sanitizeHtml(description, {
    allowedTags:['h1','pre', 'img']
    });
    var list = template.list(req.list);
    var html = template.HTML(sanitizedTitle, list,
    `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
    ` <a href="/update/${sanitizedTitle}">update</a>
        <form action="/delete" method="post">
        <input type="hidden" name="id" value="${sanitizedTitle}">
        <input type="submit" value="delete" onclick="if (!confirm('Are you sure?')) { return false }">
        </form>`
    );
    res.send(html);
});
});

router.get('/create', (req, res) => {
    var title = 'WEB - create';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
    <form action="/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
        <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
        <div id="create">  
        <input type="submit" value='submit'>
        <a href='/clan'>return</a>
        </div>
        </p>
    </form>
    `, '');
    res.send(html);
});

router.post('/create', (req, res) => {
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        res.redirect(`/page/${title}`);
    })
});

router.get('/update/:pageId', (req, res) => {
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
    var title = req.params.pageId
    var list = template.list(req.list);
    var html = template.HTML(title, list,
        `
        <form action="/update" method="post">
        <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
            <textarea name="description" placeholder="description">${description}</textarea>
            </p>
        <p>
        <div id="update">  
            <input type="submit" value='submit'>
            <a href='/page/${title}'>return</a>
        </div>
        </p>
        </form>
        `, ''
    );
    res.send(html);
    });
});

router.post('/update', (req, res) => {
var post = req.body;
var id = post.id;
var title = post.title;
var description = post.description;
fs.rename(`data/${id}`, `data/${title}`, (error) => {
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
    res.redirect(`/page/${title}`);
    })
});
});

router.post('/delete', (req, res) => {
var post = req.body;
var id = post.id;
var filteredId = path.parse(id).base;
fs.unlink(`data/${filteredId}`, (error) => {
    res.redirect('/');
})
});

module.exports = router;