'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

class $Promise {
 constructor(executor) {
  // `this` here refers to this constructor function
  if(typeof(executor) === 'function') executor(this._internalResolve,
    this._internalReject);
  this._state = 'pending';
  this._value;
 };
 
 _internalResolve(value) {
  if(this._state === 'pending') {
    this._value = value;
    this._state = 'fulfilled';
  };
 };

 _internalReject(reason) {
  if(this._state === 'pending') {
    this._value = reason;
    this._state = 'rejected';
  };
 };
};

function executor(resolve, reject) {
  if(typeof(resolve) === 'function') {
    resolve();
  }
};

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
