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

     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";    
}, false);

applyButton.addEventListener('click', (e) => {
     if (dstImg != null) {
          var tmpImgURL = hiddenCanvasOutput.toDataURL();

          imgElement.src = tmpImgURL;
          imageHidden.src = tmpImgURL;
          srcImg = tmpImgURL;
     }
});

saveButton.addEventListener('click', (e) => {
     if (dstImg != null) {
          var tmpImgURL = hiddenCanvasOutput.toDataURL();

          var newTab = window.open('about:blank','image from canvas');
          newTab.document.write("<img src='" + tmpImgURL + "' alt='result'/>"); 
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

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = convertRGBToGray(srcFull);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function cannyEvent() {
     document.getElementById('cannyControls').style.visibility = "visible";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = cannyFilter(srcFull, document.getElementById('cannyTrackbarMin').value * 1.0, document.getElementById('cannyTrackbarMax').value * 1.0);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function blurEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "visible";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = blur(srcFull, document.getElementById('blurSize').value * 1.0);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function sepiaEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = sepiaFilter(srcFull);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);
     
     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function bcEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "visible";
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = brightnessAndContrast(srcFull, document.getElementById('brightnessTrackbar').value * 1.0, document.getElementById('contrastTrackBar').value * 1.0);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function cartoonEvent() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = cartoonFilter(srcFull);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}