var db = require('../route/modules/db')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const homeController = {

    homePage: (req, res) => {

        // console.log( db.select('learn'))
        // var data = [
        //     { id: 1, name: "bob" },
        //     { id: 2, name: "john" },
        //     { id: 3, name: "jake" },
        // ];

        // JSON.stringify(data)
        // return res.render('home')
        connection.query("SELECT * FROM product order By Rand()", function (err, random, fields) {
            if (err) {
                throw err;
            }
            else {
                // console.log(random);
                console.log(random[0]);
                res.render('home',{
                    'book_img'  : random[0].book_img,
                    'book_name' : random[0].book_name,
                    'book_id'   : random[0].book_id,
                    'book_type' : random[0].book_type,
                    'book_price': random[0].book_price
                });
            }
        });
    }

}

module.exports = homeController
