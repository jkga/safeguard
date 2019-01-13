import {SafeGuard} from '../../src/index.js'
import ComputeMiddleware from './middlewares/ComputeMiddleware.js'

// Load Middleware class
const middleWare = new SafeGuard()
const sampleMiddleware = new ComputeMiddleware()

// DOM
let target = document.querySelector('#middleware-result')

// Run sample middleware

middleWare.run(['computeMiddleware']).then(res => {
  // Do some function after your middleware
  target.innerHTML = '<span style="color: green;">[middleware has been executed]</span>'
}).catch(e => {
  // if your middleware returns fail
  target.innerHTML = 'Sorry! Your middleware failed!'
})