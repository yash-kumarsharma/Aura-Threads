function changeSRC(){
    var img = document.getElementById("srchng");

    if(img.src.includes("1.png")){
        img.src = "0.png";
    } else{
        img.src = "1.png";
    }
}
function changeSRC2(){
    var img = document.getElementById("srchng2");

    if(img.src.includes("Slider2/11.jpg")){
        img.src = "Slider2/12.jpg";
    } else{
        img.src = "Slider2/11.jpg";
    }
}
function changeSRC3(){
    var img = document.getElementById("srchng3");

    if(img.src.includes("access/b1.webp")){
        img.src = "access/b2.webp";
    } else{
        img.src = "access/b1.webp";
    }
}
function changeSRC4(){
    var img = document.getElementById("srchng4");

    if(img.src.includes("access/b3.webp")){
        img.src = "access/b4.jpg";
    } else{
        img.src = "access/b3.webp";
    }
}
setInterval(changeSRC,1200);
setInterval(changeSRC2,1200);
setInterval(changeSRC3,1200);
setInterval(changeSRC4,1200);