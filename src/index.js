// @flow

type Props = string | number | Array<string | Object> | Object;
type Result = {
	error: boolean | Error,
	result: Object,
	all: boolean,
	any: boolean
}

function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	}
	return false;
}

function validationArrayProps(object, props) {
	const result = {
		error: false,
		result: object,
		all: true,
		any: false,
	};

	props.forEach(prop => {
		if (typeof prop === 'string' || typeof prop === 'number') {
			if (validationProp(object, prop)) {
				result.any = true;
			} else {
				result.result[prop] = undefined;
				result.all = false;
			}
		}
		// if object

		return true;
	});

	return result;
}

function validationObjectProps(object, props, propsName = 'props'): Result {
	const result: Result = {
		error: false,
		result: object,
		all: true,
		any: false,
	};

	Object.keys(props).forEach(key => {
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

				if (props[key] === '') {
					result.all = false;
					return true;
				}

				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					if (typeof result.result[key] !== 'object'
					|| (result.result[key] !== object[key] && result.result[key] !== undefined)
					|| result.result[key] === null) {
						result.all = false;
						if (object[key] === null || object[key] === undefined) {
							result.result[key] = Object();
						} else {
							result.result[key] = Object(object[key]);
						}
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
					const localResult = validationArrayProps(result.result[key], props[key]);
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

				// if object
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
				if (props[key] instanceof Array) {
					result.result[key] = validationArrayProps(result.result[key], props[key]).result;
					return true;
				}
				// if object

				return true;
			}
		}
		return true;
	});
	return result;
}

module.exports = function validol(object: Object, props: Props = ''): Result {
	let result: Result = {
		error: false,
		result: object,
		all: false,
		any: false,
	};

	if (object === undefined || object === null) {
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
		result.result = { ...object, ...{ [props]: undefined } };
		return result;
	}

	if (props instanceof Array) {
		return validationArrayProps(object, props);
	}

	if (typeof props === 'object' && !(props instanceof Array)) {
		result = validationObjectProps(object, props);
		// console.log(result);
		return result;
	}

	result.error = new Error('undeclared error');
	return result;
};
