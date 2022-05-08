const express = require('express');

const mysql      = require('mysql');

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

app.use(express.static(__dirname + '/public'));/* 將預設路徑設在public*/


app.listen(8080);

connection.query("SELECT * FROM product", function(err, result, fields){ //查詢users的所有資料    
  if(err) throw err;
    console.log(result);
  });
  console.log( 'select ended!' );