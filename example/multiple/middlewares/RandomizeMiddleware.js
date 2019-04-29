/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default class{
  constructor () {
    // set middleware's name to 'computeMiddleware'
    // .set('name', callback)
    // middleware name must be unique otherwise it will be overriden
    return new SafeGuard().set('randomizeMiddleware', this.render)
  }

  // callback must only return 1 or 0
  render (resultFromPreviousMiddleware) { 

    // capture result from recent middleware
    console.log(`Result from previous middleware :`, resultFromPreviousMiddleware)

    // Place your functions
    const num = Math.floor(Math.random() * (+20 - +1)) + +1;

    // Must return 1 or 0
    return {
      payload: num,
      result: (num >= 10) ? 1 : 0
    }
  }
}