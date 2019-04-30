/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default () => {
  // set middleware's name to 'randomizeMiddlewar'
  // .set('name', callback)
  // middleware name must be unique otherwise it will be ignored
  return new SafeGuard().set('randomizeMiddleware', () => {
    // Place your functions
    const num = Math.floor(Math.random() * (+20 - +1)) + +1;
    // result MUST return either 1 or 0
    return {
      payload: num,
      result: (num >= 10) ? 1 : 0
    }
  }, {
    description : 'This middleware produce a random number from 0 - 20 with a valid value of >= 10'
  }) 
}