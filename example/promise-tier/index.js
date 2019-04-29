import {SafeGuard} from '../../src/index.js'
import ComputeMiddleware from './middlewares/ComputeMiddleware.js'

// Load Middleware class
const guard = new SafeGuard({debug: true, mode: 'verbose'})

// mimic importing modules in async way
// if you use module's dynamic loading
let myMiddleware = new Promise((resolve, reject) => {
  // returns middleware async
  resolve(new ComputeMiddleware())
})


/* IMPORTANT
* running the .run() will throw an error since middlewares defined on the module 'myMiddleware' has
* not yet been initialized. For this case, use .merge()
* guard.merge(['computeMiddleware'])
*/

// your function returning a promise
guard.merge([myMiddleware]).then(() => {
  
  // DOM
  let target = document.querySelector('#middleware-result')

  // Run sample middleware
  guard.run(['computeMiddleware']).then(res => { 
    // Do some function after your middleware
    target.innerHTML = '<span style="color: green;">[middleware has been executed]</span>'

  }).catch(e => {

    // if one of your middlewares fail
    target.innerHTML = 'Sorry! Your middleware failed!'

  })
})

/* IMPORTANT
* these works, however loading multiple middlewares in .merge() is much better which runs Promise.all() internally
  myMiddleware.then(() => {
    middleware2. then(() => {
      . . .
    })
  })
*/



