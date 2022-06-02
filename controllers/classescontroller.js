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
                if (req.session.userName){
                    res.render('classification', {
                        'type':type,
                        'login': req.session.userName,
                    });
                }
                else{
                    res.render('classification', {
                        'type':type,
                        'login': '',
                    });
                }
                
            }
        });
    }
}

module.exports = classesController
