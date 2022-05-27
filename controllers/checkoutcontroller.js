const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})
var totalprice = 0;
const checkoutController = {
    checkoutPage: (req, res) => {
        if (req.session.userName) {

            // connection.query("SELECT * FROM checkout where email ='" + req.session.userName + "'", function (err, result, fields) {
            //     if (err) {
            //         throw err;
            //     }
            //     else {
            //         totalprice=0;
            //         for (var i = 0; i < result.length; i++) {
            //             totalprice += result[i].book_price
            //         }
            //         res.render('checkout', { //渲染頁面，(配合ejs的格式)
            //             'checkoutbook': result,
            //             'result': result,
            //             'total': totalprice,
            //             'checkoutstatus': ''
            //         });
            //     }
            // })
            res.render('checkout',{
                'point'  :'0',
                'dollar' :'0'
            });
        }
        else {
            res.redirect('/login'); //導向login頁面
        }

    },
    addcheckout: (req, res) => {
        if (req.session.userName) {
            console.log(req.body);
            var sql = `INSERT INTO orders(email,order_name,order_address,order_phone,order_payment) VALUES('${req.session.userName}','liuming','hanlin1','0912345678','貨到付款')`;
            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('insert success');
                }
            })
            var orderId;
            connection.query(`SELECT order_id FROM orders where email ='${req.session.userName}' ORDER BY order_id DESC LIMIT 1`, function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                else {
                    orderId = result[0].order_id;
                }
            })
            connection.query(`SELECT * FROM cart where email ='${req.session.userName}'`, function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    for(let i = 0 ; i < result.length ; i++ ){
                        var sql = `INSERT INTO ordersinformation(email,order_id,book_id,order_status) VALUES('${req.session.userName}','${orderId}','${result[i].book_id}','0')`;
                        // console.log(sql);
                        connection.query(sql, function (err, result1) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('insert ordersinformation success');
                            }
                        })
                    }
                    for(let i = 0 ; i < result.length ; i++ ){
                        var sql = `DELETE FROM cart Where email='${req.session.userName}'`;
                        // console.log(sql);
                        connection.query(sql, function (err, result2) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('delete from cart success');
                            }
                        })
                    }
                }
            })
            res.redirect('/order');
        }
        else {
            res.redirect('/login');
        }
    }
}

module.exports = checkoutController
