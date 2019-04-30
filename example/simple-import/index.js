import {SafeGuard} from '../../src/index.js'
import RandomizeMiddleware from './middlewares/RandomizeMiddleware.js'

// Load Middleware class
const guard = new SafeGuard({debug: true})


// Run sample middleware
let target = document.querySelector('#middleware-result')
guard.run([RandomizeMiddleware]).then(res => { 
  // callback
  target.innerHTML = '<span style="color: green;">Middleware successfully executed and finished without error!</span>'
  console.log(res)
}).catch(e => {
  // failed
  target.innerHTML = 'Sorry! Your middleware failed!'
})