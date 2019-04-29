import {SafeGuard} from '../../src/index.js'
import ComputeMiddleware from './middlewares/ComputeMiddleware.js'
import RandomizeMiddleware from './middlewares/RandomizeMiddleware.js'

// Load Middleware class
const guard = new  SafeGuard({debug: true, mode: 'verbose'})
const sampleMiddleware = new ComputeMiddleware ()
const randomizeMiddleware = new RandomizeMiddleware ()

// DOM
let target = document.querySelector('#middleware-result')

// Run sample middleware
guard.run(['computeMiddleware', 'randomizeMiddleware']).then(res => { console.log(res)
  // callback
  target.innerHTML = '<span style="color: green;">[This was run after your middleware]</span>'
}).catch(e => {
  // failed
  target.innerHTML = 'Sorry! Your middleware failed!'
})