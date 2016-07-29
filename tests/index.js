var assert = require('chai').assert;
var validol = require('../lib/index.js');

describe('validol', function() {
	it('should return error.message "not valid params!" when is not params', function() {
		assert.isTrue(validol().error instanceof Error);
		assert.equal(validol().error.message, 'not valid params!');
	});
	it('should return error.message "not valid params!" when is object = null', function() {
		assert.isTrue(validol(null).error instanceof Error);
		assert.equal(validol(null).error.message, 'not valid params!');
	});
	it('should return error.message "not valid params!" when is typeof props != string/object', function() {
		assert.isTrue(validol({}, 1).error instanceof Error);
		assert.equal(validol({}, 1).error.message, 'not valid params!');
		assert.isTrue(validol({}, true).error instanceof Error);
		assert.equal(validol({}, true).error.message, 'not valid params!');
		assert.isTrue(validol({}, null).error instanceof Error);
		assert.equal(validol({}, null).error.message, 'not valid params!');
	});
	it('should return error = false, all = false, any = true when is not props', function() {
		assert.isFalse(validol({}).error);
		assert.isFalse(validol({}).all);
		assert.isTrue(validol({}).any);
	});
});
