function doubleRound (number)
{
     if (number < 0)
          number = 0.0;

     if (number > 255)
          number = 255.0;

     return number;
}

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

function blur(src, blurSize = 5) {
     let dst = new cv.Mat();
     cv.medianBlur(src, dst, blurSize);
     return dst;
}

function sepiaFilter(src) {
     let dst = src.clone();

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {
               dst.ucharPtr(i, j)[2] = doubleRound(dst.ucharPtr(i, j)[2] * (393 / 1000) + dst.ucharPtr(i, j)[1] * (769 / 1000) + dst.ucharPtr(i, j)[0] * (189 / 1000));
               dst.ucharPtr(i, j)[1] = doubleRound(dst.ucharPtr(i, j)[2] * (349 / 1000) + dst.ucharPtr(i, j)[1] * (686 / 1000) + dst.ucharPtr(i, j)[0] * (168 / 1000));
               dst.ucharPtr(i, j)[0] = doubleRound(dst.ucharPtr(i, j)[2] * (272 / 1000) + dst.ucharPtr(i, j)[1] * (534 / 1000) + dst.ucharPtr(i, j)[0] * (131 / 1000));
          }

     return dst;
}

function brightnessAndContrast (src, brightness, contrast) {
     let dst = src.clone();

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {
               dst.ucharPtr(i, j)[0] = doubleRound(dst.ucharPtr(i, j)[0] * contrast * 0.1 + brightness);
               dst.ucharPtr(i, j)[1] = doubleRound(dst.ucharPtr(i, j)[1] * contrast * 0.1 + brightness);
               dst.ucharPtr(i, j)[2] = doubleRound(dst.ucharPtr(i, j)[2] * contrast * 0.1 + brightness);
          }

     return dst;
}

