const express = require('express');

const mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Liuming',
  password : 'Liuming',
  database : 'book_win'
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