import {SafeGuard} from '../../src/index.js'
//import ComputeMiddleware from './middlewares/ComputeMiddleware.js'

// Load Middleware class
const guard = new SafeGuard({debug: true})

const RandomizeMiddleware = new SafeGuard().set('randomizeMiddleware', async () => {
    return await new Promise((resolve, reject) => {
      // Place your functions
      const num = Math.floor(Math.random() * (+20 - +1)) + +1;
      // result MUST return either 1 or 0
      resolve ({
        payload: num,
        result: (num >= 10) ? 1 : 0
      })
    })
    
}, {
  description : 'This middleware produce a random number from 0 - 20 with a valid value of >= 10'
}) 



// Run sample middleware
let target = document.querySelector('#middleware-result')
guard.run([RandomizeMiddleware]).then(res => { console.log(res)
  // callback
  target.innerHTML = '<span style="color: green;">Middleware successfully executed and finished without error!</span>'
}).catch(e => {
  // failed
  target.innerHTML = 'Sorry! Your middleware failed!'
})