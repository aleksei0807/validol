'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	}
	return false;
}

function validationArrayProps(object, props) {
	var result = {
		error: false,
		result: object,
		all: true,
		any: false
	};

	props.map(function (prop) {
		if (typeof prop === 'string') {
			if (validationProp(object, prop)) {
				result.any = true;
			} else {
				result.result = _extends({}, object, _defineProperty({}, prop, undefined));
				result.all = false;
			}
		}
		// if object

		return true;
	});

	return result;
}

function validationObjectProps(object, props) {
	var propsName = arguments.length <= 2 || arguments[2] === undefined ? 'props' : arguments[2];

	var result = {
		error: false,
		result: object,
		all: true,
		any: false
	};

	Object.keys(props).forEach(function (key) {
		if ({}.hasOwnProperty.call(props, key)) {
			if (validationProp(object, key)) {
				result.any = true;
				if (!props[key] || typeof props[key] !== 'string' && typeof props[key] !== 'number' && _typeof(props[key]) !== 'object' || props[key] === null) {
					result.all = false;
					result.error = new Error(propsName + '.' + key + ' argument is not valid!');
					return true;
				}
				if (props[key] === '') {
					result.all = false;
					return true;
				}
				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					if (object[key] === undefined || object[key] === null) {
						result.all = false;
						result.result[key] = Object(object[key]);
						result.result[key][props[key]] = undefined;
						return true;
					}
					if (validationProp(object[key], props[key])) {
						result.any = true;
						return true;
					}
					result.all = false;
					result.result[key] = Object(object[key]);
					result.result[key][props[key]] = undefined;
					return true;
				}
				// if array or object
			} else {
				result.all = false;
				result.result[key] = Object();
				result.result[key][props[key]] = undefined;
			}
		}
		return true;
	});

	return result;
}

module.exports = function validol(object) {
	var props = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	var result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (object === undefined || object === null) {
		result.error = new Error('object argument is not valid!');
		return result;
	}

	if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object' && typeof props !== 'string' && typeof props !== 'number' || props === null) {
		result.error = new Error('props argument is not valid!');
		return result;
	}

	if (props === '') {
		return result;
	}

	if (typeof props === 'string' || typeof props === 'number') {
		if (validationProp(object, props)) {
			result.all = true;
			result.any = true;
			return result;
		}
		result.result = _extends({}, object, _defineProperty({}, props, undefined));
		return result;
	}

	if (props instanceof Array) {
		return validationArrayProps(object, props);
	}

	if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object' && !(props instanceof Array)) {
		result = validationObjectProps(object, props);
		return result;
	}

	result.error = new Error('undeclared error');
	return result;
};