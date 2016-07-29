var assert = require('chai').assert;
var validol = require('../lib/index.js');
const invalidArgsMsg = 'arguments are not valid!';

describe('validol', function() {
	it(`should return object with error.message "${invalidArgsMsg}" when called with empty arguments`, function() {
		assert.isTrue(validol().error instanceof Error);
		assert.equal(validol().error.message, invalidArgsMsg);
	});
	it(`should return object with error.message "${invalidArgsMsg}" when object argument === null`, function() {
		assert.isTrue(validol(null).error instanceof Error);
		assert.equal(validol(null).error.message, invalidArgsMsg);
	});
	it(`should return object with error.message "${invalidArgsMsg}" when typeof props !== string || object`, function() {
		assert.isTrue(validol({}, 1).error instanceof Error);
		assert.equal(validol({}, 1).error.message, invalidArgsMsg);
		assert.isTrue(validol({}, true).error instanceof Error);
		assert.equal(validol({}, true).error.message, invalidArgsMsg);
		assert.isTrue(validol({}, null).error instanceof Error);
		assert.equal(validol({}, null).error.message, invalidArgsMsg);
	});
	it('should return object with error === false, all === false, any === true when called with empty props argument', function() {
		assert.isFalse(validol({}).error);
		assert.isFalse(validol({}).all);
		assert.isFalse(validol({}).any);
	});
	it('should return object with error === false, all === true, any === true when props argument === "myProp" and object.myProp is set', function() {
		assert.isFalse(validol({myProp: 1}, 'myProp').error);
		assert.isTrue(validol({myProp: 1}, 'myProp').all);
		assert.isTrue(validol({myProp: 1}, 'myProp').any);
	});
	it('should return object with error === false, all === false, any === false, result[props] === undefined when props argument === "myProp" and object.myProp is not set', function() {
		assert.isFalse(validol({}, 'myProp').error);
		assert.isFalse(validol({}, 'myProp').all);
		assert.isFalse(validol({}, 'myProp').any);
		assert.equal(validol({}, 'myProp').result.myProp, undefined);
	});
});
