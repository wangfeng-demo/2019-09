// fs  是node 内模块 用来操作文件的 读写文件
// I/O input output IO操作 文件读写
let fs = require('fs');
//readFile 执行 有三个参数  url 编码格式('') 回调函数

//=======================================================读文件
// fs.readFile('./1.less','utf-8', (err, data) => {///////异步
//     //如果读取失败err就会有对应的值
//     //成功 err 就是null
//     if (!err) {
//         console.log('data', data);
//     } else {
//         console.log('err', err);
//     }
// }) 
// console.log(666);


/* let data = fs.readFileSync('./1.less', 'utf-8');
console.log(data); */

//readFileSync 同步readFile 异步

//======================================================读文件夹
// fs.readdir('./node模块', null, (err, data) => {
//     if (!err) {
//         data.forEach(item => {
//             fs.readFile('./node模块/' + item, 'utf-8', (e, d) => {
//                 if (!e) {
//                     console.log(d);

//                 } else {
//                     console.log(e);

//                 }
//             })
//         });
//     }
// })

// let res = fs.readdirSync('./node模块', 'utf-8');
// console.log(res);

/* fs.mkdir('./qqq', (err) => {
    if (!err) {
        console.log('创建成功');
    } else {
        console.log('创建失败');
    }
}) */

/* fs.rmdir('./qqq', (err) => {
    if (!err) {
        console.log('删除成功');
    } else {//文件夹不存在或者有文件删除失败
        console.log('删除失败');
    }
}) */

// fs.mkdir('./qqq', (err) => {

// })
// fs.writeFile('./qqq/1.txt','你好 中国','utf-8',(err)=>{
//     if(!err){
//         console.log('写入成功');
//     }else{
//         console.log('写入失败');
//     }
// })
/* try {
    fs.writeFileSync('./qqq/1.txt', 'hello', 'utf-8')
} catch (error) {
    console.log(666);
} */


// fs.appendFile('./qqq/1.txt','纪莹 王八','utf-8',(err)=>{
//     if(!err){
//         console.log('添加成功');
//     }else{
//         console.log('添加失败');
        
//     }
// })

//=====================================实现append
function append(url, data) {
    fs.readFile(url, 'utf-8', (err, d) => {
        if (d === undefined) {
            d = ''
        }
        fs.writeFile(url, d + data, 'utf-8', (err) => { //写的话如果原来有就顶掉 如果没有就新增一个
            if (!err) {
                console.log('添加成功');
            }
        })
        /* if (!err) {
            fs.writeFile(url, d + data, 'utf-8', (err) => {
                if (!err) {
                    console.log('添加成功');
                }
            })
        }else{
            fs.writeFile(url, data, 'utf-8', (err) => {
                if (!err) {
                    console.log('创建成功');
                }
            })
        } */
    })
}
append('./qqq/3.txt', '峰峰莹莹')

// fs.unlink('./qqq/2.txt', (err) => {
// console.log(err);
// })
/* fs.copyFile('./qqq/1.txt', './qqq/3.txt', (err) => {
    console.log(err);
})


//总结
// readFile readdir mkdir rmdir writeFile appendFile copyFile unlink
readFile('./qqq','').then(()=>{}) */