/* eslint-disable */
const assert = require('chai').assert;
const validol = require('../lib/index.js');
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
	it(`should return object with error.message "${invalidPropsArgMsg}" when typeof props !== string || number || object`, function() {
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
		assert.equal(validol({myProp: 1}, 'myProp').result.myProp, 1);
	});
	it('should return object with error === false, all === false, any === false, result[props] === undefined when props argument === "myProp" and object.myProp is not set', function() {
		assert.isFalse(validol({}, 'myProp').error);
		assert.isFalse(validol({}, 'myProp').all);
		assert.isFalse(validol({}, 'myProp').any);
		assert.equal(validol({}, 'myProp').result.myProp, undefined);
	});

	it('should return object with error === false, all === true, any === true when props argument === ["myProp", "myProp2"] and object.myProp and object.myProp2 is set', function() {
		assert.isFalse(validol({
			myProp: 1,
			myProp2: 2
		}, ["myProp", "myProp2"]).error);
		assert.isTrue(validol({
			myProp: 1,
			myProp2: 2
		}, ["myProp", "myProp2"]).all);
		assert.isTrue(validol({
			myProp: 1,
			myProp2: 2
		}, ["myProp", "myProp2"]).any);
		assert.equal(validol({
			myProp: 1,
			myProp2: 2
		}, ["myProp", "myProp2"]).result.myProp, 1);
		assert.equal(validol({
			myProp: 1,
			myProp2: 2
		}, ["myProp", "myProp2"]).result.myProp2, 2);
	});
	it('should return object with error === false, all === false, any === true when props argument === ["myProp", "myProp2"] and object.myProp is set and object.myProp2 is not set', function() {
		assert.isFalse(validol({
			myProp: 1
		}, ["myProp", "myProp2"]).error);
		assert.isFalse(validol({
			myProp: 1
		}, ["myProp", "myProp2"]).all);
		assert.isTrue(validol({
			myProp: 1
		}, ["myProp", "myProp2"]).any);
		assert.equal(validol({
			myProp: 1
		}, ["myProp", "myProp2"]).result.myProp, 1);
		assert.equal(validol({
			myProp: 1
		}, ["myProp", "myProp2"]).result.myProp2, undefined);
	});
	it('should return object with error === false, all === false, any === false, result[props] === undefined when props argument === ["myProp", "myProp2"] and object.myProp and object.myProp2 is not set', function() {
		assert.isFalse(validol({}, ["myProp", "myProp2"]).error);
		assert.isFalse(validol({}, ["myProp", "myProp2"]).all);
		assert.isFalse(validol({}, ["myProp", "myProp2"]).any);
		assert.equal(validol({}, ["myProp", "myProp2"]).result.myProp, undefined);
		assert.equal(validol({}, ["myProp", "myProp2"]).result.myProp2, undefined);
	});

	it('should return object with error === false, all === true, any === true when props argument === {myProp: "myProp2"} and object.myProp and object.myProp.myProp2 is set', function() {
		assert.isFalse(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: "myProp2"}).error);
		assert.isTrue(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: "myProp2"}).all);
		assert.isTrue(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: "myProp2"}).any);
		assert.equal(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: "myProp2"}).result.myProp.myProp2, 2);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: "myProp2"} and object.myProp is set and object.myProp.myProp2 is not set', function() {
		assert.isFalse(validol({
			myProp: 1
		}, {myProp: "myProp2"}).error);
		assert.isFalse(validol({
			myProp: 1
		}, {myProp: "myProp2"}).all);
		assert.isTrue(validol({
			myProp: 1
		}, {myProp: "myProp2"}).any);
		assert.equal(validol({
			myProp: 1
		}, {myProp: "myProp2"}).result.myProp, 1);
		assert.equal(validol({
			myProp: 1
		}, {myProp: "myProp2"}).result.myProp.myProp2, undefined);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: "myProp2"} and object.myProp === undefined and object.myProp.myProp2 is not set', function() {
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: "myProp2"}).error);
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: "myProp2"}).all);
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: "myProp2"}).any);
		assert.equal(validol({
			myProp: undefined
		}, {myProp: "myProp2"}).result.myProp.myProp2, undefined);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: "myProp2"} and object.myProp === null and object.myProp.myProp2 is not set', function() {
		assert.isFalse(validol({
			myProp: null
		}, {myProp: "myProp2"}).error);
		assert.isFalse(validol({
			myProp: null
		}, {myProp: "myProp2"}).all);
		assert.isTrue(validol({
			myProp: null
		}, {myProp: "myProp2"}).any);
		assert.equal(validol({
			myProp: null
		}, {myProp: "myProp2"}).result.myProp.myProp2, undefined);
	});
	it('should return object with error === false, all === false, any === false, result[props] === undefined when props argument === {myProp: "myProp2"} and object.myProp is not set', function() {
		assert.isFalse(validol({}, {myProp: "myProp2"}).error);
		assert.isFalse(validol({}, {myProp: "myProp2"}).all);
		assert.isFalse(validol({}, {myProp: "myProp2"}).any);
		assert.equal(validol({}, {myProp: "myProp2"}).result.myProp.myProp2, undefined);
	});

	it('should return object with error === false, all === true, any === true when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp and object.myProp.myProp2 and object.myProp.myProp3 is set', function() {
		assert.isFalse(validol({
			myProp: {
				myProp2: 2,
				myProp3: 3
			}
		}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isTrue(validol({
			myProp: {
				myProp2: 2,
				myProp3: 3
			}
		}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isTrue(validol({
			myProp: {
				myProp2: 2,
				myProp3: 3
			}
		}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({
			myProp: {
				myProp2: 2,
				myProp3: 3
			}
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, 2);
		assert.equal(validol({
			myProp: {
				myProp2: 2,
				myProp3: 3
			}
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, 3);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp and object.myProp.myProp2 and object.myProp.myProp3 is not set', function() {
		assert.isFalse(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isFalse(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isTrue(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, 2);
		assert.equal(validol({
			myProp: {
				myProp2: 2
			}
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, undefined);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp is set and object.myProp.myProp2 is not set and object.myProp.myProp3 is not set', function() {
		assert.isFalse(validol({
			myProp: 1
		}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isFalse(validol({
			myProp: 1
		}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isTrue(validol({
			myProp: 1
		}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({
			myProp: 1
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, undefined);
		assert.equal(validol({
			myProp: 1
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, undefined);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp === undefined and object.myProp.myProp2 is not set and object.myProp.myProp3 is not set', function() {
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isFalse(validol({
			myProp: undefined
		}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({
			myProp: undefined
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, undefined);
		assert.equal(validol({
			myProp: undefined
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, undefined);
	});
	it('should return object with error === false, all === false, any === true when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp === null and object.myProp.myProp2 is not set and object.myProp.myProp3 is not set', function() {
		assert.isFalse(validol({
			myProp: null
		}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isFalse(validol({
			myProp: null
		}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isTrue(validol({
			myProp: null
		}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({
			myProp: null
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, undefined);
		assert.equal(validol({
			myProp: null
		}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, undefined);
	});
	it('should return object with error === false, all === false, any === false, result[props] === undefined when props argument === {myProp: ["myProp2", "myProp3"]} and object.myProp is not set', function() {
		assert.isFalse(validol({}, {myProp: ["myProp2", "myProp3"]}).error);
		assert.isFalse(validol({}, {myProp: ["myProp2", "myProp3"]}).all);
		assert.isFalse(validol({}, {myProp: ["myProp2", "myProp3"]}).any);
		assert.equal(validol({}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp2, undefined);
		assert.equal(validol({}, {myProp: ["myProp2", "myProp3"]}).result.myProp.myProp3, undefined);
	});
});
