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
  

connection.query("SELECT * FROM product ", function(err, result, fields){   
  if(err) throw err;      //查詢type 為 learn 的資料
    //console.log(result);
    var filterbook = result.filter(function(item,idex,array){
      return item.book_type=='learn'
    });
    console.log(filterbook) //filterbook 為儲存type 為 learn 的書籍 陣列
    console.log( 'select ended!' );
});


app.get('/',function(req,res){
  console.log('Good night Taichung');
  res.send('Good night Taichung');
})

app.listen(8080,function(){
  
});