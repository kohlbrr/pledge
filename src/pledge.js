'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function HandlerGroup(success, error) {
  this.successCb = (typeof success === 'function') ? success : null;
  this.errorCb = (typeof error === 'function') ? error : null;
}

class $Promise {
  constructor(executor) {
  // `this` here refers to this constructor function
    this._state = 'pending';
    this._value;
    this._handlerGroups = [];
    if(typeof executor === 'function') executor(this._internalResolve.bind(this),
      this._internalReject.bind(this));
  };
 
  _internalResolve(value) {
    if(this._state === 'pending') {
      this._value = value;
      this._state = 'fulfilled';
      this._callHandlers();
    };
  };

  _internalReject(reason) {
    if(this._state === 'pending') {
      this._value = reason;
      this._state = 'rejected';
    };
  };

  _callHandlers() {
    console.log(' in our handlergroups', this._handlerGroups)
    this._handlerGroups.forEach(handlerGroup => handlerGroup.successCb(this._value));
    this._handlerGroups = [];
  };
 
  then(success, error) {
    this._handlerGroups.push(new HandlerGroup(success, error));
    console.log(this);
    // console.log(this._handlerGroups);
    if (this._state === 'fulfilled') this._callHandlers();

  };
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
