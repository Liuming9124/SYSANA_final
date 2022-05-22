const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const homeController = {

    homePage: (req, res) => {
        connection.query("SELECT * FROM product order By Rand()", function (err, random, fields) {
            if (err) {
                throw err;
            }
            else {
                connection.query("SELECT * FROM product where book_type ='hot'", function (err, hot, fields) {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.render('home', { 'random': random, 'hot': hot });
                    }
                })

            }
        });
    }
}

module.exports = homeController
