

const memberController = {
    memberPage: (req, res) => {
        console.log(req.session);
        if(req.session.userName){
            return res.render('member', {
                'name': '劉銘',
                'email': 'liuliuming@liumail.com',
                'phone': '0986138613',
                'password': '',
                'bookcoin':'0'
            })
        }
        else{
            res.redirect('/login');
        }
        
    },
    memberUpdate: (req, res) => {
        console.log(req.session);
        var data = req.body;
        console.log(data);

        if (data.password == result.password){
            if (data.newpass == data.newpass2){
                //更新到新密碼
            }
            else{
                
            }
        }
        else{
            console.log('密碼錯誤');
        }

        // connection.query(compare, function (err, result) {
        //     var count = 0;
        //     // console.log(result);
        //     for (var i = 0; i < result.length; i++) {
        //         if (user.username == result[i].email && user.password == result[i].userpassword) {
        //             // return res.render('login', { 'result': '帳號或密碼錯誤' });
        //             console.log("登入成功");
        //             req.session.userName = req.body.username; // 登入成功，設定 session
        //             console.log(req.session.userName);
        //             res.redirect('/');
        //             break;
        //         }
        //         else {
        //             count++
        //         }
        //     }
        //     if (count == result.length) {
        //         // return res.render('login', { 'result': '登入失敗' });
        //         console.log("登入失敗");
        //     }
        // })
    }
}

module.exports = memberController
