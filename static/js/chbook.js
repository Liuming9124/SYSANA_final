function status() {
    const ch_status = document.getElementById('ch_status').value;
    const ch_bprice = document.getElementById('ch_bprice').value;
    if(ch_status=='請選擇書籍狀況'){
        alert('請選擇書籍狀況')
        return false;
    }
    else if(ch_bprice=='選擇價格區間'){
        alert('選擇價格區間')
        return false;
    }
    else{
        return true;
    }
}