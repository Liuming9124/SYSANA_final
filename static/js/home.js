
bookinfo = [
    {
        "bname"  :"book1",
        "bprice" :"100",
        "bauthor":"liu",
        "bimg"   :"1.jpg"
    },
    {
        "bname"  :"book2",
        "bprice" :"200",
        "bauthor":"liu2",
        "bimg"   :"2.jpg"
    },
    {
        "bname"  :"book3",
        "bprice" :"300",
        "bauthor":"liu3",
        "bimg"   :"3.jpg"
    }
]





$(document).ready(function(){
    var namearr   = document.getElementsByClassName("name")
    var pricearr  = document.getElementsByClassName("price")
    var authorarr = document.getElementsByClassName("author")
    var imgarr    = document.getElementsByClassName("image featured")
    console.log(namearr)
    console.log(pricearr)
    console.log(authorarr)
    console.log(imgarr)
    for (let i = 0 ; i < 6; i++){
        namearr[i].textContent   = bookinfo[i]["bname"]
        pricearr[i].textContent  = bookinfo[i]["bprice"]
        authorarr[i].textContent = bookinfo[i]["bauthor"]
        imgarr[i].textContent    = `"../static/images/BookImg/${bookinfo[i]["img"]}"`
    }
})