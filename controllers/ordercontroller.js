

const orderController = {
    orderPage: (req, res) => {
        if (req.session.userName) {
            connection.query("SELECT * FROM users", function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (req.session.userName == result[i].email) {
                        console.log(result)
                        return res.render('order')
                    }
                }
            })
        }
    }
}

module.exports = orderController
