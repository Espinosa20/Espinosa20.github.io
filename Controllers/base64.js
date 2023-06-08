// Convert Base64 to Image
$(document).ready(function() {
    $("#BaseToImage").click(function() {
        //alert($("#response").val());
        document.getElementById('preview').setAttribute('src', $("#image").val());
        $("#preview").show();
    });
    });
    //Convert Image to Base64
    $(document).ready(function() {
    $("#inputFileToLoad").change(function() {
        var filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                var base64value = fileLoadedEvent.target.result;
                const nuevo= resizeBase64Img(base64value, 50, 50).then((result)=>{
                    console.log("After resize: "+result);
                });
                console.log(nuevo);
                $("#response").val(base64value);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    });
    });


 function resizeBase64Img(base64, newWidth, newHeight) {
    return new Promise((resolve, reject)=>{
        var canvas = document.createElement("canvas");
        canvas.style.width = newWidth.toString()+"px";
        canvas.style.height = newHeight.toString()+"px";
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = base64;
        img.onload = function () {
            context.scale(newWidth/img.width,  newHeight/img.height);
            context.drawImage(img, 0, 0); 
            resolve(canvas.toDataURL());               
        }
    });
}
