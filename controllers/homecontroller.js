

const homeController = {
    homePage: (req, res) => {
        return res.render('home',{
            'howmanybook':'1',
            'bookname':'書本1',
            'bookno':'00000000',
            'bookwriter':'劉銘',
            'bookmoney':'666'
          })
    }
}

module.exports = homeController
