var home = {
    sayhello: function(sayhello){
        console.log('sayhello');
        var x = 'HOME';
        (document).getElementById('logo').innerHTML(x);
    }
};

module.exports = home