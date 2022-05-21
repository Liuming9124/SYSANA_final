
// bookinfo = [
//     {
//         "bname"  :"book1",
//         "bprice" :"100",
//         "bauthor":"liu",
//         "bimg"   :"1.jpg",
//         "bid"    :"111"
//     },
//     {
//         "bname"  :"book2",
//         "bprice" :"200",
//         "bauthor":"liu2",
//         "bimg"   :"2.jpg",
//         "bid"    :"222"
//     },
//     {
//         "bname"  :"book3",
//         "bprice" :"300",
//         "bauthor":"liu3",
//         "bimg"   :"3.jpg",
//         "bid"    :"333"
//     }
// ]





// $(document).ready(function(){
//     var namearr   = document.getElementsByClassName("name")
//     var pricearr  = document.getElementsByClassName("price")
//     var authorarr = document.getElementsByClassName("author")
//     var imgarr    = document.getElementsByClassName("imgsrc")
//     var bidarr    = document.getElementsByClassName("bid")
//     for (let i = 0 ; i < 3; i++){
//         namearr[i].textContent   = bookinfo[i]["bname"]
//         pricearr[i].textContent  = bookinfo[i]["bprice"]
//         authorarr[i].textContent = bookinfo[i]["bauthor"]
//         imgarr[i].src            = `../static/BookImg/${bookinfo[i]["bimg"]}`
//         bidarr[i].textContent    = "書籍編號 : " + bookinfo[i]["bid"]
//     }
// })