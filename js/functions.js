function convertRGBToGray(src) {
     var dst = new cv.Mat();
     cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY, 0);
     return dst;
}

function cannyFilter(src, thresgoldMin = 50, thresholdMax = 100, apertureSize = 3, L2gradient = false) {
     let dst = new cv.Mat();
     cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
     cv.Canny(src, dst, thresgoldMin, thresholdMax, apertureSize, L2gradient);
     return dst;
}

function sepia(src) {
    
}

