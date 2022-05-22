var db = require('../route/modules/db')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const registerController = {
    registerPage: (req, res) => {
        return res.render('register', { 'result': '' })
    },
    registerAdd: (req, res) => {
        var data = req.body;
        console.log(data.email);
        var sql = "INSERT INTO users(email,username,userpassword,phone,useraddr,point) VALUES('"+ data.email +"','"+ data.name +"','" + data.password + "','" + data.phone + " ',' " + data.address+ "',0)";
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                return res.render('register', { 'result': '註冊失敗，此電子信箱已被註冊' });
            }
            else {
                return res.render('register', { 'result': '註冊成功 , 點此跳轉至登入頁面' });
            }
        })
        
    }
}
module.exports = registerController
