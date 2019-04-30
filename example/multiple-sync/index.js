import {SafeGuard} from '../../src/index.js'
import Process1 from './middlewares/Process1.js'
import Process2 from './middlewares/Process2.js'
import Process3 from './middlewares/Process3.js'

// Load Middleware class
const guard = new SafeGuard({debug: true})


// Run sample middleware
let target = document.querySelector('#middleware-result')
guard.run([Process1, Process2, Process3]).then(res => { 
  // callback
  target.innerHTML = '<span style="color: green;">Middleware successfully executed and finished without error!</span>'
  console.log(`FINAL RESULT : `,res)
}).catch(e => {
  // failed
  target.innerHTML = 'Sorry! Your middleware failed!'
})