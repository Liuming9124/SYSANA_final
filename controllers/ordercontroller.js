const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const orderController = {
    orderPage: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT * FROM orders where email ='${req.session.userName}'`, function (err, result) {
                // console.log(result)
                return res.render('order',{'result':result});
            })
        }
        else{
            res.redirect('/login');
        }
    }
}

module.exports = orderController
