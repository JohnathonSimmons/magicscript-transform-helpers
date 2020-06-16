import { _Math } from './libs/Math.js';
import { Quaternion } from './libs/Quaternion.js';
import { Euler } from './libs/Euler.js';

var setRotationDeg = function (x,y,z){
  let radians = [_Math.degToRad(x), _Math.degToRad(y), _Math.degToRad(z)];

  let euler = new Euler( radians[0], radians[1], radians[2], 'XYZ' );
  let quaternion = new Quaternion().setFromEuler(euler).toArray();

  return quaternion
};


var getRotationDeg = function ( quaternion ) {

  console.log('given q: ' + quaternion);

  let quat = new Quaternion().fromArray(quaternion);

  //console.log('x: ' + quat.x, 'y: ' + quat.y, 'z: ' + quat.z, 'w: ' + quat.w)

  let euler = new Euler().setFromQuaternion(quat);

  let eulerArray =  euler.toArray();

  let x = eulerArray[0];
  let y = eulerArray[1];
  let z = eulerArray[2];

  let degrees = [_Math.radToDeg(x), _Math.radToDeg(y), _Math.radToDeg(z), ];

  console.log(degrees);

  return degrees

};

export { getRotationDeg, setRotationDeg };
