export type Props = string | number | Array<string | Object> | Object;

export type Result = {
	error: boolean | Error;
	result: Object;
	all: boolean;
	any: boolean;
}
