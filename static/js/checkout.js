function compare() {
    var bookcoin = document.getElementById('bookcoin').value;
    var coin = document.getElementById('coin').value;
    
    if(bookcoin>coin) {
        alert('book幣不足')
        document.getElementById('coin').value='0';
        return;
    }
    else {
        document.getElementById('buybutton').submit();
    }

}