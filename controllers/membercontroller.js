

const memberController = {
    memberPage: (req, res) => {
        console.log(req.session);
        if(req.session.userName){
            return res.render('member', {
                'name': '劉銘',
                'email': 'liuliuming@liumail.com',
                'phone': '0986138613',
                'password': '',
                'bookcoin':'0',
                'updatestatus':'編輯成功與否資訊'
            })
        }
        else{
            res.redirect('/login');
        }
        
    },
    memberUpdate: (req, res) => {
        var data = req.body;
        console.log(data);
        if ('book' == data.password){

            if (data.newpass == '' && data.newpass2 == '' ){
                //only update name or phone
            }
            else{   // update all
                if (data.newpass == data.newpass2){

                }
                else{
                    //you need to input same new password
                }
            }
        }
        else{
            console.log('密碼錯誤');
        }

    }
}

module.exports = memberController
