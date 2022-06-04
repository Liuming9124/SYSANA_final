const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const merchantController = {
    merchantPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            return res.render('merchant')
        }
        else{
            return res.redirect('/login');
        }
        
    },
    rebookPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM reduce where re_judge='0'`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result)
                    res.render('merchantrebook', { 'result': result })

                }
            })
        }
        else{
            return res.redirect('/login');
        }
        

    },
    chbookPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM  changes`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(result);
                    return res.render('merchantchbook', { 'result': result });
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },
    wishPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM  wish`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    /*connection.query(`SELECT wish_name,SUM(wish_total) FROM wish GROUP BY wish_name;`,function(err,result1){
                        if(err){
                            console.log(err);
                        }
                        else{
                            
                            return res.render('merchantwish', { 'result1': result1 });
                        }
                    })*/
                    return res.render('merchantwish', { 'result': result });
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },
    confirmChbook: (req, res) => {  //已審核judge狀態為1 交換成功judge為2
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`UPDATE changes SET ch_judge = '1' WHERE ch_id = '${req.params.id}';`, function (err, result, fields) {        //更新此交換書狀態
                if (err) {
                    return res.redirect('/merchant/chbook');
                }
                else {
                    connection.query(`SELECT * FROM changes WHERE ch_id = '${req.params.id}'`, function (err1, nowbook){            //抓出此交換書的資訊
                        if (!err){
                            var sql = `SELECT * FROM changes WHERE email != '${nowbook[0].email}' and ch_bprice = '${nowbook[0].ch_bprice}' and ch_judge = '1' LIMIT 1`;
                            // console.log(sql);
                            connection.query(sql, function(err2, afterbook){          //抓出能交換的一筆交換書資料;
                                if (!err2){
                                    // console.log('result',afterbook);
                                    // console.log(afterbook.length);
                                    if (afterbook.length != 0){
                                        var sqlupdate = `UPDATE changes SET ch_judge = '2', ch_complete = '${afterbook[0].ch_id}' WHERE ch_id = '${nowbook[0].ch_id}';` ;
                                        var sqlupdate2= `UPDATE changes SET ch_judge = '2', ch_complete = '${nowbook[0].ch_id}' WHERE ch_id = '${afterbook[0].ch_id}';`;
                                        console.log(sqlupdate);
                                        connection.query(sqlupdate, function(err3, resultEnd){
                                            if (!err3){
                                                // console.log('交換成功');
                                                connection.query(sqlupdate2, function(err4, resultEnd2){
                                                    if (!err4){
                                                        console.log('交換成功');
                                                        return res.redirect('/merchant/chbook');
                                                    }
                                                    else{
                                                        console.log(err4);
                                                        return res.redirect('/merchant/chbook');
                                                    }
                                                })
                                            }
                                            else{
                                                console.log(err3);
                                                return res.redirect('/merchant/chbook');
                                            }
                                        })
                                    }
                                    else{
                                        return res.redirect('/merchant/chbook');
                                    }
                                }
                                else    return res.redirect('/merchant/chbook');
                            });
                            // console.log(result1);
                        }
                        else    return res.redirect('/merchant/chbook');
                    });
                }
            });

        }
        else{
            return res.redirect('/login');
        }
        // console.log(req.params.id);
        
    },
    cancelChbook: (req, res) => {       //拒絕judge為3
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`UPDATE changes SET ch_judge = '3' WHERE ch_id = '${req.params.id}';`, function (err, result, fields) {
                if (err) {
                    return res.redirect('/merchant/chbook');
                }
                else {
                    console.log(`cancel ${req.params.id} success`);
                    return res.redirect('/merchant/chbook');
                }
            });
        }
        else{
            return res.redirect('/login');
        }
        
    },
    orderPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            var resultfinal = {};
            var x;

            connection.query(`SELECT * FROM orders where order_status='0'`, function (err1, result, fields) {
                if (err1) {
                    console.log(err);
                }
                else {

                    // console.log(result)
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
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },

    
    uploadPage: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            return res.render('merchantupload')
        }
        else{
            return res.redirect('/login');
        }
        
    },
    uploadItem: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            var data = req.body;
            var upsql = `INSERT INTO product (book_name,book_img,book_author,book_price,book_intro,book_type) VALUES('${data.name}','${data.picture}','${data.author}','${data.price}','${data.intro}','${data.type}');`;
            console.log(upsql);
            connection.query(upsql,function(err, result){
                if (!err){
                    // console.log('add success');
                    return res.redirect('/merchant/upload');
                }
                else    return res.redirect('/merchant/upload');
            })
        }
        else{
            return res.redirect('/login');
        }
    },
    confirmOrder: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
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
        }
        else{
            return res.redirect('/login');
        }
    },
    cancelOrder: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            // console.log('cancel ', req.params.id);
            //利用order id 查詢該筆訂單 並列為取消狀態
            connection.query(`UPDATE orders SET order_status = '2' WHERE order_id = '${req.params.id}';`, function (err, result, fields) {
                if (err) {
                    return res.redirect('/merchant/order');
                }
                else {
                    console.log(`cancel ${req.params.id} success`);
                    return res.redirect('/merchant/order');
                }
            });
        }
        else{
            return res.redirect('/login');
        }
        
    },
    showorder: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM orders where order_status='${req.params.id}'`, function (err, result, fields) {
                if (!err) {
                    res.render('merchantorder', { //渲染頁面，(配合ejs的格式)
                        'result': result,
                    });
                }
                else    console.log(err);
            })
        }
        else{
            return res.redirect('/login');
        }
    },
    confirmRebook: (req, res) => { //req.params.id
        if (req.session.userName == 'book@gmail.com'){
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
                                if (err) console.log(err);
                                else {
                                    return res.redirect('/merchant/rebook');
                                }
                            });
                        }
                    });
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },
    cancelRebook: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
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
        else{
            return res.redirect('/login');
        }
        

    },
    confirmwish: (req, res) => { //req.params.id
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM wish where wish_id ='${req.params.id}'`, function (err, result) {
                if (err) {
                    res.redirect('/merchant/wish');
                }
                else {
                    connection.query(`UPDATE wish SET wish_judge = 2 WHERE wish_id = '${req.params.id}';`, function (err1, result1, fields) {
                        if (err) {
                            console.log(err1);
                        }
                        else {
                            console.log(`cancel ${req.params.id} success`);
                            return res.redirect('/merchant/wish');
                        }
                    });
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },
    cancelwish: (req, res) => { //req.params.id
        if (req.session.userName == 'book@gmail.com'){
            
            connection.query(`SELECT * FROM wish where wish_id ='${req.params.id}'`, function (err, result) {
                if (err) {
                    res.redirect('/merchant/wish');
                }
                else {
                    connection.query(`UPDATE wish SET wish_judge = 3 WHERE wish_id = '${req.params.id}';`, function (err1, result1, fields) {
                        if (err) {
                            console.log(err1);
                        }
                        else {
                            console.log(`cancel ${req.params.id} success`);
                            return res.redirect('/merchant/wish');
                        }
                    });
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    }
    
}


module.exports = merchantController
