let {
	readFile
} = require('../utils/promiseFS');

readFile('./js/path.js').then(result => {
	console.log(result);
}).catch(reason => {
	console.log(reason);
});