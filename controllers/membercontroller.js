

const memberController = {
    memberPage: (req, res) => {
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
        
    }
}

module.exports = memberController
