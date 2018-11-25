'use strict';

var createError = require('errno').create;

var SwicoreNodeError = createError('SwicoreNodeError');

var RPCError = createError('RPCError', SwicoreNodeError);

module.exports = {
  Error: SwicoreNodeError,
  RPCError: RPCError
};
