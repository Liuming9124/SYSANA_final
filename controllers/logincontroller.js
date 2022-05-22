

const loginController = {
    loginPage: (req, res) => {
        return res.render('login')
    },
    userlogin: (req, res) => {
        let data = req.body;
        if (data.username == '') {
            return res.send({ resultCode: 400, resultMsg: '使用者名稱為空' });
        } else if (data.password == '') {
            return res.send({ resultCode: 400, resultMsg: '密碼為空' });
        } else {
            User.findOne({ name: data.name }).then(user => {
                if (!user) {
                    return res.send({ resultCode: 400, resultMsg: '使用者不存在' });
                }
                if (data.password != user.password) {
                    return res.send({ resultCode: 400, resultMsg: '密碼錯誤' });
                }
                //生成cookie
                auth.gen_session(user, res);
                return res.send({ resultCode: 200, resultMsg: '登入成功' });
            })
        }

    }
}

module.exports = loginController
