// @flow
import type { Props, Result } from './types';

function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	}
	return false;
}

function validationArrayProps(object, props, propsName = 'props', defaultValue) {
	const result = {
		error: false,
		result: object,
		all: true,
		any: false,
	};

	props.forEach((prop) => {
		if (typeof prop === 'string' || typeof prop === 'number') {
			if (validationProp(object, prop)) {
				result.any = true;
			} else {
				result.result[prop] = defaultValue;
				result.all = false;
			}
		}
		if (typeof prop === 'object' && prop !== null) {
			/* eslint-disable no-use-before-define */
			const localResult = validationObjectProps(
				result.result,
				prop,
				propsName,
				defaultValue
			);
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

function validationObjectProps(object, props, propsName = 'props', defaultValue): Result {
	const result: Result = {
		error: false,
		result: object,
		all: true,
		any: false,
	};

	Object.keys(props).forEach((key) => {
		if ({}.hasOwnProperty.call(props, key)) {
			if (validationProp(object, key)) {
				result.any = true;
				if (!props[key]
					|| (typeof props[key] !== 'string'
						&& typeof props[key] !== 'number'
						&& typeof props[key] !== 'object')
					|| props[key] === null) {
					result.all = false;
					result.error = new Error(`${propsName}.${key} argument is not valid!`);
					return false;
				}

				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					if (typeof result.result[key] !== 'object'
					|| result.result[key] !== object[key]
					|| result.result[key] === null) {
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
					if (typeof result.result[key] !== 'object'
					|| result.result[key] !== object[key]
					|| result.result[key] === null) {
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
					}
					const localResult = validationArrayProps(
						result.result[key],
						props[key],
						`${propsName}.${key}`,
						defaultValue
					);
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

				if (typeof props[key] === 'object' && props[key] !== null) {
					if (typeof result.result[key] !== 'object'
					|| result.result[key] !== object[key]
					|| result.result[key] === null) {
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
					}
					const localResult = validationObjectProps(
						result.result[key],
						props[key],
						`${propsName}.${key}`,
						defaultValue
					);
					if (localResult.all === false) {
						result.all = false;
					}
					if (localResult.any === true) {
						result.any = true;
					}
					result.result[key] = localResult.result;
					return true;
				}
			} else {
				result.all = false;
				if (typeof result.result[key] !== 'object'
				|| result.result[key] !== object[key]
				|| result.result[key] === null) {
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
					result.result[key] = validationArrayProps(
						result.result[key],
						props[key],
						`${propsName}.${key}`,
						defaultValue
					).result;
					return true;
				}

				if (typeof props[key] === 'object' && props[key] !== null) {
					const localResult = validationObjectProps(
						result.result[key],
						props[key],
						`${propsName}.${key}`,
						defaultValue
					);
					if (localResult.all === false) {
						result.all = false;
					}
					if (localResult.any === true) {
						result.any = true;
					}
					result.result[key] = localResult.result;
					return true;
				}

				return true;
			}
		}
		return true;
	});
	return result;
}

function validol(
	originalObject: Object,
	props: Props = '',
	defaultValue: any = undefined,
	settings: ?Object
): Result {
	let object = {};
	if (settings && settings.mutation === false) {
		object = JSON.parse(JSON.stringify(originalObject));
	} else {
		object = originalObject;
	}

	let result: Result = {
		error: false,
		result: object,
		all: false,
		any: false,
	};

	if (originalObject === undefined || originalObject === null) {
		result.error = new Error('object argument is not valid!');
		return result;
	}

	if ((typeof props !== 'object'
		&& typeof props !== 'string'
		&& typeof props !== 'number')
	|| props === null) {
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

	if (typeof props === 'object' && !(props instanceof Array)) {
		result = validationObjectProps(object, props, 'props', defaultValue);
		return result;
	}

	result.error = new Error('undeclared error');
	return result;
}

module.exports = validol;
