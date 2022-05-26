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

    },
    addCart: (req, res) => {
        if (req.session.userName) {
            
            console.log(typeof(req.params.id));
            
            connection.query("SELECT * FROM product where book_id='"+req.params.id+"'",function(err,result){
                if (err){
                    throw err;
                }
                else{
                    console.log(result)
                    // console.log(result[0].book_id)
                    var sql = "INSERT INTO cart(email,book_price,book_author,book_id,number) VALUES('"+req.session.userName+"',"+result[0].book_price+",'"+result[0].book_author+"','"+result[0].book_id+"',1)";
                    console.log(sql);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            redirect('/cart');
                        }
                    })
                }
            })
        }
        else {
            res.redirect('/login');
        }
    }
}

module.exports = cartController
