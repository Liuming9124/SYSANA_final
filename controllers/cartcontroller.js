const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const cartController = {
    cartPage: (req, res) => {
        if(req.session.userName){
            connection.query("SELECT * FROM product where book_type ='hot'", function (err, hot, fields) {
                if (err) {
                    throw err;
                }
                else {
                    return res.render('cart', { 'cartbook': hot, 'total' : '100' });
                }
            })
        }
        else{
            res.redirect('/login');
        }
        
    }
}

module.exports = cartController
