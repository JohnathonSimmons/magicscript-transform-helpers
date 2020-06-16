import { curves } from './curves.js';

//
// transform = {
//   translate = {
//     x, y, z,
//   },
//   scale = {
//     x, y, z
//   },
//   rotation = {
//     x, y, z
//   }
//   color/alpha = {
//     r,g,b,a
//   }
// }
//
// var animationParams = node, duration, endingValue, curve
//
// transform.translate(animationParams) // ending takes an array, what should curve be here?
// transform.translateX(animationParams) // ending takes a number
// transform.transloateY(animationParams)
// transform.translateZ(animationParams)
//
// transform.scale(animationParams)
// transform.scaleX(animationParams)
// transform.scaleY(animationParams)
// transform.scaleZ(animationParams)
//
// transform.rotation(animationParams)
// transform.rotationX()
// transform.rotationY()
// transform.rotationZ()
//
// transform.color(animationParams) // ending takes an rgba
// transform.colorR(animationParams) //
// transform.colorG()
// transform.colorB()
// transform.colorA()

var difference = function (num1, num2){
  if (num1 > num2){
    return (num1-num2)*-1
  }
  else{
    return num2-num1
  }
};

let translate = function(node, duration, end, curve, delay, direction){


    if(delay === undefined || delay === null ) {
      delay = 0;
    }

    let transition = () => {

      let startTime = Date.now();
      let startPosition = node.getLocalPosition();

      let startX = startPosition[0];
      let startY = startPosition[1];
      let startZ = startPosition[2];
      // sets to ~60fps
      let interval = 16;

      let startCoordinate;

      if(direction === 'x'){
        startCoordinate = startX;
      } else if (direction === 'y'){
        console.log('direction', direction);
        startCoordinate = startY;
      } else if (direction === 'z'){
        startCoordinate = startZ;
      }

      let distance = difference(startCoordinate, end);

      let intervalLoop = setInterval(() => {
        let timePassed = Date.now() - startTime;
        if (timePassed >= duration) {

          // makes sure it gets to the end, last interval will be slightly off from float and interval math
          //node.setLocalPosition([end,startY,startZ])
          if(direction === 'x'){
            node.setLocalPosition([end,startY,startZ]);
          } else if (direction === 'y'){
            node.setLocalPosition([startX,end,startZ]);
          } else if (direction === 'z') {
            node.setLocalPosition([startX,startY,end]);
          }

          clearInterval(intervalLoop);
          return
        }

        let newCoordinate;

        for (var key in curves){
          if (key == curve) {
            newCoordinate = curves[key](timePassed, startCoordinate, distance, duration);
          }
        }

        let transformValue;

        if(direction === 'x'){
          transformValue = [newCoordinate,startY,startZ];
        } else if (direction === 'y'){
          transformValueß = [startX,newCoordinate,startZ];
          console.log(transformValue);
        } else if (direction === 'z') {
          transformValue = [startX,startY,newCoordinate];
        }

        node.setLocalPosition(transformValue);

      }, interval);
    };

    setTimeout(() => {
      transition();
    }, delay);

};

var transforms = {
  translateX: function(node, duration, end, curve, delay){
    translate(node, duration, end, curve, delay, 'x');},
  translateY: function(node, duration, end, curve, delay){
    translate(node, duration, end, curve, delay, 'y');},
  translateZ: function(node, duration, end, curve, delay){
    translate(node, duration, end, curve, delay, 'z');},
};

export { transforms };
