let my = require('./promiseFs.js');
// my.unlink('./qqq/1.txt').then(() => {
//     console.log('删除成功');
// }).catch(err=>{
// console.log('删除失败');
// })
// let p1 = my.unlink('./qqq/2.txt');
// let p2 =  my.unlink('./qqq/3.txt');
// Promise.all([p1,p2]).then(()=>{
//     console.log('删除成功');
// }).catch(()=>{
//     console.log('删除失败');
// })
// my.rmdir('./qqq').then(()=>{
//     console.log('2222');
    
// })
// my.mkdir('./qqq').then(()=>{
//     console.log(2222);
// })
let p1 = my.writeFile('./qqq/1.txt','789');
let p2 = my.writeFile('./qqq/2.txt','123');
let p3 = my.writeFile('./qqq/3.txt','456');
Promise.all([p1,p2,p3]).then(()=>{
    console.log(5555);
}).catch(()=>{
    console.log(222);
})
my.readFile('./qqq/1.txt').then((err,data)=>{
    console.log(data);
    
})
