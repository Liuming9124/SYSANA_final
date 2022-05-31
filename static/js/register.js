function compare() {
    var password = document.getElementById('password').value;
    var password1 = document.getElementById('password1').value;
    //console.log(password);
    //console.log(password1);
    
    if(password!=password1) {
        alert('密碼不相同')
        document.getElementById('password1').value='';
        return;
    }
    else {
        document.getElementById('registerbutton').submit();
    }

}
// const { name } = require("ejs");

// $(document).ready(function () {

//     $("#registerbtn").click(function () {
//         var name = { name: $('input[name=name1]').val() };
//         $.ajax({
//             data: name,

//             success: function (data) {

//                 $('input[name=Username]').next().next().after('<div id="check_message" align="center" style="#FF0000">' + data.check + '</div>');

//                 $('input[name=Username]').focus(function () {

//                     $('#check_message').remove();

//                 });
//             },

//             error: function(jqXHR, textStatus, errorThrown) {

//                 alert('error' + textStatus + 'errorThrown');

//             }
//         })

//     });

// });