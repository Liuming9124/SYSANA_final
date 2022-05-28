const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const rebookController = {
    rebookPage: (req, res) => {
        if (req.session.userName) {
            connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
                if (!err){
                    return res.render('rebook',{'bookcoin': result[0].point})
                }
                else    return res.redirect('/login');
            })
        }
        else{
            return res.redirect('/login');
        }
    },
    rebookAdd : (req, res) => {
        // console.log(req.body);
        if (req.session.userName) {
            var data = req.body;
            var point = data.re_price;
            if (data.re_status == '7成~9成'){
                point *= 0.6;
                point = point-point%1;
            }
            else if (data.re_status == '全新'){
                point *= 0.5;
                point = point-point%1;
            }
            else if (data.re_status == '5成~7成'){
                point *= 0.4;
                point = point-point%1;
            }
            connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
                if (!err){
                    var sql = `INSERT INTO reduce (email,re_name,re_author,re_price,re_status,re_point,re_judge)  VALUES ('${req.session.userName}','${data.re_name}','${data.re_author}','${data.re_price}','${data.re_status}','${point}','0');`;
                    connection.query(sql, function (err, result1){
                        if (err){
                            console.log(err);
                        }
                        else{
                            return res.render('rebook',{'bookcoin': result[0].point})
                        }
                    })
                }
            })
        }
        else res.redirect('/login');
    }
}

module.exports = rebookController
