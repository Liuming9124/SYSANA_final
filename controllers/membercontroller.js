
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
                if (!err) {
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
    memberPunch: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT punch FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
                if (!err) {
                    // console.log('pt= ',result[0].punch);
                    let ct = Date.now();    //current time
                    let pt = (new Date(result[0].punch)).getTime();   //last punch time

                    if ((ct - pt) >= 86400000) {
                        let nct = new Date(ct);
                        let time = `${nct.getFullYear()}-${nct.getMonth() + 1}-${nct.getDate()} ${nct.getHours()}:${nct.getMinutes()}:${nct.getSeconds()}`;

                        connection.query(`UPDATE users SET punch = '${time}' , point = (point + 1) WHERE email = '${req.session.userName}';`, function (err1, result1) {
                            if (!err) {
                                console.log('punch success');
                                return res.redirect('/member');
                            }
                            else return res.redirect('/member');
                        })
                    }
                    else {
                        return res.redirect('/member');     //Had punch with a day;
                    }
                }
                else console.log(err);
            })
        }
        else return res.redirect('/login');
    },
    memberUpdate: (req, res) => {
        var data = req.body;
        // console.log(data);
        console.log("----");
        // console.log(req.session.userName);
        connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
            if (!err) {
                var status = 0;
                var user = result[0];
                if (user.userpassword == data.password) {
                    connection.query(`UPDATE users SET username ='${data.name}' WHERE email ='${user.email}'`, function (err, result) {
                        if (err) {
                            status = 1;
                            throw err;
                        }
                        else {
                            console.log("successufl");
                        }
                    })
                    connection.query(`UPDATE users SET phone = '${data.phone}' WHERE email = '${user.email}' `, function (err, result2) {
                        if (err) {
                            status = 1;
                            throw err
                        }
                    })
                    if (data.newpass == data.newpass2) {
                        if (data.newpass != '') {
                            connection.query(`UPDATE users SET userpassword='${data.newpass}' WHERE email='${user.email}'`, function (err, result3) {
                                if (err) {
                                    status = 1;
                                    throw err
                                }
                                else {
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
                    if (status == 0) {
                        return res.redirect('/member');
                    }
                }
                else {
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
    },
    myrebookPage: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT * FROM reduce WHERE email = '${req.session.userName}'`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('myrebook', {
                        'result': result,
                    })
                }
            })
        }
        else {
            return res.redirect('/login');
        }
    },
    showrebook: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT * FROM reduce WHERE email = '${req.session.userName}' and re_judge = '${req.params.id}'`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('myrebook', {
                        'result': result,
                    })
                }
            })
        }
        else {
            return res.redirect('/login');
        }
    },
    mychbookPage: (req, res) => {
        if (req.session.userName) { 
            connection.query(`SELECT * FROM changes WHERE email = '${req.session.userName}'`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('mychbook', {
                        'result': result,
                    })
                }
            })
        }
        else {
            return res.redirect('/login');
        }
    },
    showchbook: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT * FROM changes WHERE email = '${req.session.userName}' and ch_judge = '${req.params.id}' `, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('mychbook', {
                        'result': result,
                    })
                }
            })
        }
        else {
            return res.redirect('/login');
        }
    },
}
module.exports = memberController
