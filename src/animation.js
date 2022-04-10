const lerp = function(a,b,u) {
  return (1-u) * a + u * b;
  };
  
  const colorName = function() {
  var r = parseInt(lerp(start.r, end.r, u));
  var g = parseInt(lerp(start.g, end.g, u));
  var b = parseInt(lerp(start.b, end.b, u));
  return 'rgb('+r+','+g+','+b+')';
  }
  
  // fades between two colors.
  const fade = function(element, property, start, end, duration) {
  var interval = 10;
  var steps = duration/interval;
  var step_u = 1.0/steps;
  var u = 0.0;
  var theInterval = setInterval(function(){
  if (u >= 1.0){ clearInterval(theInterval) }
  var r = parseInt(lerp(start.r, end.r, u));
  var g = parseInt(lerp(start.g, end.g, u));
  var b = parseInt(lerp(start.b, end.b, u));
  var colorname = 'rgb('+r+','+g+','+b+')';
  el.style.setProperty(property, colorname);
  u += step_u;
  }, interval);
  };
  
  /**
   * https://gist.github.com/ryancat/9972419b2a78f329ce3aebb7f1a09152
   * Compare color difference in RGB
   * @param {Array} rgb1 First RGB color in array
   * @param {Array} rgb2 Second RGB color in array
   */
  const deltaRgb = function (rgb1, rgb2) {
  const [ r1, g1, b1 ] = rgb1,
          [ r2, g2, b2 ] = rgb2,
          drp2 = Math.pow(r1 - r2, 2),
          dgp2 = Math.pow(g1 - g2, 2),
          dbp2 = Math.pow(b1 - b2, 2),
          t = (r1 + r2) / 2
  
  return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + t * (drp2 - dbp2) / 256)
  }
  
  
  const consecutiveTarget = 4;
  const elPrevious = document.getElementById('previous');
  const elRandom = document.getElementById('next');
  let consecutiveColors = [];
  const el = document.getElementById('box'); // your element
  const property = 'background-color';       // fading property
  var seconds = 0;
  
  
  const condition = function(number) {
      return number >= consecutiveTarget;
  }
  
  const sameColor = function(color1, color2) {
      return color1 === color2
  }
  
  const randomNumber = function(limit) {
      return Math.floor(Math.random() * limit);
  }
  var fadeDuration = 5000;
  // return objet of random RGB values
  const randomRGBGenerator = function() {
      return {
          r: randomNumber(255),
          g: randomNumber(255),
          b: randomNumber(255)
      };
  }
  
  const randomDuration = function() 
  {
      var min = 1, max = 5;
      var number = Math.floor(Math.random() * (max - min + 1) + min);
      return number * 1000;
  }
  
  var timerStatus;
  var startBtn = document.getElementById("start")
  var stopBtn = document.getElementById("stop")
  
  startBtn.setAttribute("enabled", "enabled");
  stopBtn.setAttribute("disabled", "disabled");
  var sec = document.querySelector('.seconds')
  
  // $("#box").fadeOut();
  
  var box2 = document.querySelector("#box2")
  let randomRGBBox2 = randomRGBGenerator();
  
  box2.style.backgroundColor = 'rgb('+randomRGBBox2.r+','+randomRGBBox2.g+','+randomRGBBox2.b+')'
  
  // function deltaRgb22 (rgb1, rgb2) {
  //     console.log(rgb1 , rgb2)
  //     const [ r1, g1, b1 ] = rgb1,
  //           [ r2, g2, b2 ] = rgb2,
  //           drp2 = Math.pow(r1 - r2, 2),
  //           dgp2 = Math.pow(g1 - g2, 2),
  //           dbp2 = Math.pow(b1 - b2, 2),
  //           t = (r1 + r2) / 2
    
  //     return Math.sqrt(2 * drp2 + 4 * dgp2 + 3 * dbp2 + t * (drp2 - dbp2) / 256)
  //   }
  
  
    function getRGB(str){
      var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
      return match ? [
          parseInt(match[1]),
          parseInt(match[2]),
          parseInt(match[3])
       ] : {};
    }
  
  
  
  function rgb2lab(rgb){
      var r = rgb[0] / 255,
          g = rgb[1] / 255,
          b = rgb[2] / 255,
          x, y, z;
    
      r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      
        x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
        y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
        z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
      
        x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
        y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
        z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
      
        return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
      }
    
    
    
    function deltaE(labA, labB){
        var deltaL = labA[0] - labB[0];
        var deltaA = labA[1] - labB[1];
        var deltaB = labA[2] - labB[2];
        var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
        var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
        var deltaC = c1 - c2;
        var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        var sc = 1.0 + 0.045 * c1;
        var sh = 1.0 + 0.015 * c1;
        var deltaLKlsl = deltaL / (1.0);
        var deltaCkcsc = deltaC / (sc);
        var deltaHkhsh = deltaH / (sh);
        var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
        return i < 0 ? 0 : Math.sqrt(i);
      }
    
    startTimer = function()
    {
        // get random number
        let randomRGB = randomRGBGenerator();
        let colorName = 'rgb('+randomRGB.r+','+randomRGB.g+','+randomRGB.b+')';
    
        el.style.setProperty(property, colorName);
    
    
        var colorname2 =  $("#box2").css( "background-color" );
    
        var rangecolor =  deltaE(rgb2lab(getRGB(colorName)) , rgb2lab(getRGB(colorname2)));
        fadeDuration = randomDuration();
        seconds +=  fadeDuration / 1000;
        
        if (rangecolor >= 0 && rangecolor <= 10){
            $(".message").text(`Congratulations! ${seconds} seconds. Colour match 
            within range qualifying for Proof of Magician status.`)
            stopTimer()
            $("#box").fadeIn();
            return false
        }
    
        // - [ ] this is where the color should fade to white.
        // set to white after 2500ms
        setTimeout(function() {
            el.style.setProperty(property, 'rgb(255, 255, 255);');
        }, 2500)
    
        if (sameColor(consecutiveColors[0], randomRGB)) {
            consecutiveColors.push(randomRGB);
        } else {
            consecutiveColors = [randomRGB];
        }
        
        if (consecutiveColors.length >= 3) {
            // console.log('Consciousness confirmed!');
        }

        // sec.innerText = seconds + ' seconds'
    
        $("#box").fadeIn(fadeDuration / 2);
        $("#box").fadeOut(fadeDuration / 2);
    
        // console.log('consecutiveColors.length: '+consecutiveColors.length);
        // document.getElementById('boxText').innerHTML = seconds + ' seconds';
    
        // console.log('random duration: ', fadeDuration);
        // console.log('seconds: ', seconds);
    
        timerStatus = setTimeout(startTimer, fadeDuration)        
    }
    
    stopTimer = function()
    {   
        startBtn.removeAttribute("disabled");
        stopBtn.removeAttribute("enabled");
        stopBtn.setAttribute("disabled", "disabled");
        startBtn.setAttribute("enabled", "enabled");
        clearInterval(timerStatus)        
    }
    
    startBtn.addEventListener("click", function() {
        startTimer()
        stopBtn.removeAttribute("disabled");
        startBtn.removeAttribute("enabled");
        startBtn.setAttribute("disabled", "disabled");
        stopBtn.setAttribute("enabled", "enabled");
    
    
    });
    
    stopBtn.addEventListener("click", stopTimer);