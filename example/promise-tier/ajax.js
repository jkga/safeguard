export default class{
  constructor () {
    
  }
  
  getAlphabet () {
    return fetch('./alphabet.json').then(res => res.json())
  }
}