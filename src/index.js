export class SafeGuard {
  constructor (options = {}) {
    if (!SafeGuard.instance) SafeGuard.instance = this
    this.__opt = options
    this.__SafeGuards = []
    this.__debug = (window && options.debug === true)
    this.__current = ''

    // Inject to global scope
    // This will expose safeGuard to global scope
    if (this.__debug) window.$SafeGuard = SafeGuard.instance
    return SafeGuard.instance
  }

  log (action, message, state = {}) {
    // enable logging for debug mode
    if (!this.__debug) return
    console.log(`${action} : ${message}`, state)
    return this
  }

  set (name, callback, options = {}) {
    // prevent overriding middleware that is already defined
    if (this.__SafeGuards[name]) throw new Error('Middleware name is already defined. Please set a a new unique value')
    this.__SafeGuards[name] = {
      name,
      callback,
      options
    }

    // logger
    this.log('Set', `${name} MiddleWare is ready`, this.__SafeGuards[name])

    // set active
    this.__current = name
    return this
  }

  get (name) {
    return this.__SafeGuards[name]
  }

  merge (SafeGuards = []) {
    return Promise.all(SafeGuards)
  }

  async run (names = []) {
    
    let recentResult = {}
    return new Promise(async (resolve, reject) => {
      names.forEach(async (Mware, index) => {
        let response = {}
        let callbackResult = {}
        let isPassed = 1
        
        // if param type is a class, create an instance
        // to register the middleware in global scope
        // then get the current active name of the middleware
        if (typeof Mware === 'function') {
          // test if function could be invoked without new
          Mware = /^\s*class/.test(Mware.toString()) ? new Mware() : Mware()
          Mware = this.__current
        }

        // if parameter returns a new instance of itself
        // get the name of middleware that is currently running
        // middleware = new SafeGuard()
        if (Mware instanceof SafeGuard) Mware = this.__current

        callbackResult = this.__SafeGuards[Mware].callback(recentResult)

        // logger
        if (callbackResult) this.log('Run', `${Mware} MiddleWare is running`, callbackResult)

        // PROMISE
        response[Mware] = callbackResult.then ? await callbackResult : callbackResult
        recentResult = response[Mware]

        

        // All callbacks must return 1 otherwise SafeGuard will
        // return a rejected promise
        isPassed = 1
        for (let x in response) {
          isPassed = isPassed / response[x].result
          console.log(response[x])
          if ((!isPassed) || isPassed === Infinity) return (reject(callbackResult) & this.log('Error', `${Mware} [!!!ERROR!!!]`, callbackResult))
          if ((!isPassed) || isPassed === Infinity) break
          // logger
          this.log('Run', `${Mware} [DONE]`, callbackResult)
        } 
        resolve(recentResult)
      })
     
    })
  }
}

// inject to global scope for <script>
if (window) window.SafeGuard = SafeGuard
