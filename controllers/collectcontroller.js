

const collectController = {
    collectPage: (req, res) => {
        return res.render('collect', {
            'howmanybook': '1',
            'bookname': '書本1',
            'bookno': '00000000',
            'bookwriter': '劉銘',
            'bookmoney': '666'
        })
    }
}

module.exports = collectController
