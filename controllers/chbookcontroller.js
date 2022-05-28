const mysql = require('mysql');
<<<<<<< HEAD
=======

>>>>>>> 0bc73239574d2e5601f6eca697041da04981c347
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


<<<<<<< HEAD
const registerController = {
    chbookPage: (req, res) => {
        return res.render('chbook', { 'result': '' })
    },
    chbookAdd: (req, res) => {
        var data = req.body;
        var sql = "INSERT INTO users VALUES('" + data.email + "','" + data.ch_name + "','" + data.address + "','" + data.bookcondition + " ',' " + data.bookprice + "')";
=======
const chbookController = {
    
    chbookPage: (req, res) => {
        return res.render('chbook', { 'result': '' , 'bookcoin': '0'})
    },
    chbookAdd: (req, res) => {
        var data = req.body;
        var sql = "INSERT INTO users VALUES('" + "0" + "','" + data.ch_name + "','" + data.address + "','" + data.bookcondition + " ',' " + data.bookprice + "')";
        console.log(sql)
>>>>>>> 0bc73239574d2e5601f6eca697041da04981c347
        connection.query(sql, function (err, result) {
            if (err) {
                return res.render('register', { 'result': 'fail' });
            }
            else {
                return res.render('register', { 'result': 'success' });
            }
        })

    }
}
module.exports = chbookController
