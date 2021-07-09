var srcImg = null;
var dstImg = null;

let imgElement = document.getElementById('imgInput');
let inputElement = document.getElementById('fileInput');

document.getElementById('cannyControls').style.visibility = "hidden";
document.getElementById('blurControl').style.visibility = "hidden";
document.getElementById('bcControls').style.visibility = "hidden";

inputElement.addEventListener('change', (e) => {
     srcImg = URL.createObjectURL(e.target.files[0]);
     imgElement.src = srcImg;

     dstImg = new cv.Mat();
}, false);

function onOpenCvReady() {
     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}

function bwEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);

     dstImg = convertRGBToGray(src);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}

function cannyEvent() {
     document.getElementById('cannyControls').style.visibility = "visible";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);

     dstImg = cannyFilter(src, document.getElementById('cannyTrackbarMin').value * 1.0, document.getElementById('cannyTrackbarMax').value * 1.0);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}

function blurEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "visible";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);

     dstImg = blur(src, document.getElementById('blurSize').value * 1.0);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}

function sepiaEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     var src = cv.imread(imgElement);
     
     dstImg = sepiaFilter(src);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}

function bcEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "visible";
     if (srcImg == null) return;

     var src = cv.imread(imgElement);

     dstImg = brightnessAndContrast(src, document.getElementById('brightnessTrackbar').value * 1.0, document.getElementById('contrastTrackBar').value * 1.0);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}

function cartoonEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     var src = cv.imread(imgElement);

     dstImg = cartoonFilter(src);
     cv.imshow('canvasOutput', dstImg);

     src.delete();
}