const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'book',
  password: 'book',
  database: 'book'
})

var db = {

  conn: function (connect) { //連線
    connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected as id ' + connection.threadId);
    });
  },
  disconn: function (diconn) { //斷開連線
    connection.end()
  }
}
module.exports = db;
