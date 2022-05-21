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
  },
  select: async (type, res, next) => {
    try{
      if (type == 'random') {
        await connection.query("SELECT * FROM product order By Rand()", function (err, random, fields) {
          if (err) {
            throw err;
          }
          else {
            return (random);
          }
        });
      }
      else if (type == 'learn') {
        await connection.query("SELECT * FROM product where book_type ='learn'", function (err, learn, fields) {
          if (err) {
            throw err;
          }
          else {
            return (learn);
          }
        });
      }
      else if (type == 'hot') {
        await connection.query("SELECT * FROM product where book_type ='hot'", function (err, hot, fields) {
          if (err) {
            throw err;
          }
          else {
            return (hot);
          }
        })
      }
      else if (type == 'discount') {
        await connection.query("SELECT * FROM product where book_type ='discount'", function (err, discount, fields) {
          if (err) {
            throw err;
          }
          else {
            return (discount);
          }
        })
      }
    } catch(err){
      console.log(err)
      return next(err)
    }

    
  }
}
module.exports = db;
