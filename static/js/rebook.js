
function compare() {
    var re_price = document.getElementById('re_price').value;
    re_price = parseInt(re_price)
    //console.log(re_price);
    //console.log(typeof (re_price))
    const re_status = document.getElementById('re_status').value;
    //console.log(re_status);
    //console.log(typeof (re_status))
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
function status() {
    const re_status = document.getElementById('re_status').value;
    if(re_status=='請選擇書籍狀況'){
        alert('請選擇書籍狀況')
        return false
    }
    else{
        return true;
    }
}
