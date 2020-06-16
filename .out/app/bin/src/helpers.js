import { _Math } from './libs/Math.js';
import { Quaternion } from './libs/Quaternion.js';
import { Euler } from './libs/Euler.js';

var setRotationDeg = function (x,y,z){
  let radians = [_Math.degToRad(x), _Math.degToRad(y), _Math.degToRad(z)];

  let euler = new Euler( radians[0], radians[1], radians[2], 'XYZ' );
  let quaternion = new Quaternion().setFromEuler(euler).toArray();

  return quaternion
};

export { setRotationDeg };
