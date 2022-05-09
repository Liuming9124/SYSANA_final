function get(url, data) {
    $.get(
        url,
        data,
        (response, status) => {
            if (status == "success") {
                $("#result").html(`${response}<br>(By get)`);
            }
        }
    )
}

function post(url, data) {
    $.post(
        url,
        data,
        (response, status) => {
            if (status == "success") {
                $("#result").html(`${response}<br>(By post)`);
            }
        }
    )
}

$(document).ready(() => {  // equals to "window.onload"
    $("#submit-get").click(() => {
        let data = {
            user : $("#user-get").val(),
            pawd : $("#pawd-get").val(),
        };
        get("login.php", data);
    })
    
    $("#submit-post").click(() => {
        let data = {
            user : $("#user-post").val(),
            pawd : $("#pawd-post").val(),
        };
        post("login.php", data);
    })
});