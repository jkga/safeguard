# SafeGuard
Safeguard is a tiny javascript middleware for your web application that relies   
on the test suite case you defined. Its like running a BDD test in production.


## Rules
These are the things to keep in mind when creating a middleware
* A Middleware **MUST return** an Object containing payload and result
```js
  {
    payload: {},
    result: 1 // 1 or 0
  }
```
* result is either **1, 0 or an async Promise()**
* If a Middleware returns a **Promise** ,  it **MUST** still resolve with an object
* Middleware **name MUST be unique**


## Installation
### Using the library in es6   
```js
  import SafeGuard from 'safeguard'
```

### Basic Usage

Creating a simple middleware
```javascript
  // set (name, callback, options = {}) {
  // Register 'authMiddleware'
  const authMiddleware = new SafeGuard().set('authMiddleware', () => {
    // a middleware MUST ONLY RETURN 1 or 0
    // 0 = failed | 1 = passed
    return {
      payload: { 'access_token' : 'abc-123'},
      result: 1
    }
  }, {
     description : 'User must be authenticated first before doing any actions'
     // . . .
  })
```

Running a simple middleware

```javascript
  // Checks if user is authenticated
  guard.run([authMiddleware]).then(res => {
    // Do some function after your middleware
  }).catch(e => {
    // if your middleware returns 0
  })
```


Running a multiple middlewares

```javascript
  guard.run([authMiddleware, privilegeMiddleware]).then . . .
```


### Debugging
Use the debug option to log and track middleware current state
> const guard = new SafeGuard({ debug: true })   

Sample output

> Set : authMiddleware MiddleWare is ready   index.js:17    
Run : authMiddleware MiddleWare is running   index.js:17    
Run : authMiddleware [DONE]


### Inspect  
IF DEBUG is enabled , $SafeGuard will be injected in global scope and could be viewed using browser's console.

> $SafeGuard

If you want to inspect an specific middleware
>$SafeGuard.get('authMiddleware')

## SafeGuard functions
Class quick reference guide
>.set('middlewareName', function () { }, { options })

>.run([middlewares])

>.get('middlewareName')


**Async Middleware**   
If your middlewares are dynamically imported, you might encountered an undesirable results. To prevent side effects, please use `Promise.all()` or an internal wrapper    
>.merge([middlewares])
