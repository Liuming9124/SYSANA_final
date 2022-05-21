

const memberController = {
    memberPage: (req, res) => {
        return res.render('member', {
            'name': '劉銘',
            'email': 'liuliuming@liumail.com',
            'phone': '0986138613',
            'password': '',
            'bookcoin':'0'
        })
    }
}

module.exports = memberController
