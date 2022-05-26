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

            // console.log(typeof(req.params.id));

            // connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
            //     if (err) {
            //         return res.render('checkout', { 'checkoutstatus': '已加入購物車' });
            //     }
            //     else {
            //         // console.log(result)
            //         // console.log(result[0].book_id)
            //         var sql = "INSERT INTO checkout(email,book_price,book_author,book_id,number) VALUES('" + req.session.userName + "'," + result[0].book_price + ",'" + result[0].book_author + "','" + result[0].book_id + "',1)";
            //         // console.log(sql);
            //         connection.query(sql, function (err, result) {
            //             if (err) {
            //                 connection.query("SELECT * FROM checkout where email ='" + req.session.userName + "'", function (err, result, fields) {
            //                     if (err) {
            //                         throw err;
            //                     }
            //                     else {
            //                         totalprice=0;
            //                         for (var i = 0; i < result.length; i++) {
            //                             totalprice += result[i].book_price
            //                         }
            //                         res.render('checkout', { //渲染頁面，(配合ejs的格式)
            //                             'checkoutbook': result,
            //                             'result': result,
            //                             'total': totalprice,
            //                             'checkoutstatus': '此書已存在在購物車'
            //                         });
            //                     }
            //                 })
            //             }
            //             else {
            //                 res.redirect('/checkout');
            //             }
            //         })
            //     }
            // })
        }
        else {
            res.redirect('/login');
        }
    }
}

module.exports = checkoutController
