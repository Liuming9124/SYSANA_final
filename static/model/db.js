const express = require('express');
const mysql = require('mysql');
const { json } = require('express/lib/response');


//start to connect db
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'book',
//   password: 'book',
//   database: 'book'
// });
// connection.connect(function (err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

var connection = mysql.createConnection({
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
  selectRandom: function (selecRandom) { //抓取product隨機書籍
    connection.query("SELECT * FROM product order By Rand()", function (err, result, fields) {
      if (err){
        throw err;
      }
      else{
        console.log(result);
      }
    });
  },
  selectLearn: function (selectLearn) { //抓取type為learn的書籍
    connection.query("SELECT * FROM product", function (err, result, fields) {
      if (err) {
        throw err;
      }
      else {
        var Learnbook = result.filter(function (item, idex, array) {
          return item.book_type == 'learn';
          console.log(Learnbook);
        });
      }
    });
  },
  selectHot: function (selectHot){ //抓取type為hot的書籍
    connection.query("SELECT * FROM product", function (err,result, fields){
        if(err){
          throw err;
        }
        else{
          var Hotbook=result.filter(function(item, idex, array){
              return item.book_type == 'hot';
              console.log(Hotbook);
          });
        }
    })
  },
  selectDiscount: function (selectDiscount){ //抓取type為discount的書籍
    connection.query("SELECT * FROM product",function (err,result, fields){
      if(err){
        throw err;
      }
      else{
        var Discountbook=result.filter(function(item,idex,array){
          return item.book_type =='discount';
          console.log(discount)
        })
      }
    })
  }
}
module.exports = db;

const app = express();


// connection.query("SELECT * FROM product order By Rand()", function(err, result, fields){   //By Rand() 隨機抓取資料
//   if(err) throw err;      //查詢type 為 learn 的資料
//     //console.log(result);
//     var Learnbook = result.filter(function(item,idex,array){
//       return item.book_type=='learn'
//     });
//     var Hotbook = result.filter(function(item,idex,array){
//       return item.book_type=='hot'
//     });
//     var Discountbook = result.filter(function(item,idex,array){
//       return item.book_type=='discount'
//     });
//     console.log('----------以下為隨機出現的所有書籍----------')
//     console.log(result) //filterbook 為儲存type 為 learn 的書籍 陣列
//     console.log('----------以下為Type為Learn的書籍----------');
//     console.log(Learnbook)
//     // console.log(Hotbookbook)
//     // console.log(Discountbook)

// });


app.listen(8080, function () {

});