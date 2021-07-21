module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/css/style.css"/>
    </head>
    <body>
    <header>
      <h1 id="title"><a href="/">Programming Practice</a></h1>
    </header>
    <main>
      <div class="list">
      <li id="clan"><a href="/clan" id="cli">C언어</a>${list}</li><li id='create_btn'><a href="/create">create</a></li>
      </div>
      <div class="center">
      <div class="body">${body}</div>
      <div class="control">${control}</div>
      </div>
    </main>
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul id="data">';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
