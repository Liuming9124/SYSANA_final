const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const productController = {
    productPage: (req, res) => {
        console.log("this book is book" + req.params.id);
        connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
            if (err) {
                console.log('error')
            }
            else {
                console.log(result)
                // console.log(result[0].book_id)
                if (req.session.userName){
                    return res.render('product',{
                        'result':result[0],
                        'login': req.session.userName,
                    });
                }
                else{
                    return res.render('product',{
                        'result':result[0],
                        'login': '',
                    });
                }
                
            }
        })
        
    }
}


module.exports = productController
