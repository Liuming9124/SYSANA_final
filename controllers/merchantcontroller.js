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
            connection.query(`SELECT * FROM  changes WHERE ch_judge = '0'`, function (err, result) {
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
                    connection.query(`SELECT wish_name,wish_author,SUM(wish_total) AS wish_total FROM wish GROUP BY wish_name ORDER BY wish_total DESC;`,function(err,result1){
                        if(err){
                            console.log(err);
                        }
                        else{
                            
                            return res.render('merchantwish', { 'result1': result1,'result': result });
                        }
                    })
                }
            })
        }
        else{
            return res.redirect('/login');
        }
        
    },
    confirmChbook: (req, res) => {  //?????????judge?????????1 ????????????judge???2
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`UPDATE changes SET ch_judge = '1' WHERE ch_id = '${req.params.id}';`, function (err, result, fields) {        //????????????????????????
                if (err) {
                    return res.redirect('/merchant/chbook');
                }
                else {
                    connection.query(`SELECT * FROM changes WHERE ch_id = '${req.params.id}'`, function (err1, nowbook){            //???????????????????????????
                        if (!err){
                            var sql = `SELECT * FROM changes WHERE email != '${nowbook[0].email}' and ch_bprice = '${nowbook[0].ch_bprice}' and ch_judge = '1' LIMIT 1`;
                            // console.log(sql);
                            connection.query(sql, function(err2, afterbook){          //???????????????????????????????????????;
                                if (!err2){
                                    // console.log('result',afterbook);
                                    // console.log(afterbook.length);
                                    if (afterbook.length != 0){
                                        var sqlupdate = `UPDATE changes SET ch_judge = '2', ch_complete = '${afterbook[0].ch_id}' WHERE ch_id = '${nowbook[0].ch_id}';` ;
                                        var sqlupdate2= `UPDATE changes SET ch_judge = '2', ch_complete = '${nowbook[0].ch_id}' WHERE ch_id = '${afterbook[0].ch_id}';`;
                                        console.log(sqlupdate);
                                        connection.query(sqlupdate, function(err3, resultEnd){
                                            if (!err3){
                                                // console.log('????????????');
                                                connection.query(sqlupdate2, function(err4, resultEnd2){
                                                    if (!err4){
                                                        console.log('????????????');
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
    cancelChbook: (req, res) => {       //??????judge???3
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
    showChbook: (req,res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM  changes WHERE ch_judge = '1'`, function (err, result) {
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
                    res.render('merchantorder', { //???????????????(??????ejs?????????)
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
            connection.query(`SELECT * FROM orders where order_id ='${req.params.id}'`, function (err, result, fields) {    //?????????orderID -> result ????????????
                if (err) {
                    res.redirect('/merchant/order');
                }
                else {
                    connection.query(`UPDATE users SET point = point - ${result[0].order_delpoint} WHERE users.email = '${result[0].email}';`, function (err1, result1) { // ??????book??? ??????users Point ??????
                        if (err) {
                            console.log(err1);
                        }
                        else {
                            console.log('delpoint success');
                            var sum = 0;
                            connection.query(`SELECT book_price FROM product WHERE book_id = any (SELECT book_id FROM ordersinformation WHERE order_id = ${req.params.id});`, function (err2, result2) { //????????????????????????????????? 
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
                                    connection.query(`UPDATE users SET point = point + ${(sum - sum % 100) / 100} WHERE email = '${result[0].email}'`, function (err3, result3) { // ??????book????????????????????? 
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
            //??????order id ?????????????????? ?????????????????????
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
                    res.render('merchantorder', { //???????????????(??????ejs?????????)
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
                            connection.query(`UPDATE users SET point = point + ${result[0].re_point} WHERE users.email = '${result[0].email}';`, function (err2, result2) { // ??????book??? ??????users Point ??????
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
    showRebook: (req, res) => {
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT * FROM reduce where re_judge='${req.params.id}'`, function (err, result) {
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
    confirmwish: (req, res) => { //req.params.id
        if (req.session.userName == 'book@gmail.com'){
            connection.query(`SELECT wish_name,wish_author,SUM(wish_total) AS wish_total FROM wish WHERE wish_id = '${req.params.id}' GROUP BY wish_name;`,function(err,result){
                if(err){
                    console.log(err);
                }
                else{
                    connection.query(`SELECT * FROM wish where wish_name ='${result[0].wish_name}'`, function (err, result1){
                        if(err){
                            console.log(err);
                        }
                        else{                                                                        ///??????
                            connection.query(`UPDATE wish SET wish_judge = 2 WHERE wish_name = '${result1[0].wish_name}';`, function (err1, resultEnd2, fields) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                        console.log(`cancel ${req.params.id} success`);
                                        return res.redirect('/merchant/wish');
                                        }
                                    });
                                }
                            })
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
