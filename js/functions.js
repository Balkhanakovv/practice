function doubleRound (number) {
     if (number < 0)
          number = 0.0;

     if (number > 255)
          number = 255.0;

     return number;
}

function convertRGBToGray(src) {
     let dst = new cv.Mat();
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

     for (let i = 0; i < dst.cols; i++)
          for (let j = 0; j < dst.rows; j++) {
               dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[2] * (393 / 1000) + dst.ucharPtr(j, i)[1] * (769 / 1000) + dst.ucharPtr(j, i)[0] * (189 / 1000));
               dst.ucharPtr(j, i)[1] = doubleRound(dst.ucharPtr(j, i)[2] * (349 / 1000) + dst.ucharPtr(j, i)[1] * (686 / 1000) + dst.ucharPtr(j, i)[0] * (168 / 1000));
               dst.ucharPtr(j, i)[2] = doubleRound(dst.ucharPtr(j, i)[2] * (272 / 1000) + dst.ucharPtr(j, i)[1] * (534 / 1000) + dst.ucharPtr(j, i)[0] * (131 / 1000));
          }

     return dst;
}

function brightnessAndContrast(src, brightness, contrast) {
     let dst = src.clone();

     for (let i = 0; i < dst.cols; i++)
          for (let j = 0; j < dst.rows; j++) {
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

     for (let i = 0; i < tmp.cols; i++)
          for (let j = 0; j < tmp.rows; j++) {
               if (tmp.ucharPtr(j, i)[0] != 0)
                   tmp.ucharPtr(j, i)[0] = 255; 
          }

     for (let i = 0; i < src.cols; i++)
          for (let j = 0; j < src.rows; j++) {
               for (let ch = 0; ch < 3; ch++) {
                    let value = dst.ucharPtr(j, i)[ch];
                   
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

     for (let i = 0; i < dst.cols; i++)
          for (let j = 0; j < dst.rows; j++) {           
               dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[0] + 50);
          }

     mask = cv.imread(mask);
     cv.resize(mask, mask, new cv.Size(src.cols, src.rows), 0, 0, cv.INTER_AREA);
     cv.cvtColor(mask, mask, cv.COLOR_RGB2GRAY, 0);

     for (let i = 0; i < mask.cols; i++)
          for (let j = 0; j < mask.rows; j++) {
               if (mask.ucharPtr(j, i)[0] < 150) {
                    dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[0] + Math.random() * (100 - 10) + 10);
                    dst.ucharPtr(j, i)[1] = doubleRound(dst.ucharPtr(j, i)[1] + Math.random() * (100 - 10) + 10);
                    dst.ucharPtr(j, i)[2] = doubleRound(dst.ucharPtr(j, i)[2] + Math.random() * (100 - 10) + 10);
               }
          }

     return dst;
}

function sketchFilter(src, value) {
     let tmp = src.clone();
     let dst = new cv.Mat();

     cv.cvtColor(tmp, tmp, cv.COLOR_RGB2GRAY, 0);
     cv.Sobel(tmp, dst, cv.CV_8U, 1, 1, 3, 1, 0, cv.BORDER_DEFAULT);

     for (let i = 0; i < dst.cols; i++)
          for (let j = 0; j < dst.rows; j++) {               
               dst.ucharPtr(j, i)[0] = Math.abs(dst.ucharPtr(j, i)[0] - 255);

               if (dst.ucharPtr(j, i)[0] < value){
                    dst.ucharPtr(j, i)[0] = Math.random() * (3 - 0) + 0;
               }
               else {
                    dst.ucharPtr(j, i)[0] = 255; 
               }
          }

     return dst;
}

function invertionBW(src) {
     let dst = new cv.Mat();

     cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY, 0);

     for (let i = 0; i < dst.cols; i++)
          for (let j = 0; j < dst.rows; j++) {               
               dst.ucharPtr(j, i)[0] = Math.abs(dst.ucharPtr(j, i)[0] - 255);

               if (dst.ucharPtr(j, i)[0] == 0)
                    dst.ucharPtr(j, i)[0] = doubleRound(dst.ucharPtr(j, i)[0] + Math.random() * (50 - 0) + 0);
          }

     return dst;  
}

function portraitFilter(src, faceCascade) {
     let gray = new cv.Mat();
     let faces = new cv.RectVector();
     let msize = new cv.Size(0, 0);

     cv.cvtColor(src, gray, cv.COLOR_RGB2GRAY, 0);
     faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
     if (faces.size() == 0) {
          alert('Can\'t find face =(');
          return src;
     }

     let dst = blur(src, 7);

     let faceCenter = new cv.Point(
          Math.round((faces.get(0).x + faces.get(0).x + faces.get(0).width) / 2), 
          Math.round((faces.get(0).y + faces.get(0).y + faces.get(0).height) / 2)
     );

     for (let i = faces.get(0).x; i < faces.get(0).x + faces.get(0).width; i++)
          for (let j = faces.get(0).y; j < faces.get(0).y + faces.get(0).height; j++) {
               dst.ucharPtr(j, i)[0] = src.ucharPtr(j, i)[0];
               dst.ucharPtr(j, i)[1] = src.ucharPtr(j, i)[1];
               dst.ucharPtr(j, i)[2] = src.ucharPtr(j, i)[2];              
          }

     return dst;
}