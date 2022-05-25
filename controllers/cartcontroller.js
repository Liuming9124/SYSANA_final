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
            // var data = []
            // x = [1, 2, 3]
            // data.push(x)
            // console.log(data)
            connection.query("SELECT * FROM cart where email ='k0928588211@yahoo.com.tw'", function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    var totalprice=0;
                    for(var i=0;i<result.length;i++){
                        totalprice+=result[i].book_price
                    }
                    res.render('cart', {
                        'cartbook': result, //使用者選擇加入購物車的書籍(資料數)
                        'result' : result,
                        'total': totalprice
                    });
                }
            })
        }
        else {
            res.redirect('/login');
        }

    }
}

module.exports = cartController
