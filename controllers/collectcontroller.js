

const collectController = {
    collectPage: (req, res) => {
        console.log("this book is book" + req.params.id);
        return res.render('collect',{
            'bookname':req.params.id,
            'bookno':'00000000',
            'bookwriter':'劉銘',
            'bookmoney':'666',
            'bookinfo': '這本書很好看喔！！這本書很好看喔'
        })
    }
}

module.exports = collectController
