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
	} else {
		return false;
	}
}

function validationArrayProps(object, props) {
	let result = {
		error: false,
		result: object,
		all: true,
		any: false
	};

	props.map(prop => {
		if (typeof prop === 'string') {
			if(validationProp(object, prop)) {
				result.any = true;
			} else {
				result.result = {...object, ...{[prop]: undefined}};
				result.all = false;
			}
		}
		//if object
	});

	return result;
}

function validationObjectProps(object, props, propsName = 'props'): Result {
	let result: Result = {
		error: false,
		result: object,
		all: true,
		any: false
	};

	for (let key in props) {
		if (props.hasOwnProperty(key)) {
			if (validationProp(object, key)) {
				result.any = true;
				if (!props[key] || (typeof props[key] !== 'string' && typeof props[key] !== 'number' && typeof props[key] !== 'object') || props[key] === null) {
					result.all = false;
					result.error = new Error(`${propsName}.${key} argument is not valid!`);
					continue;
				}
				if (props[key] === '') {
					result.all = false;
					continue;
				}
				if (typeof props[key] === 'string' || typeof props[key] === 'number') {
					if (object[key] === undefined || object[key] === null) {
						result.all = false;
						result.result[key] = Object(object[key]);
						result.result[key][props[key]] = undefined;
						continue;
					} else {
						if(validationProp(object[key], props[key])) {
							result.any = true;
							continue;
						} else {
							result.all = false;
							result.result[key] = Object(object[key]);
							result.result[key][props[key]] = undefined;
							continue;
						}
					}
				}
				//if array or object
			} else {
				result.all = false;
				result.result[key] = Object();
				result.result[key][props[key]] = undefined;
			}
		}
	}
	return result;
}

module.exports = function validol(object: Object, props: Props = ''): Result {
	let result: Result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (object === undefined || object === null) {
		result.error = new Error('object argument is not valid!');
		return result;
	}

	if ((typeof props !== 'object' && typeof props !== 'string' && typeof props !== 'number') || props === null) {
		result.error = new Error('props argument is not valid!');
		return result;
	}

	if (props === '') {
		return result;
	}

	if (typeof props === 'string' || typeof props === 'number') {
		if(validationProp(object, props)) {
			result.all = true;
			result.any = true;
			return result;
		} else {
			result.result = {...object, ...{[props]: undefined}};
			return result;
		}
	}

	if (props instanceof Array) {
		return validationArrayProps(object, props);
	}

	if (typeof props === 'object' && !(props instanceof Array)) {
		result = validationObjectProps(object, props);
		return result;
	}

	result.error = new Error('undeclared error');
	return result;
};
