const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const collectController = {
    collectPage: (req, res) => {
        if (req.session.userName) {

            connection.query("SELECT * FROM collect where email ='" + req.session.userName + "'", function (err, result, fields) {
                if (err) {
                    throw err;
                }
                else {
                    res.render('collect', { //渲染頁面，(配合ejs的格式)
                        'collectbook': result,
                        'result': result,
                        'collectstatus': ''
                    });
                }
            })
        }
        else {
            res.redirect('/login'); //導向login頁面
        }
    },
    addCollect: (req, res) => {
        if (req.session.userName) {

            // console.log(typeof(req.params.id));

            connection.query("SELECT * FROM product where book_id='" + req.params.id + "'", function (err, result) {
                if (err) {
                    return res.render('collect', { 'collectstatus': '已加入收藏' });
                }
                else {
                    // console.log(result)
                    // console.log(result[0].book_id)
                    var sql = "INSERT INTO collect(email,book_id,book_price,book_author) VALUES('" + req.session.userName + "'," + result[0].book_id + ",'" + result[0].book_price + "','" + result[0].book_author + "')";
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
                                        'collectbook': result,
                                        'result': result,
                                        'total': totalprice,
                                        'collectstatus': '此書已存在在收藏'
                                    });
                                }
                            })
                        }
                        else {
                            res.redirect('/home');
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

module.exports = collectController
