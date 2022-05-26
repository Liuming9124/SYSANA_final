



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
        // var result = [
        //     {
        //         'buyer':'liu1',
        //         '':''
        //     }
        // ]
        return res.render('merchantorder');
    },
    uploadPage: (req, res) => {
        return res.render('merchantupload')
    },
}

module.exports = merchantController
