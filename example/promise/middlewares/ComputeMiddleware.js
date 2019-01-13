/** 
 * Sample for creating simple custom middleware
*/

import { SafeGuard } from '../../../src/index.js'

export default class{
  constructor () {
    // set middleware's name to 'Auth'
    // .set('name', callback)
    // middleware name must be unique otherwise it will be override
    let description = 'This is a saple middleware description'
    return new SafeGuard().set('computeMiddleware', this.render, { description })
  }
  
  // For promise function, use async, await function
  async render () {
    
    // Your Promise function must be resolved to 1 or 0
    let isPromise = await new Promise((resolve, reject) => {
      resolve(1)
    })

    return isPromise
  }
}