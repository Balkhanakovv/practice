let srcImg = null;
let dstImg = null;
let Img = null;
let dust = null;

let imgElement = document.getElementById('canvasInput');
let inputElement = document.getElementById('fileInput');
let applyButton = document.getElementById('ApplyButton');
let saveButton = document.getElementById('SaveButton');
let canvasOutput = document.getElementById('canvasOutput');
let imageHidden = document.getElementById('imageHidden');
let canvasHidden = document.getElementById('hiddenCanvasOutput');
let dustMask = document.getElementById('dustMask');

let faceCascade = null;

hideControls();


/*
-----------------------------------------------------------------------------
|                        Service functions                                  |
-----------------------------------------------------------------------------
*/

function onOpenCvReady() {
     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}

function hideControls() {
     document.getElementById('cannyControls').style.visibility = "hidden";
     document.getElementById('blurControl').style.visibility = "hidden";
     document.getElementById('bcControls').style.visibility = "hidden";
     document.getElementById('sketchTrackbarValue').style.visibility = "hidden";   
}

function filterOperation(func, ...temps) {
     hideControls();
     if (srcImg == null) return;

     let srcFull = cv.imread(imageHidden);
     let tmp = new cv.Mat();

     Img = func(srcFull, temps[0], temps[1]);
     cv.resize(Img, tmp, new cv.Size(imgElement.width, imgElement.height), 0, 0, cv.INTER_AREA);

     cv.imshow('hiddenCanvasOutput', Img);
     cv.imshow('canvasOutput', tmp);

     srcFull.delete();
}

function getCurrentDate() {
     let date = new Date();
     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0');
     var yyyy = date.getFullYear();

     return mm + '.' + dd + '.' + yyyy;
}

function addDateOnImage(obj) {
     var context = obj.getContext("2d");

     context.fillStyle = "#FC4C2D";
     context.strokeStyle = 'black';
     context.font = `${obj.width / 15}px digital`; 
     context.fillText(`${getCurrentDate()}`, obj.width - (obj.width / 3.5), obj.height - (obj.height * 0.03));
     context.strokeText(`${getCurrentDate()}`, obj.width - (obj.width / 3.5), obj.height - (obj.height * 0.03));

     context.fill();
     context.stroke();
}


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

     for (var i = 1; i < 12; i++) {
          document.getElementById(`radio-${i}`).checked = false;
     }

     var context = canvasOutput.getContext('2d');
     context.clearRect(0, 0, canvasOutput.width, canvasOutput.height);

     hideControls();

     dustMask.src = 'img/dust.jpg';

     faceCascade = new cv.CascadeClassifier();

     let request = new XMLHttpRequest();
     request.open('GET', 'haarcascade_frontalface_default.xml', true);
     request.responseType = 'arraybuffer';
     request.onload = function(ev) {
          if (request.readyState === 4) {
               if (request.status === 200) {
                    let data = new Uint8Array(request.response);
                    cv.FS_createDataFile('/', 'haarcascade_frontalface_default.xml', data, true, false, false);
                    faceCascade.load('haarcascade_frontalface_default.xml');
               } else {
                    self.printError('Failed to load ' + 'haarcascade_frontalface_default.xml' + ' status: ' + request.status);
               }
          }
     };
     request.send();
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

function bwEvent() {
     filterOperation(convertRGBToGray);
}

function cannyEvent() {
     filterOperation(cannyFilter, document.getElementById('cannyTrackbarMin').value * 1.0, document.getElementById('cannyTrackbarMax').value * 1.0);
     document.getElementById('cannyControls').style.visibility = "visible";
}

function blurEvent() {
     filterOperation(blur, document.getElementById('blurSize').value * 1.0);
     document.getElementById('blurControl').style.visibility = "visible";
}

function sepiaEvent() {
     filterOperation(sepiaFilter);
}

function bcEvent() {
     filterOperation(brightnessAndContrast, document.getElementById('brightnessTrackbar').value * 1.0, document.getElementById('contrastTrackBar').value * 1.0);
     document.getElementById('bcControls').style.visibility = "visible";
}

function cartoonEvent() {
     filterOperation(cartoonFilter);
}

function retroEvent() {
     filterOperation(retroFilter, dustMask);
}

function sketchEvent() {
     filterOperation(sketchFilter, document.getElementById('sketchTrackbarValue').value * 1.0);
     document.getElementById('sketchTrackbarValue').style.visibility = "visible";
}

function dateEvent() {
     addDateOnImage(canvasOutput);
     addDateOnImage(canvasHidden);
}

function invertEvent() {
     filterOperation(invertionBW);
}

function portraitEvent() {
     filterOperation(portraitFilter, faceCascade);
}
