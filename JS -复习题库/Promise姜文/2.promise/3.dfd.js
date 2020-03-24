let Promise = require('./promise');

let fs = require('fs');
// Promise.defer() 可以解决封装嵌套的问题  
function read(url) {
    //return new Promise((resolve, reject) => {
    let dfd = Promise.defer()
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise;
    // });
}
read('./name.txt').then(data => {
    console.log(data);
})