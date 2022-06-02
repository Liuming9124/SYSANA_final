const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const searchController = {

    searchPage: (req, res) => {
        data = req.body.find;
        connection.query(`SELECT * FROM product where book_type LIKE '%${data}%' or book_name LIKE '%${data}%' or book_author LIKE '%${data}%'`, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                // console.log(type);
                res.render('search', {'result':result});
            }
        });
    }
}

module.exports = searchController
