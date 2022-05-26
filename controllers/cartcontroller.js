const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})
var totalprice = 0;
const cartController = {
    cartPage: (req, res) => {
        if (req.session.userName) {

            connection.query("SELECT * FROM cart where email ='" + req.session.userName + "'", function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    totalprice=0;
                    for (var i = 0; i < result.length; i++) {
                        totalprice += result[i].book_price
                    }
                    res.render('cart', { //渲染頁面，(配合ejs的格式)
                        'cartbook': result,
                        'result': result,
                        'total': totalprice,
                        'cartstatus': ''
                    });
                }
            })
        }
        else {
            res.redirect('/login'); //導向login頁面
        }

    },
    addCart: (req, res) => {
        if (req.session.userName) {

            // console.log(typeof(req.params.id));

            connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
                if (err) {
                    return res.render('collect', { 'cartstatus': '已加入購物車' });
                }
                else {
                    // console.log(result)
                    // console.log(result[0].book_id)
                    var sql = "INSERT INTO collect(email,book_id,book_price,book_author) VALUES('" + req.session.userName + "'," + result[0].book_id + ",'" + result[0].book_price + "','" + result[0].author + "')";
                    // console.log(sql);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            connection.query("SELECT * FROM collect where email ='" + req.session.userName + "'", function (err, result, fields) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    totalprice=0;
                                    for (var i = 0; i < result.length; i++) {
                                        totalprice += result[i].book_price
                                    }
                                    res.render('collect', { //渲染頁面，(配合ejs的格式)
                                        'cartbook': result,
                                        'result': result,
                                        'cartstatus': '此書已存在在收藏'
                                    });
                                }
                            })
                        }
                        else {
                            console.log('add to cart success');
                        }
                    })
                }
            })
        }
        else {
            res.redirect('/login');
        }
    },
    buyCart: (req, res) => {
        if (req.session.userName) {

            // console.log(typeof(req.params.id));

            connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
                if (err) {
                    return res.render('cart', { 'cartstatus': '已加入購物車' });
                }
                else {
                    // console.log(result)
                    // console.log(result[0].book_id)
                    var sql = "INSERT INTO cart(email,book_price,book_author,book_id,number) VALUES('" + req.session.userName + "'," + result[0].book_price + ",'" + result[0].book_author + "','" + result[0].book_id + "',1)";
                    // console.log(sql);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            connection.query("SELECT * FROM cart where email ='" + req.session.userName + "'", function (err, result, fields) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    totalprice=0;
                                    for (var i = 0; i < result.length; i++) {
                                        totalprice += result[i].book_price
                                    }
                                    res.render('cart', { //渲染頁面，(配合ejs的格式)
                                        'cartbook': result,
                                        'result': result,
                                        'total': totalprice,
                                        'cartstatus': '此書已存在在購物車'
                                    });
                                }
                            })
                        }
                        else {
                            res.redirect('/cart');
                        }
                    })
                }
            })
        }
        else {
            res.redirect('/login');
        }
    },
    delCart: (req, res) => {
        if (req.session.userName) {

            // console.log(req.params.id);

            connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
                if (err) {
                    return res.render('cart', { 'cartstatus': '已加入購物車' });
                }
                else {
                    // console.log(result)
                    // console.log(result[0].book_id)
                    var sql = "DELETE FROM cart Where email='"+ req.session.userName + "' and book_id='" + req.params.id + "'";
                    // console.log(sql);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log('error');
                        }
                        else {
                            console.log('success');
                            res.redirect('/cart');
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
