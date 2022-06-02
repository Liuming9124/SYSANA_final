const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const searchController = {

    searchPage: (req, res) => {
        console.log(req.body);
        connection.query(`SELECT * FROM product where book_type ='hot'`, function (err, type, fields) {
            if (err) {
                throw err;
            }
            else {
                // console.log(type);
                res.render('search', {'type':type});
            }
        });
    }
}

module.exports = searchController
