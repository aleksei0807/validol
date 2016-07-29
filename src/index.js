function validationProp(object, prop) {
	if (object[prop] !== undefined) {
		return true;
	} else {
		return false;
	}
}

module.exports = function validol(object, props = '') {
	let result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (object === undefined || object === null || (typeof props !== 'object' && typeof props !== 'string') || props === null) {
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
		if(validationProp(object, props)) {
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
				result: {...object, ...{[props]: undefined}},
				all: false,
				any: false
			};
			return result;
		}
	}
};
