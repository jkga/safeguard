/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default class{
  constructor () {
    // set middleware's name to 'Auth'
    // .set('name', callback)
    // middleware name must be unique otherwise it will be override
    return new SafeGuard().set('computeMiddleware', this.render)
  }

  // callback must only return 1 or 0
  render () {
    // Place your functions
    const sampleComputation = (5 * 2)
    // Must return 1 or 0
    return sampleComputation >= 10 ? 1 : 0
  }
}