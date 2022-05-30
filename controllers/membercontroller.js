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
            connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
                if (!err){
                    return res.render('member', {
                        'name': result[0].username,
                        'phone': result[0].phone,
                        'bookcoin': result[0].point,
                        'updatestatus': ''
                    })
                }
            })
        }
        else {
            res.redirect('/login');
        }

    },
    memberPunch:(req, res) => {
        if (req.session.userName){
            connection.query(`SELECT punch FROM users WHERE email = '${req.session.userName}'`, function (err, result){
                if (!err){
                    let ct = new Date(Date.now());
                    let test = new Date(1);
                    console.log(test);
                    if (result[0].punch == ct){
                        // console.log('same date, ',result[0]);
                    }
                    else{
                        
                        // console.log('different date, ',result[0].punch,ct);
                    }
                }
                else    console.log(err);
            })
        }
        else    return res.redirect('/login');
    },
    memberUpdate: (req, res) => {
        var data = req.body;
        // console.log(data);
        console.log("----");
        // console.log(req.session.userName);
        connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
            if (!err){
                var status = 0;
                var user = result[0];
                if (user.userpassword == data.password) {
                    connection.query(`UPDATE users SET username ='${data.name}' WHERE email ='${user.email}'`,function(err,result){
                        if(err){
                            status = 1;
                            throw err;
                        }
                        else{
                            console.log("successufl");
                        }
                    })
                    connection.query(`UPDATE users SET phone = '${data.phone}' WHERE email = '${user.email}' `,function(err,result2){
                        if(err){
                            status = 1;
                            throw err
                        }
                    })
                    if (data.newpass == data.newpass2 ) {
                        if (data.newpass != ''){
                            connection.query(`UPDATE users SET userpassword='${data.newpass}' WHERE email='${user.email}'`,function(err,result3){
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
                        return res.render('member', {
                            'name': user.username,
                            'phone': user.phone,
                            'bookcoin': user.point,
                            'updatestatus': '欲更改密碼必須相同'
                        })
                        
                    }
                    if (status == 0 ){
                        return res.redirect('/member');
                    }
                }
                else{
                    //密碼錯誤
                    return res.render('member', {
                        'name': user.username,
                        'phone': user.phone,
                        'bookcoin': user.point,
                        'updatestatus': '密碼錯誤'
                    })
                }
            }
        })
    }
}
module.exports = memberController
