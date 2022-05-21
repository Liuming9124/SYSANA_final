var express = require('express');
var path    = require('path');
var db      = require('./route/modules/db');
var app     = express();

app.set('views', './views')
app.set('view engine', 'ejs');


//建立 server

db.conn();



// app.get('/',function(req,res){
//   console.log(db.select('learn'));
//   res.render('home');
// })
// app.get('/cart/*',function(req,res){
//   res.render('cart');
// })
// app.get('/chbook/*',function(req,res){
//   res.render('chbook');
// })
// app.get('/classification/*',function(req,res){
//   res.render('classification');
// })
// app.get('/collect/*',function(req,res){
//   res.render('collect');
// })
// app.get('/home/*',function(req,res){
//   res.render('home');
// })
// app.get('/login/*',function(req,res){
//   res.render('login');
// })
// app.get('/member/*',function(req,res){
//   res.render('member');
// })
// app.get('/merchant/*',function(req,res){
//   res.render('merchant');
// })
// app.get('/order/*',function(req,res){
//   res.render('order');
// })
// app.get('/product/*',function(req,res){
//   res.render('product');
// })
// app.get('/rebook/*',function(req,res){
//   res.render('rebook');
// })
// app.get('/register/*',function(req,res){
//   res.render('register');
// })
// app.get('/service/*',function(req,res){
//   res.render('service');
// })

// db.conn();
app.get('/',function(req,res){
  res.render('home');
  // db.select('learn');
})
app.get('/cart/*',function(req,res){
  res.render('cart');
})
app.get('/chbook/*',function(req,res){
  res.render('chbook');
})
app.get('/classification/*',function(req,res){
  res.render('classification');
})
app.get('/collect/*',function(req,res){
  res.render('collect');
})
app.get('/home/*',function(req,res){
  res.render('home');
})
app.get('/login/*',function(req,res){
  res.render('login');
})
app.get('/member/*',function(req,res){
  res.render('member');
})
app.get('/merchant/*',function(req,res){
  res.render('merchant');
})
app.get('/order/*',function(req,res){
  res.render('order');
})
app.get('/product/*', function (req, res) {
  res.render('product');
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


