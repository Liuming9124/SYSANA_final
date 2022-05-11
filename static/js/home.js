
bookinfo = [
    {
        "bname"  :"book1",
        "bprice" :"100",
        "bauthor":"liu",
        "bimg"   :"1.img"
    },
    {
        "bname"  :"book2",
        "bprice" :"200",
        "bauthor":"liu2",
        "bimg"   :"2.img"
    },
    {
        "bname"  :"book3",
        "bprice" :"300",
        "bauthor":"liu3",
        "bimg"   :"3.img"
    }
]





$(document).ready(function(){
    var name   = document.getElementsByClassName("h3 card-title mb-3")
    var prive  = document.getElementsByClassName("card-img-top cover")
    var img    = document.getElementsByClassName("image featured")
    console.log(namearr)
    for (let i = 0 ; i < 6; i++){
        namearr[i].textContent = hot[i]["name"]
        imgarr[i].src = hot[i]["img"]
        bodyarr[4*i].textContent = hot[i]["address"]
        bodyarr[4*i+1].textContent = hot[i]["bestseller"]
        bodyarr[4*i+2].textContent = hot[i]["comment0"]
        bodyarr[4*i+3].textContent = hot[i]["comment1"]
    }
})