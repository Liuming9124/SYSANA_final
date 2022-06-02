function previewFile() {
    var preview = document.getElementById('getimg');
    var file = document.getElementById('showimg').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}
//以上測試 