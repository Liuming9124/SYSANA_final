const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const cartController = {
    cartPage: (req, res) => {
        
        connection.query("SELECT * FROM product where book_type ='hot'", function (err, hot, fields) {
            if (err) {
                throw err;
            }
            else {
                res.render('cart', { 'cartbook': hot, 'total' : '100' });
            }
        })
    }
}

module.exports = cartController
