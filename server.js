var express = require('express');
var path    = require('path');
var app = express();

//建立 server
app.get('/',function(req,res){
  res.sendFile(__dirname + '/home/home.html');
})
app.get('/cart/*',function(req,res){
  res.sendFile(__dirname + '/cart/cart.html');
})
app.get('/chbook/*',function(req,res){
  res.sendFile(__dirname + '/chbook/chbook.html');
})
app.get('/collect/*',function(req,res){
  res.sendFile(__dirname + '/collect/collect.html');
})
app.get('/home/*',function(req,res){
  res.sendFile(__dirname + '/home/home.html');
})
app.get('/login/*',function(req,res){
  res.sendFile(__dirname + '/login/login.html');
})
app.get('/member/*',function(req,res){
  res.sendFile(__dirname + '/member/member.html');
})
app.get('/merchant/*',function(req,res){
  res.sendFile(__dirname + '/merchant/merchant.html');
})
app.get('/order/*',function(req,res){
  res.sendFile(__dirname + '/order/order.html');
})
app.get('/product/*',function(req,res){
  res.sendFile(__dirname + '/product/index.html');
})
app.get('/rebook/*',function(req,res){
  res.sendFile(__dirname + '/rebook/rebook.html');
})
app.get('/register/*',function(req,res){
  res.sendFile(__dirname + '/register/register.html');
})
app.get('/service/*',function(req,res){
  res.sendFile(__dirname + '/service/service.html');
})


app.use(express.static('static')); //讀取靜態檔案
app.use('*/images'  ,express.static(path.join(__dirname, 'static/images')));
app.use('*/js'      ,express.static(path.join(__dirname, 'static/js')));
app.use('*/css'     ,express.static(path.join(__dirname, 'static/css')));
app.use('*/webfonts',express.static(path.join(__dirname, 'static/webfonts')));

var server = app.listen(8000,function(){ //8000這個port
  var host = server.address().address;
  var port = server.address().port;
  console.log("listen on http://%s:%s", host, port)
})


