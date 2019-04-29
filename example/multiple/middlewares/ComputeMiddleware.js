/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default class{
  constructor () {
    // set middleware's name to 'computeMiddleware'
    // .set('name', callback)
    // middleware name must be unique otherwise it will be overriden
    return new SafeGuard().set('computeMiddleware', this.render)
  }

  // callback must return Object with payload and result
  // result MUST ONLY have a value of 1 or 0
  render () { 
    // Place your functions
    const sampleComputation = (5 * 2)
    // Must return 1 or 0
    return {
      payload: sampleComputation,
      result: (sampleComputation >= 10) ? 1 : 0
    }
  }
}