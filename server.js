var express = require('express');
var path    = require('path');
var db      = require('./route/modules/db');
var app     = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var favicon      = require('serve-favicon');
// var multer       = require('multer');



app.use(favicon(__dirname + '/static/images/favicon.ico'));

app.set('views', './views')
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
  secret: 'book',
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge : 1000 * 60 * 10, // 設定 session 的有效時間，單位毫秒
  }    
}))


//上傳圖片 尚未實現
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'static/BookImg/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.filename + '-' + Date.now())
//   }
// })
// const upload = multer({ storage: storage })
// const fs = require('fs')


//建立 server


db.conn();

app.use(express.static('static')); //讀取靜態檔案
app.use('*/images'    ,express.static(path.join(__dirname, 'static/images')));
app.use('*/BookImg'   ,express.static(path.join(__dirname, 'static/BookImg')));
app.use('*/js'        ,express.static(path.join(__dirname, 'static/js')));
app.use('*/css'       ,express.static(path.join(__dirname, 'static/css')));
app.use('*/webfonts'  ,express.static(path.join(__dirname, 'static/webfonts')));
app.use('*/model'     ,express.static(path.join(__dirname, 'static/model')));
app.use('*/js_static' ,express.static(path.join(__dirname, 'static/model/js_static')));



//require routes
require('./route')(app)
// error handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(500)
    console.log('500 error: ', err)
    return res.render('error', { err })
  }
})


app.listen(8000,function(){ //8000這個port
  console.log("listen on http://localhost:8000")
})


