function compare() {
    var re_price = document.getElementById('re_price').value;
    var re_bookcoin = document.getElementById('showcoin').value;
    if(re_price==''){
        re_price='0'
    }
    re_price = parseInt(re_price)
    //console.log(re_price);
    //console.log(typeof (re_price))
    const re_status = document.getElementById('re_status').value;
    //console.log(re_status);
    if (re_status == '0.5') {
        var bookcoin = re_price * 0.5
        bookcoin = parseInt(bookcoin)
        console.log(bookcoin);
        document.getElementById('showcoin').textContent=(bookcoin); 
    }
    else if (re_status == '0.6') {
        var bookcoin = re_price * 0.6
        bookcoin = parseInt(bookcoin)
        console.log(bookcoin);
        document.getElementById('showcoin').textContent=(bookcoin); 
    }
    else if (re_status == '0.4') {
        var bookcoin = re_price * 0.4
        bookcoin = parseInt(bookcoin)
        console.log(bookcoin);
        document.getElementById('showcoin').textContent=(bookcoin); 
    }
    
}


