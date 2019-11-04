let A = require('./A');
let avg = (...arg) => {
	arg = arg.sort((a, b) => a - b).slice(1, arg.length - 1);
	return (A.sum(...arg) / arg.length).toFixed(2);
};
module.exports = {
	avg
};