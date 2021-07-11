let srcImg = null;
let dstImg = null;
let Img = null;

let imgElement = document.getElementById('canvasInput');
let inputElement = document.getElementById('fileInput');
let applyButton = document.getElementById('ApplyButton');
let saveButton = document.getElementById('SaveButton');
let canvasOutput = document.getElementById('canvasOutput');
let imageHidden = document.getElementById('imageHidden');
let canvasHidden = document.getElementById('hiddenCanvasOutput');

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
     imageHidden.src = srcImg;

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
          var tmpImgURL = hiddenCanvasOutput.toDataURL();

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
     let srcFull = cv.imread(imageHidden);

     dstImg = convertRGBToGray(src);
     Img = convertRGBToGray(srcFull);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}

function cannyEvent() {
     document.getElementById('cannyControls').style.visibility = "visible";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);
     let srcFull = cv.imread(imageHidden);

     dstImg = cannyFilter(src, document.getElementById('cannyTrackbarMin').value * 1.0, document.getElementById('cannyTrackbarMax').value * 1.0);
     Img = cannyFilter(srcFull, document.getElementById('cannyTrackbarMin').value * 1.0, document.getElementById('cannyTrackbarMax').value * 1.0);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}

function blurEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "visible";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);
     let srcFull = cv.imread(imageHidden);

     dstImg = blur(src, document.getElementById('blurSize').value * 1.0);
     Img = blur(srcFull, document.getElementById('blurSize').value * 1.0);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}

function sepiaEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);
     let srcFull = cv.imread(imageHidden);
     
     dstImg = sepiaFilter(src);
     Img = sepiaFilter(srcFull);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}

function bcEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "visible";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);
     let srcFull = cv.imread(imageHidden);

     dstImg = brightnessAndContrast(src, document.getElementById('brightnessTrackbar').value * 1.0, document.getElementById('contrastTrackBar').value * 1.0);
     Img = brightnessAndContrast(srcFull, document.getElementById('brightnessTrackbar').value * 1.0, document.getElementById('contrastTrackBar').value * 1.0);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}

function cartoonEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let src = cv.imread(imgElement);
     let srcFull = cv.imread(imageHidden);

     dstImg = cartoonFilter(src);
     Img = cartoonFilter(srcFull);
     cv.imshow('canvasOutput', dstImg);
     cv.imshow('hiddenCanvasOutput', Img);

     src.delete();
     srcFull.delete();
}