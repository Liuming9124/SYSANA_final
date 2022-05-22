const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const loginController = {
    loginPage: (req, res) => {
        return res.render('login')
    },
    userlogin: (req, res) => {
        var user = req.body;
        var compare = "SELECT * FROM users";
        connection.query(compare, function (err, result) {
            var count = 0;
            // console.log(result);
            for (var i = 0; i < result.length; i++) {
                if (user.username == result[i].email && user.password == result[i].userpassword) {
                    // return res.render('login', { 'result': '帳號或密碼錯誤' });
                    console.log("登入成功");
                    req.session.userName = req.body.username; // 登入成功，設定 session
                    console.log(req.session.userName);
                    res.redirect('/member');
                    break;
                }
                else {
                    count++
                }
            }
            if (count == result.length) {
                // return res.render('login', { 'result': '登入失敗' });
                console.log("登入失敗");
            }
        })
        // console.log(user.username);

    }
}

module.exports = loginController
