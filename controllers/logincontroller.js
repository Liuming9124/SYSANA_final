

const loginController = {
    loginPage: (req, res) => {
        return res.render('login')
    },
    userlogin: (req, res) => {
        var user = req.body;
        console.log(user);
    }
}

module.exports = loginController
