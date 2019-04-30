import {SafeGuard} from '../../src/index.js'
import ComputeMiddleware from './middlewares/ComputeMiddleware.js'
import RandomizeMiddleware from './middlewares/RandomizeMiddleware.js'

// Load Middleware class
const guard = new  SafeGuard({debug: true})

// DOM
let target = document.querySelector('#middleware-result')

// Run sample middleware
guard.run([ComputeMiddleware,  RandomizeMiddleware]).then(res => { 
  // callback
  target.innerHTML = '<span style="color: green;">Middlewares successfully executed and finished without error!</span>'
}).catch(e => {
  // failed
  target.innerHTML = 'Sorry! Your middleware failed!'
})