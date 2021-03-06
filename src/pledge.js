'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function HandlerGroup(success, error) {
  this.successCb = (typeof success === 'function') ? success : null;
  this.errorCb = (typeof error === 'function') ? error : null;
  this.downstreamPromise = new $Promise();
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
      this._callHandlers('fulfilled');
    };
  };

  _internalReject(reason) {
    if(this._state === 'pending') {
      this._value = reason;
      this._state = 'rejected';
      this._callHandlers('rejected');
    };
  };

  _callHandlers(state) {
    // Recurse through this with values
    if(state === 'fulfilled') {
      this._handlerGroups.forEach(handlerGroup => {
        if(handlerGroup.successCb) handlerGroup.successCb(this._value);
      });
    }
    if(state === 'rejected') {
      this._handlerGroups.forEach(handlerGroup => {
        if(handlerGroup.errorCb) handlerGroup.errorCb(this._value);
      });
    }
    this._handlerGroups = [];
  };
 
  then(success, error) {
    const handlerGroup = new HandlerGroup(success, error);
    this._handlerGroups.push(handlerGroup);
    if (this._state === 'fulfilled') this._callHandlers('fulfilled');
    if (this._state === 'rejected') this._callHandlers('rejected');
    // return this._handlerGroups[this._handlerGroups.length-1].downstreamPromise;
    return handlerGroup.downstreamPromise;
  };

  catch(error) {
    return this.then(null, error);
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
