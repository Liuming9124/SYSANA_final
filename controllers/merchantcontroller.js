const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const merchantController = {
    merchantPage: (req, res) => {
        return res.render('merchant')
    },
    rebookPage: (req, res) => {
        
        connection.query(`SELECT * FROM reduce where re_judge='0'`, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
                res.render('merchantrebook', { 'result': result })
                
            }
        })

    },
    chbookPage: (req, res) => {
        var result = [
            {
                'book_img': '1.jpg',
                'username': 'liu',
                'chbookname': 'book1',
                'address': '1408'
            }
        ]
        return res.render('merchantchbook', { 'result': result });
    },
    orderPage: (req, res) => {
        var resultfinal = {};
        var x;

        connection.query(`SELECT * FROM orders where order_status='0'`, function (err1, result, fields) {
            if (err1) {
                console.log(err);
            }
            else {

                console.log(result)
                res.render('merchantorder', { //渲染頁面，(配合ejs的格式)
                    'result': result,
                });
                // var result = [
                //     {
                //         'order_no': '3',
                //         'order_name': 'liu',
                //         'order_email': 'liu@gmail.com',
                //         'book': [
                //             {
                //                 'book_id': '1',
                //                 'book_name': 'book1',
                //                 'book_price': '100',
                //             },
                //             {
                //                 'book_id': '2',
                //                 'book_name': 'book2',
                //                 'book_price': '200',
                //             }
                //         ],
                //         'address': '1408'
                //     },
                //     {
                //         'order_no': '4',
                //         'order_name': 'liu',
                //         'order_email': 'liu@gmail.com',
                //         'book': [
                //             {
                //                 'book_id': '1',
                //                 'book_name': 'book1',
                //                 'book_price': '100',
                //             },
                //             {
                //                 'book_id': '2',
                //                 'book_name': 'book2',
                //                 'book_price': '200',
                //             },
                //         ],
                //         'address': '1408'
                //     }
                // ]
                // return res.render('merchantorder', { 'result': result });
            }
        })
    },

    // var result = [
    //     {
    //         'order_no': result1.order_id,
    //         'order_name': result2.order_name,
    //         'order_email': result1.email,
    //         'book': [
    //             {
    //                 'book_id': result1.book_id,
    //                 'book_name': 'book1',
    //                 'book_price': '100',
    //             },
    //             {
    //                 'book_id': '2',
    //                 'book_name': 'book2',
    //                 'book_price': '200',
    //             }
    //         ],
    //         'address': result2.order_address
    //     }

    // ]
    // return res.render('merchantorder', { 'result': result});
    uploadPage: (req, res) => {
        return res.render('merchantupload')
    },
    confirmOrder: (req, res) => {
        console.log('confirm ', req.params.id);
        //delete user point -> return bonus point -> update order status
        connection.query(`SELECT * FROM orders where order_id ='${req.params.id}'`, function (err, result, fields) {    //查詢此orderID -> result 為此訂單
            if (err) {
                res.redirect('/merchant/order');
            }
            else {
                connection.query(`UPDATE users SET point = point - ${result[0].order_delpoint} WHERE users.email = '${result[0].email}';`, function (err1, result1) { // 折抵book幣 並從users Point 扣除
                    if (err) {
                        console.log(err1);
                    }
                    else {
                        console.log('delpoint success');
                        var sum = 0;
                        connection.query(`SELECT book_price FROM product WHERE book_id = any (SELECT book_id FROM ordersinformation WHERE order_id = ${req.params.id});`, function (err2, result2) { //搜尋此使用者的所有訂單 
                            if (err2) {
                                console.log(err2);
                            }
                            else {
                                for (let i = 0; i < result2.length; i++) {
                                    // console.log(result);
                                    sum = sum + result2[i].book_price;
                                    // console.log(result[0].book_price);
                                }
                                console.log(sum);
                                connection.query(`UPDATE users SET point = point + ${(sum - sum % 100) / 100} WHERE email = '${result[0].email}'`, function (err3, result3) { // 回饋book幣到使用者帳號 
                                    if (err3) {
                                        console.log(err3);
                                    }
                                    else {
                                        console.log('addPoint success', (sum - sum % 100) / 100);
                                        connection.query(`UPDATE orders SET order_status = '1' WHERE order_id = '${req.params.id}';`, function (err, result, fields) {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                console.log(`confirm ${req.params.id} success`);
                                                return res.redirect('/merchant/order');
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    },
    cancelOrder: (req, res) => {
        // console.log('cancel ', req.params.id);
        //利用order id 查詢該筆訂單 並列為取消狀態
        connection.query(`SELECT * FROM orders where order_id ='${req.params.id}'`, function (err, result, fields) {
            if (err) {
                res.redirect('/merchant/order');
            }
            else {
                connection.query(`UPDATE orders SET order_status = '2' WHERE order_id = '${req.params.id}';`, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(`cancel ${req.params.id} success`);
                        return res.redirect('/merchant/order');
                    }
                });
            }
        })
    },
    confirmRebook: (req, res) => { //req.params.id
        connection.query(`SELECT * FROM reduce where re_id ='${req.params.id}'`, function (err, result, fields) {
            if (err) {
                res.redirect('/merchant/rebook');
            }
            else {
                connection.query(`UPDATE reduce SET re_judge = '1' WHERE re_id = '${req.params.id}';`, function (err1, result1, fields) {
                    if (err) {
                        console.log(err1);
                    }
                    else {
                        connection.query(`UPDATE users SET point = point + ${result[0].re_point} WHERE users.email = '${result[0].email}';`, function (err2, result2) { // 折抵book幣 並從users Point 扣除
                            if (err)    console.log(err);
                            else{
                                return res.redirect('/merchant/rebook');
                            }
                        });
                    }
                });
            }
        })
    },
    cancelRebook: (req, res) => {
        connection.query(`SELECT * FROM reduce where re_id ='${req.params.id}'`, function (err, result) {
            if (err) {
                res.redirect('/merchant/rebook');
            }
            else {
                connection.query(`UPDATE reduce SET re_judge = '2' WHERE re_id = '${req.params.id}';`, function (err, result1) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return res.redirect('/merchant/rebook');
                    }
                });
            }
        })

    }
}

module.exports = merchantController
