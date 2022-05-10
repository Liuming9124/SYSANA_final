const express   = require('express');
const mysql     = require('mysql');
const { json }  = require('express/lib/response');


//start to connect db
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'book',
  password : 'book',
  database : 'book'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


const app = express();
  

connection.query("SELECT * FROM product order By Rand()", function(err, result, fields){   //By Rand() 隨機抓取資料
  if(err) throw err;      //查詢type 為 learn 的資料
    //console.log(result);
    var filterbook = result.filter(function(item,idex,array){
      return item.book_type=='learn'
    });
    console.log('----------以下為隨機出現的所有書籍----------')
    console.log(result) //filterbook 為儲存type 為 learn 的書籍 陣列
    console.log('----------以下為Type為Learn的書籍----------');
    console.log(filterbook)
    
});


// app.get('/',function(req,res){
//   console.log('Good night Taichung');
//   res.send('Good night Taichung');
// })

app.listen(8080,function(){
  
});