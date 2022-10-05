const express = require("express");
const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path = require("path");
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine
    const rendered = content.toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.get('/index', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
