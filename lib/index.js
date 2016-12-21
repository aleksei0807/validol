'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	}
	return false;
}


function validationArrayProps(object, props) {
	var propsName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'props';
	var defaultValue = arguments[3];

	var result = {
		error: false,
		result: object,
		all: true,
		any: false
	};

	props.forEach(function (prop) {
		if (typeof prop === 'string' || typeof prop === 'number') {
			if (validationProp(object, prop)) {
				result.any = true;
			} else {
				result.result[prop] = defaultValue;
				result.all = false;
			}
		}
		if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && prop !== null) {
			/* eslint-disable no-use-before-define */
			var localResult = validationObjectProps(result.result, prop, propsName, defaultValue);
			/* eslint-enable no-use-before-define */
			if (localResult.all === false) {
				result.all = false;
			}
			if (localResult.any === true) {
				result.any = true;
			}
			result.result = localResult.result;
		}

		return true;
	});

	return result;
}

function validationObjectProps(object, props) {
	var propsName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'props';
	var defaultValue = arguments[3];

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
					return false;
				}

				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					if (_typeof(result.result[key]) !== 'object' || result.result[key] !== object[key] || result.result[key] === null) {
						result.all = false;
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
						result.result[key][props[key]] = defaultValue;
						return true;
					}
					if (validationProp(object[key], props[key])) {
						result.any = true;
						return true;
					}
					result.all = false;
					result.result[key] = Object(object[key]);
					result.result[key][props[key]] = defaultValue;
					return true;
				}

				if (props[key] instanceof Array) {
					if (_typeof(result.result[key]) !== 'object' || result.result[key] !== object[key] || result.result[key] === null) {
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
					}
					var localResult = validationArrayProps(result.result[key], props[key], propsName + '.' + key, defaultValue);
					if (localResult.error !== false) {
						result.error = localResult.error;
						return false;
					}
					if (localResult.all === false) {
						result.all = false;
					}
					if (localResult.any === true) {
						result.any = true;
					}
					result.result[key] = localResult.result;
					return true;
				}

				if (_typeof(props[key]) === 'object' && props[key] !== null) {
					if (_typeof(result.result[key]) !== 'object' || result.result[key] !== object[key] || result.result[key] === null) {
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
					}
					var _localResult = validationObjectProps(result.result[key], props[key], propsName + '.' + key, defaultValue);
					if (_localResult.all === false) {
						result.all = false;
					}
					if (_localResult.any === true) {
						result.any = true;
					}
					result.result[key] = _localResult.result;
					return true;
				}
			} else {
				result.all = false;
				if (_typeof(result.result[key]) !== 'object' || result.result[key] !== object[key] || result.result[key] === null) {
					if (object[key] === null || object[key] === undefined) {
						result.result[key] = Object();
					} else {
						result.result[key] = Object(object[key]);
					}
				}
				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					result.result[key][props[key]] = defaultValue;
					return true;
				}
				if (props[key] instanceof Array) {
					result.result[key] = validationArrayProps(result.result[key], props[key], propsName + '.' + key, defaultValue).result;
					return true;
				}

				if (_typeof(props[key]) === 'object' && props[key] !== null) {
					var _localResult2 = validationObjectProps(result.result[key], props[key], propsName + '.' + key, defaultValue);
					if (_localResult2.all === false) {
						result.all = false;
					}
					if (_localResult2.any === true) {
						result.any = true;
					}
					result.result[key] = _localResult2.result;
					return true;
				}

				return true;
			}
		}
		return true;
	});
	return result;
}

function validol(originalObject) {
	var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	var settings = arguments[3];

	var object = {};
	if (settings && settings.mutation === false) {
		object = JSON.parse(JSON.stringify(originalObject));
	} else {
		object = originalObject;
	}

	var result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (originalObject === undefined || originalObject === null) {
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
		result.result[props] = defaultValue;
		return result;
	}

	if (props instanceof Array) {
		return validationArrayProps(object, props, 'props', defaultValue);
	}

	if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object' && !(props instanceof Array)) {
		result = validationObjectProps(object, props, 'props', defaultValue);
		return result;
	}

	result.error = new Error('undeclared error');
	return result;
}

module.exports = validol;