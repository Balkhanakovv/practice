var srcImg = null;
var dstImg = null;

let imgElement = document.getElementById('canvasInput');
let inputElement = document.getElementById('fileInput');
let applyButton = document.getElementById('ApplyButton');
let saveButton = document.getElementById('SaveButton');
let canvasOutput = document.getElementById('canvasOutput');

document.getElementById('cannyControls').style.visibility = "hidden";
document.getElementById('blurControl').style.visibility = "hidden";
document.getElementById('bcControls').style.visibility = "hidden";


/*
-----------------------------------------------------------------------------
|                        Buttons events                                     |
-----------------------------------------------------------------------------
*/

inputElement.addEventListener('change', (e) => {
     srcImg = URL.createObjectURL(e.target.files[0]);
     
     imgElement.src = srcImg;

     dstImg = new cv.Mat();

     for (var i = 1; i < 7; i++) {
          document.getElementById(`radio-${i}`).checked = false;
     }

     var context = canvasOutput.getContext('2d');
     context.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
}, false);

applyButton.addEventListener('click', (e) => {
     if (dstImg != null) {
          var tmpImgURL = canvasOutput.toDataURL();

          imgElement.src = tmpImgURL;
          srcImg = tmpImgURL;
     }
});

saveButton.addEventListener('click', (e) => {
     if (dstImg != null) {
          var tmpImgURL = canvasOutput.toDataURL();

          var newTab = window.open('about:blank','image from canvas');
          newTab.document.write("<img src='" + tmpImgURL + "' alt='from canvas'/>"); 
     }
});



/*
-----------------------------------------------------------------------------
|                        Filters events                                     |
-----------------------------------------------------------------------------
*/

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