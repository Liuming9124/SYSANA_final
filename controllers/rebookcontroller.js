const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const rebookController = {
    rebookPage: (req, res) => {
        if (req.session.userName) {
            connection.query("SELECT * FROM users", function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (req.session.userName == result[i].email) {
                        console.log(result)
                        return res.render('rebook',{'bookcoin':'0'})
                    }
                }
            })
        }
    }
}

module.exports = rebookController
