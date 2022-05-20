var express = require('express');
var path    = require('path');
var db      = require('./models/db.js');
var app     = express();


app.set('view engine', 'ejs');


//建立 server
// db.conn();
app.get('/',function(req,res){
  res.render('home',{
    'howmanybook':'1',
    'book.name':'書本1',
    'book.no':'00000000',
    'book.writer':'劉銘',
    'book.money':'666'
  });
  // db.select('learn');
})
app.get('/cart/*',function(req,res){
  res.render('cart',{
    'howmanybook':'1',
    'book.name':'書本1',
    'book.no':'00000000',
    'book.writer':'劉銘',
    'book.money':'666',
    'total':'666'
  });
})
app.get('/chbook/*',function(req,res){
  res.render('chbook');
})
app.get('/classification/*',function(req,res){
  res.render('classification');
})
app.get('/collect/*',function(req,res){
  res.render('collect',{
    'howmanybook':'1',
    'book.name':'書本1',
    'book.no':'00000000',
    'book.writer':'劉銘',
    'book.money':'666'
  });
})
app.get('/home/*',function(req,res){
  res.render('home');
})
app.get('/login/*',function(req,res){
  res.render('login');
})
app.get('/member/*',function(req,res){
  res.render('member',{
    'name':'劉銘',
    'email':'liuliuming@liumail.com',
    'phone':'0986138613',
    'password':'098613'
  });
})
app.get('/merchant/*',function(req,res){
  res.render('merchant');
})
app.get('/order/*',function(req,res){
  res.render('order');
})
app.get('/product/*', function (req, res) {
  res.render('product',{
    'bookname':'書本1',
    'book.no':'00000000',
    'book.writer':'劉銘',
    'book.money':'666'
  });
})
app.get('/rebook/*',function(req,res){
  res.render('rebook');
})
app.get('/register/*',function(req,res){
  res.render('register');
})
app.get('/service/*',function(req,res){
  res.render('service');
})

app.use(express.static('static')); //讀取靜態檔案
app.use('*/images'    ,express.static(path.join(__dirname, 'static/images')));
app.use('*/BookImg'   ,express.static(path.join(__dirname, 'static/BookImg')));
app.use('*/js'        ,express.static(path.join(__dirname, 'static/js')));
app.use('*/css'       ,express.static(path.join(__dirname, 'static/css')));
app.use('*/webfonts'  ,express.static(path.join(__dirname, 'static/webfonts')));
app.use('*/model'     ,express.static(path.join(__dirname, 'static/model')));
app.use('*/js_static' ,express.static(path.join(__dirname, 'static/model/js_static')));

app.listen(8000,function(){ //8000這個port
  console.log("listen on http://localhost:8000")
})


