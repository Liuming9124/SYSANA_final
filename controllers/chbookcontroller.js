const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'book',
    password: 'book',
    database: 'book'
})


const chbookController = {
    
    chbookPage: (req, res) => {
        if (req.session.userName){
            return res.render('chbook', { 'result': '' , 'bookcoin': '0'})
        }
        else{
            return res.redirect('/login');
        }
    },
    chbookAdd: (req, res) => {
        if (req.session.userName){
            var data = req.body;
            var sql = `INSERT INTO changes (email,ch_name,ch_address,ch_bname,ch_bauthor,ch_bstatus,ch_bprice,ch_judge)  VALUES ('${req.session.userName}','${data.ch_name}','${data.ch_address}','${data.ch_bname}','${data.ch_bauthor}','${data.ch_bstatus}','${data.ch_bprice}','0');`;
            console.log(sql)
            connection.query(sql, function (err, result) {
                if (err) {
                    return res.render('chbook', { 'result': 'fail' , 'bookcoin': '0'})
                }
                else {
                    return res.render('chbook', { 'result': 'success' , 'bookcoin': '0'})
                }
            })
        }
        else{
            return res.redirect ('/login');
        }
        
        

    }
}
module.exports = chbookController
