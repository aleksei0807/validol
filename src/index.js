module.exports = function validol(object, props = '') {
	if (object === undefined || object === null || (typeof props !== 'object' && typeof props !== 'string') || props === null) {
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
