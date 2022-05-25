const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const cartController = {
    cartPage: (req, res) => {
        if (req.session.userName) {

            connection.query("SELECT * FROM cart where email ='"+req.session.userName+"'", function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    var totalprice=0;
                    for(var i=0;i<result.length;i++){
                        totalprice+=result[i].book_price
                    }
                    res.render('cart', {
                        'cartbook': result, 
                        'result' : result,
                        'total': totalprice
                    });
                }
            })
        }
        else {
            res.redirect('/login');
        }

    }
}

module.exports = cartController
