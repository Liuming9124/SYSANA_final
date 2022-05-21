

const cartController = {
    cartPage: (req, res) => {
        return res.render('cart',{
            'howmanybook':'1',
            'bookname':'書本1',
            'bookno':'00000000',
            'bookwriter':'劉銘',
            'bookmoney':'666',
            'total':'666'
          })
    }
}

module.exports = cartController
