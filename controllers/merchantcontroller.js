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
        var result = [
            {
                'book_img':'1.jpg',
                'username':'liu',
                'chbookname':'book1',
                'address':'1408'
            }
        ]
        return res.render('merchantrebook', {'result':result})
    },
    chbookPage: (req, res) => {
        var result = [
            {
                'book_img':'1.jpg',
                'username':'liu',
                'chbookname':'book1',
                'address':'1408',
                'down':'150',
                'up':'500'
            },
            {
                'book_img':'1.jpg',
                'username':'liu',
                'chbookname':'book2',
                'address':'1408',
                'down':'150',
                'up':'500'
            }
        ]
        return res.render('merchantchbook',{'result':result});
    },
    orderPage: (req, res) => {
        var result = [
            {
                'order_no':'1',
                'order_name':'liu',
                'book': [
                    {
                        'book_id':'1',
                        'book_name':'book1',
                        'book_price':'100',
                    },
                    {
                        'book_id':'2',
                        'book_name':'book2',
                        'book_price':'200',
                    }
                ],
                'address':'1408'
            },
            {
                'order_no':'2',
                'order_name':'liu',
                'book': [
                    {
                        'book_id':'1',
                        'book_name':'book1',
                        'book_price':'100',
                    },
                    {
                        'book_id':'2',
                        'book_name':'book2',
                        'book_price':'200',
                    },
                ],
                'address':'1408'
            }
        ]
        return res.render('merchantorder',{'result':result});
    },
    uploadPage: (req, res) => {
        return res.render('merchantupload')
    },
    confirmOrder: (req, res) => {
        console.log('confirm ',req.params.id);
        return res.redirect('/merchant/order');
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
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log(`cancel ${req.params.id} success`);
                        return res.redirect('/merchant/order');
                    }
                });
            }
        })
    }
}

module.exports = merchantController
