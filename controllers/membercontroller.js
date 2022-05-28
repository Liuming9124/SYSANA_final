const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const memberController = {
    memberPage: (req, res) => {
        // console.log(req.session);
        if (req.session.userName) {
            connection.query("SELECT * FROM users", function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (req.session.userName == result[i].email) {
                        console.log(result)
                        return res.render('member', {
                            'name': result[i].username,
                            'phone': result[i].phone,
                            'bookcoin': '0',
                            'updatestatus': ''
                        })
                    }
                }
            })
        }
        else {
            res.redirect('/login');
        }

    },
    memberUpdate: (req, res) => {
        var data = req.body;
        // console.log(data);
        console.log("----");
        // console.log(req.session.userName);
        connection.query("SELECT * FROM users", function (err, result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result);
                if (req.session.userName == result[i].email) {
                    var status = 0;
                    if (result[i].userpassword == data.password) {
                        connection.query('UPDATE users SET username ="'+data.name+'" WHERE email ="'+result[i].email+'"',function(err,result){
                            if(err){
                                status = 1;
                                throw err;
                            }
                            else{
                                console.log("successufl");
                            }
                        })
                        connection.query('UPDATE users SET phone="'+data.phone+'" WHERE email="'+result[i].email+'"',function(err,result2){
                            if(err){
                                status = 1;
                                throw err
                            }
                        })
                        if (data.newpass == data.newpass2 ) {
                            if (data.newpass != ''){
                                connection.query('UPDATE users SET userpassword="'+data.newpass+'" WHERE email="'+result[i].email+'"',function(err,result3){
                                    if(err){
                                        status = 1;
                                        throw err
                                    }
                                    else{
                                        console.log("successful");
                                    }
                                })
                            }
                        }
                        else {
                            connection.query("SELECT * FROM users", function (err, result) {
                                for (var i = 0; i < result.length; i++) {
                                    if (req.session.userName == result[i].email) {
                                        console.log(result)
                                        return res.render('member', {
                                            'name': result[i].username,
                                            'phone': result[i].phone,
                                            'bookcoin': '0',
                                            'updatestatus': '欲更改密碼必須相同'
                                        })
                                    }
                                }
                            })
                        }
                        if (status == 0 ){
                            connection.query("SELECT * FROM users", function (err, result) {
                                for (var i = 0; i < result.length; i++) {
                                    if (req.session.userName == result[i].email) {
                                        console.log(result)
                                        return res.render('member', {
                                            'name': result[i].username,
                                            'phone': result[i].phone,
                                            'bookcoin': '0',
                                            'updatestatus': '編輯成功'
                                        })
                                    }
                                }
                            })
                        }
                    }
                    else{
                        //密碼錯誤
                        connection.query("SELECT * FROM users", function (err, result) {
                            for (var i = 0; i < result.length; i++) {
                                if (req.session.userName == result[i].email) {
                                    console.log(result)
                                    return res.render('member', {
                                        'name': result[i].username,
                                        'phone': result[i].phone,
                                        'bookcoin': '0',
                                        'updatestatus': '密碼錯誤'
                                    })
                                }
                            }
                        })
                    }
                }
            }
        })
    }
}

module.exports = memberController
