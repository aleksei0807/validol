var assert = require('chai').assert;
var validol = require('../lib/index.js');
const invalidObjectArgMsg = 'object argument is not valid!';
const invalidPropsArgMsg = 'props argument is not valid!';

describe('validol', function() {
	it(`should return object with error.message "${invalidObjectArgMsg}" when called with empty arguments`, function() {
		assert.isTrue(validol().error instanceof Error);
		assert.equal(validol().error.message, invalidObjectArgMsg);
	});
	it(`should return object with error.message "${invalidObjectArgMsg}" when object argument === null`, function() {
		assert.isTrue(validol(null).error instanceof Error);
		assert.equal(validol(null).error.message, invalidObjectArgMsg);
	});
	it(`should return object with error.message "${invalidPropsArgMsg}" when typeof props !== string || object`, function() {
		assert.isTrue(validol({}, 1).error instanceof Error);
		assert.equal(validol({}, 1).error.message, invalidPropsArgMsg);
		assert.isTrue(validol({}, true).error instanceof Error);
		assert.equal(validol({}, true).error.message, invalidPropsArgMsg);
		assert.isTrue(validol({}, null).error instanceof Error);
		assert.equal(validol({}, null).error.message, invalidPropsArgMsg);
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
