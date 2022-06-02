const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const classesController = {

    classesPage: (req, res) => {
        console.log(req.params.id);
        connection.query(`SELECT * FROM product where book_type ='${req.params.id}'`, function (err, type, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log(type);
                res.render('classification', {'type':type});
            }
        });
    }
}

module.exports = classesController
