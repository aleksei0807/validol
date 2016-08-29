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
		if(validationProp(object, prop)) {
			result.any = true;
		} else {
			result.result = {...object, ...{[props]: undefined}};
			result.all = false;
		}
	});

	return result;
}

module.exports = function validol(object, props = '') {
	let result = {
		error: false,
		result: object,
		all: false,
		any: false
	};

	if (object === undefined || object === null) {
		result.error = new Error('object argument is not valid!');
		return result;
	}

	if ((typeof props !== 'object' && typeof props !== 'string') || props === null) {
		result.error = new Error('props argument is not valid!');
		return result;
	}

	if (props === '') {
		return result;
	}

	if (typeof props === 'string') {
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

	result.error = new Error('undeclared error');
	return result;
};
