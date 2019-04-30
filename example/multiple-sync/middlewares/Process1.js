/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default () => {
  // set middleware's name to 'randomizeMiddlewar'
  // .set('name', callback)
  // middleware name must be unique otherwise it will be ignored
  return new SafeGuard().set('process1', () => {
    // Place your functions
    const num = 1
    // result MUST return either 1 or 0
    return {
      payload: num,
      result: 1
    }
  }, {
    description : 'This middleware produce a constant 1'
  }) 
}