import {SafeGuard} from '../../src/index.js'
import ComputeMiddleware from './middlewares/ComputeMiddleware.js'

// Load Middleware class
const guard = new SafeGuard()
const sampleMiddleware = new ComputeMiddleware()

// DOM
let target = document.querySelector('#middleware-result')

// Run sample middleware
guard.run(['computeMiddleware']).then(res => {
  // Do some function after your middleware
  target.innerHTML = '<span style="color: green;">[This was run after your middleware]</span>'
}).catch(e => {
  // if your middleware returns fail
  target.innerHTML = 'Sorry! Your middleware failed!'
})