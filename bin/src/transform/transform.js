import { curves } from './curves.js';
import { getRotationDeg, setRotationDeg } from './helpers.js';

var difference = function (num1, num2){
  if (num1 > num2){
    return (num1-num2)*-1
  }
  else{
    return num2-num1
  }
};

var getLocal = {
  position: function(node){
    return node.getLocalPosition()
  },
  rotation: function(node){
    return node.getLocalRotation()
  },
  scale: function(node){
    return node.getLocalScale()
  },
};
var setLocal = {
  position: function(node, value){
    return node.setLocalPosition(value)
  },
  rotation: function(node, value){
    return node.setLocalRotation(value)
  },
  scale: function(node, value){
    return node.setLocalScale(value)
  },
};

let transformLogic = function(transformType, node, duration, end, curve, delay, direction){

    if(curve === undefined || curve === null ) {
      curve = 'linear';
    }
    if(delay === undefined || delay === null ) {
      delay = 0;
    }




    let transition = () => {

      let startTime = Date.now();
      let startData;

      if (transformType !== 'rotation'){
        startData = getLocal[transformType](node);
      } else if (transformType == 'rotation'){
        let rotationData = getLocal[transformType](node);
        startData = getRotationDeg(rotationData);
      }

      let startX = startData[0];
      let startY = startData[1];
      let startZ = startData[2];

      let distanceX;
      let distanceY;
      let distanceZ;


      // sets to ~60fps
      let interval = 16;

      let startValue;

      // if direction contains x
      // set the startValue to startX

      if(direction === 'x'){
        startValue = startX;
      } else if (direction === 'y'){
        startValue = startY;
      } else if (direction === 'z'){
        startValue = startZ;
      } else if (direction === 'xyz'){
        startValue = startData;
      }

      if(direction === 'xyz'){
        if(typeof end !== 'object') {
          // single number was given for transform
          distanceX = difference(startX, end);
          distanceY = difference(startY, end);
          distanceZ = difference(startZ, end);
        } else if(typeof end == 'object') {
          // transform each value
          distanceX = difference(startX, end[0]);
          distanceY = difference(startY, end[1]);
          distanceZ = difference(startZ, end[2]);
        }
      }


      let distance = difference(startValue, end);

      let intervalLoop = setInterval(() => {
        let timePassed = Date.now() - startTime;
        if (timePassed >= duration) {

          // makes sure it gets to the end, last interval may be slightly off from float and interval math
          if(direction === 'x'){
            setLocal[transformType](node,[end,startY,startZ]);
          } else if (direction === 'y'){
            setLocal[transformType](node,[startX,end,startZ]);
          } else if (direction === 'z') {
            setLocal[transformType](node,[startX,startY,end]);
          } else if (direction === 'xyz') {
            if(typeof end !== 'object'){
              setLocal[transformType](node,[end,end,end]);
            } else if (typeof end == 'object'){
              setLocal[transformType](node,[end[0],end[1],end[2]]);
            }
          }

          clearInterval(intervalLoop);
          return
        }

        let newValue;
        let newX;
        let newY;
        let newZ;

        for (var key in curves){
          if (key == curve) {
            if (direction === 'x' || direction === 'y' || direction === 'z'){
              newValue = curves[key](timePassed, startValue, distance, duration);
            } else if (direction === 'xyz'){
              newX = curves[key](timePassed, startX, distanceX, duration);
              newY = curves[key](timePassed, startY, distanceY, duration);
              newZ = curves[key](timePassed, startZ, distanceZ, duration);
            }

          }
        }

        let transformValue;

        if(direction === 'x'){
          transformValue = [newValue,startY,startZ];
        } else if (direction === 'y'){
          transformValue = [startX,newValue,startZ];
        } else if (direction === 'z') {
          transformValue = [startX,startY,newValue];
        } else if (direction === 'xyz'){
          transformValue = [newX, newY, newZ];
        }


        if(transformType !== 'rotation'){
          setLocal[transformType](node,transformValue);
        } else {
          let newRotation = setRotationDeg(transformValue[0],transformValue[1],transformValue[2]);
          setLocal[transformType](node,newRotation);
        }

      }, interval);
    };

    setTimeout(() => {
      transition();
    }, delay);

};

var transform = {

  translate: function(node, duration, end, curve, delay){
    transformLogic('position', node, duration, end, curve, delay, 'xyz');
  },
  translateX: function(node, duration, end, curve, delay){
    transformLogic('position', node, duration, end, curve, delay, 'x');
  },
  translateY: function(node, duration, end, curve, delay){
    transformLogic('position', node, duration, end, curve, delay, 'y');
  },
  translateZ: function(node, duration, end, curve, delay){
    transformLogic('position', node, duration, end, curve, delay, 'z');
  },
  scale: function(node, duration, end, curve, delay){
    transformLogic('scale', node, duration, end, curve, delay, 'xyz');
  },
  scaleX: function(node, duration, end, curve, delay){
    transformLogic('scale', node, duration, end, curve, delay, 'x');
  },
  scaleY: function(node, duration, end, curve, delay){
    transformLogic('scale', node, duration, end, curve, delay, 'y');
  },
  scaleZ: function(node, duration, end, curve, delay){
    transformLogic('scale', node, duration, end, curve, delay, 'z');
  },
  rotate: function(node, duration, end, curve, delay){
    transformLogic('rotation', node, duration, end, curve, delay, 'xyz');
  },

};

export { transform };
