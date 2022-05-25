const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const chbookController = {
    
    chbookPage: (req, res) => {
        return res.render('chbook', { 'result': '' })
    },
    chbookAdd: (req, res) => {
        var data = req.body;
        var sql = "INSERT INTO users VALUES('" + "0" + "','" + data.ch_name + "','" + data.address + "','" + data.bookcondition + " ',' " + data.bookprice + "')";
        console.log(sql)
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
