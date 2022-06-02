const mysql = require('mysql');

// const bcrypt = require('bcrypt');   // 引入 bcrypt
// const saltRounds = 10;              // 加鹽，增加密碼的複雜程度

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const registerController = {
    registerPage: (req, res) => {
        return res.render('register', { 
            'result': '',
            'login': '',
        })
    },
    registerAdd: (req, res) => {
        var data = req.body;
        // data.password = bcrypt.hashSync(data.password, saltRounds);
        // console.log(data.password);
        var sql = "INSERT INTO users(email,username,userpassword,phone,useraddr,point) VALUES('" + data.email + "','" + data.name + "','" + data.password + "','" + data.phone + " ',' " + data.address + "',0)";
        connection.query(sql, function (err, result) {
            if (err) {
                return res.render('register', { 'result': '註冊失敗，此電子信箱已被註冊','login': '', });
            }
            else {
                return res.render('register', { 'result': '註冊成功 , 點此跳轉至登入頁面','login': '', });
            }
        })

    }
}
module.exports = registerController
