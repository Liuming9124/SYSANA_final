const Connection = require("mysql/lib/Connection")
const { UCS2_PERSIAN_CI } = require("mysql/lib/protocol/constants/charsets")


const registerController = {
    registerPage: (req, res) => {
        return res.render('register', { 'result': '' })
    },
    registerAdd: (req, res) => {

        console.log(req.body);
        res.render('register', { 'result': '註冊成功 , 點此跳轉至登入頁面' });
    }
}
const Addregister = { //插入資料(固定)
    AddregisterPage: (req, res) => {
        var sql = "INSERT INTO users(email,username,userpassword,phone,useraddr,point) VALUES('book2@gmail.com','測試','book2','0912345678','翰林學園',0)";
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log("successful");
            }
        })
    }

}
module.exports = registerController
