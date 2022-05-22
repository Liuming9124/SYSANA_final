

const registerController = {
    registerPage: (req, res) => {
        return res.render('register', { 'result': '' })
    },
    registerAdd: (req, res) => {

        console.log(req.body);
        res.render('register', { 'result': '註冊成功 , 點此跳轉至登入頁面' });
    }
}

module.exports = registerController
