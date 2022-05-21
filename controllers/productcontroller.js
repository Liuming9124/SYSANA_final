

const productController = {
    productPage: (req, res) => {
        return res.render('product',{
            'bookname':'書本1',
            'bookno':'00000000',
            'bookwriter':'劉銘',
            'bookmoney':'666'
          })
    }
}

module.exports = productController
