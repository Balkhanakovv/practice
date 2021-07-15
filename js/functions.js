function doubleRound (number) {
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

function blur(src, size = 3) {
     let dst = new cv.Mat();

     if (size % 2 != 1)
          size = size + 1;

     cv.GaussianBlur(src, dst, new cv.Size(size, size), 0, 0, cv.BORDER_DEFAULT);
     return dst;
}

function sepiaFilter(src) {
     let dst = src.clone();

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {
               dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[2] * (393 / 1000) + dst.ucharPtr(j, i)[1] * (769 / 1000) + dst.ucharPtr(j, i)[0] * (189 / 1000));
               dst.ucharPtr(j, i)[1] = doubleRound(dst.ucharPtr(j, i)[2] * (349 / 1000) + dst.ucharPtr(j, i)[1] * (686 / 1000) + dst.ucharPtr(j, i)[0] * (168 / 1000));
               dst.ucharPtr(j, i)[2] = doubleRound(dst.ucharPtr(j, i)[2] * (272 / 1000) + dst.ucharPtr(j, i)[1] * (534 / 1000) + dst.ucharPtr(j, i)[0] * (131 / 1000));
          }

     return dst;
}

function brightnessAndContrast(src, brightness, contrast) {
     let dst = src.clone();

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {
               dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[0] * contrast * 0.1 + brightness);
               dst.ucharPtr(j, i)[1] = doubleRound(dst.ucharPtr(j, i)[1] * contrast * 0.1 + brightness);
               dst.ucharPtr(j, i)[2] = doubleRound(dst.ucharPtr(j, i)[2] * contrast * 0.1 + brightness);
          }

     return dst;
}

function cartoonFilter(src) {
     let dst = src.clone();
     let tmp = src.clone();

     cv.medianBlur(src, tmp, 3);
     cv.cvtColor(tmp, tmp, cv.COLOR_RGB2GRAY, 0);
     cv.adaptiveThreshold(tmp, tmp, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);

     for (var i = 0; i < tmp.cols; i++)
          for (var j = 0; j < tmp.rows; j++) {
               if (tmp.ucharPtr(j, i)[0] != 0)
                   tmp.ucharPtr(j, i)[0] = 255; 
          }

     for (var i = 0; i < src.cols; i++)
          for (var j = 0; j < src.rows; j++) {
               for (var ch = 0; ch < 3; ch++) {
                    var value = dst.ucharPtr(j, i)[ch];
                   
                    if (value <= 50)
                         value = 0;
                    else if (value <= 100)
                         value = 25;
                    else if (value <= 150)
                         value = 180;
                    else if (value <= 200)
                         value = 210;
                    else value = 250;

                    dst.ucharPtr(j, i)[ch] = value
               }

               if (tmp.ucharPtr(j, i)[0] == 0) {
                    dst.ucharPtr(j, i)[0] = 0;
                    dst.ucharPtr(j, i)[1] = 0;
                    dst.ucharPtr(j, i)[2] = 0;
               } 
          }

     return dst;
}


function retroFilter(src, mask) {
     let dst = src.clone();
     //let dust = cv.imread(mask);

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {               
               dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[0] + 50);
          }
     
     //let tmp = cv.imread(mask);

     /*cv.cvtColor(tmp, tmp, cv.COLOR_RGB2GRAY, 0);

     for (var i = 0; i < tmp.cols; i++)
          for (var j = 0; j < tmp.rows; j++) {
               if (tmp.ucharPtr(j, i)[0] == 0) {
                    dst.ucharPtr(j, i)[0] = 0;
               } 
          }*/

     //cv.add(src, tmp, dst, new cv.Mat(), -1);

     return dst;
}

function sketchFilter(src) {
     let tmp = src.clone();
     let dst = new cv.Mat();

     cv.cvtColor(tmp, tmp, cv.COLOR_RGB2GRAY, 0);
     cv.Scharr(tmp, dst, cv.CV_8U, 0, 1, 1, 0, cv.BORDER_DEFAULT);

     for (var i = 0; i < dst.cols; i++)
          for (var j = 0; j < dst.rows; j++) {               
               dst.ucharPtr(j, i)[0] = Math.abs(dst.ucharPtr(j, i)[0] - 255);
          }

     return dst;
}