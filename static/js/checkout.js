function compare() {
    var bookcoin = document.getElementById('bookcoin').textContent;
    var coin = document.getElementById('coin').value;
   bookcoin = parseInt(bookcoin)
   coin = parseInt(coin)
   //console.log(bookcoin)
   //console.log(typeof(bookcoin))
   if(coin>bookcoin){
       alert('點數不足')
       return false;
   }
   else {
    return true;
   }
}