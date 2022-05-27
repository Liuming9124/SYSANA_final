const { json } = require("body-parser")




const merchantController = {
    merchantPage: (req, res) => {
        return res.render('merchant')
    },
    rebookPage: (req, res) => {
        var result = [
            {
                'book_img':'1.jpg',
                'username':'liu',
                'chbookname':'book1',
                'address':'1408'
            }
        ]
        return res.render('merchantrebook', {'result':result})
    },
    chbookPage: (req, res) => {
        var result = [
            {
                'book_img':'1.jpg',
                'username':'liu',
                'chbookname':'book1',
                'address':'1408'
            }
        ]
        return res.render('merchantchbook',{'result':result});
    },
    orderPage: (req, res) => {
        var result = [
            {
                'order_no':'1',
                'order_name':'liu',
                'book': [
                    {
                        'book_id':'1',
                        'book_name':'book1',
                        'book_price':'100',
                    },
                    {
                        'book_id':'2',
                        'book_name':'book2',
                        'book_price':'200',
                    }
                ],
                'address':'1408'
            },
            {
                'order_no':'1',
                'order_name':'liu',
                'book': [
                    {
                        'book_id':'1',
                        'book_name':'book1',
                        'book_price':'100',
                    },
                    {
                        'book_id':'2',
                        'book_name':'book2',
                        'book_price':'200',
                    },
                ],
                'address':'1408'
            }
        ]
        return res.render('merchantorder',{'result':result});
    },
    uploadPage: (req, res) => {
        return res.render('merchantupload')
    },
}

module.exports = merchantController
