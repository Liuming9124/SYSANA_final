const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})

const wishlistController = {
    wishlistPage: (req, res) => {
        if (req.session.userName) {
            connection.query("SELECT * FROM users", function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    if (req.session.userName == result[i].email) {
                        console.log(result)
                        return res.render('wishlist', {
                            'bookcoin': '0',
                            'updatestatus': '',
                            'login': req.session.userName,
                        })
                    }
                }
            })
        }
        else{
            res.redirect('/login');
        }
    },
    wishlistAdd:(req,res)=>{
    if(req.session.userName){
        var data = req.body;
        connection.query(`SELECT * FROM users WHERE email = '${req.session.userName}'`, function (err, result) {
            if (!err){
                if(result[0].point>1){//寫入資料庫
                    var sql = `INSERT INTO wish  VALUES ('${req.session.userName}','','${data.name}','${data.writer}','1','0');`;
                    connection.query(sql, function (err, result1){
                        if
                         (err){
                            console.log(err);
                        }
                        else{//更新扣點
                            var point_sql = `UPDATE users SET point ='${result[0].point-1}' WHERE email = '${req.session.userName}';`;
                            connection.query(point_sql,function(err,res){
                                if(err){
                                    console.log(err);
                                }
                            }
                            )
                            return res.render('wishlist', {
                                'bookcoin': result[0].point,
                                'updatestatus': 'success',
                                'login': req.session.userName,
                            })
                    }
                })
                }else{
                    return res.render('wishlist', {
                        'bookcoin': result[0].point,
                        'updatestatus': 'fault',
                        'login': req.session.userName,
                    })
                }
                
            }
        })
    }
    else{
        return res.redirect ('/login');
    }
        
    }
}

module.exports = wishlistController
