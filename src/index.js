export class SafeGuard {
  constructor (options = {}) {
    if(!SafeGuard.instance) SafeGuard.instance = this
    this.__opt = options
    this.__SafeGuards = []
    this.__debug = (window && options.debug === true)

    // Inject to global scope
    // This will expose safeGUard to global scope
    if(this.__debug) window.$SafeGuard = SafeGuard.instance
    return SafeGuard.instance
  }

  log (action, message, state = {}) {
    // enable logging for debug mode
    if(!this.__debug || this.__opt.mode !== 'verbose') return
    console.log(`${action} : ${message}`)

    // return current state
    if(state.length) console.log(state)
    return this
  }

  __changeState (state = 0) {
    this.__SafeGuardState = state
    
    // copy elements
    if(!state) {
      this.__SafeGuardsOffStateStack = {...this.__SafeGuards}
      this.__SafeGuards = []
    } else {
      this.__SafeGuards = {...this.__SafeGuardsOffStateStack}
      this.__SafeGuardsOffStateStack = []
    }
    
    // logger
    this.log('State', `Guard state is ${state}`)

    return this
  }

  off () {
    return this.__changeState()
  }

  on () {
    return this.__changeState(1)
  }

  set (name, callback, options = {}) {
    if (!this.__SafeGuards[name]) this.__SafeGuards[name] = {
      name,
      callback,
      options
    }

    // logger
    this.log('Set', `${name} MiddleWare is ready`, this.__SafeGuards[name])

    return this
  }

  get (name) {
    return this.__SafeGuards[name] 
  }
  
  merge (SafeGuards = []) {
    return Promise.all(SafeGuards)
  }

  async run(names = []) { 
    let response = {}
    return new Promise(async (resolve, reject) => { 
      names.forEach(async (el, index) => {
        let callbackResult = this.__SafeGuards[el].callback()

        // logger
        if(callbackResult) this.log('Run', `${el} MiddleWare is running`, callbackResult)

        // PROMISE
        response[el] = callbackResult.then ? await callbackResult  : callbackResult 

        // ALL callbacks must passed otherwise SafeGuard will
        // return a rejected promise
        let isPassed = 1

        for(let x in response) { 
          isPassed = isPassed / response[x]
          if((!isPassed) || isPassed === Infinity) return reject() & this.log('Error', `${el} [DONE with errors]`, callbackResult)
          resolve(response)

          // logger
          this.log('Run', `${el} [DONE]`, callbackResult)
        }
      })
    })
  }
}
