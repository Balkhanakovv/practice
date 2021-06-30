var srcImg = null;
var dstImg = null;

let imgElement = document.getElementById('imgInput');
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
     srcImg = URL.createObjectURL(e.target.files[0]);
     imgElement.src = srcImg;

     dstImg = new cv.Mat();
}, false);

imgElement.onload = function() {
     let src = cv.imread(imgElement);
     dstImg = cannyFilter(src);

     cv.imshow('canvasOutput', dstImg);

     src.delete();
};

function onOpenCvReady() {
     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}