'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function validol(object) {
	var props = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	if (object === undefined || object === null || (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object' && typeof props !== 'string' || props === null) {
		return {
			error: new Error('not valid params!'),
			result: false,
			all: false,
			any: false
		};
	}
	if (props === '') {
		return {
			error: false,
			result: object,
			all: false,
			any: true
		};
	}
};