'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	} else {
		return false;
	}
}

module.exports = function validol(object) {
	var props = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	var result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (object === undefined || object === null || (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object' && typeof props !== 'string' || props === null) {
		result = {
			error: new Error('arguments are not valid!'),
			result: false,
			all: false,
			any: false
		};
		return result;
	}
	if (props === '') {
		result = {
			error: false,
			result: object,
			all: false,
			any: false
		};
		return result;
	}
	if (typeof props === 'string') {
		if (validationProp(object, props)) {
			result = {
				error: false,
				result: object,
				all: true,
				any: true
			};
			return result;
		} else {
			result = {
				error: false,
				result: _extends({}, object, _defineProperty({}, props, undefined)),
				all: false,
				any: false
			};
			return result;
		}
	}
};