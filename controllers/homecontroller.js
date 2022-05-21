

const homeController = {
    homePage: (req, res) => {
        var data = [
            { id: 1, name: "bob" },
            { id: 2, name: "john" },
            { id: 3, name: "jake" },
        ];
        
        JSON.stringify(data)
        return res.render('home')
    }
    
}

module.exports = homeController
