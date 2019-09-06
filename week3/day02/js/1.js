var  reg = /^[0-9a-z]$///  o-9或a-z 只能有一个
console.log(reg.test('1a'))//false
console.log(reg.test('a'))//true
console.log(reg.test('1'))//true
console.log(reg.test('a1a'))//false
console.log(reg.test('你'))//false
console.log('=========================================================')

var reg = /^[0-9a-z]+$/
console.log(reg.test('1a'))//true
console.log(reg.test('a'))//true
console.log(reg.test('1'))//true
console.log(reg.test('a1a'))//true
console.log(reg.test('你'))//false
console.log('==============================================');


var reg2 = /^18|19$/
var reg2_1 = /[11-99]/   // 1 或 1-9 或 9

//  var reg = /[a-Z]/  //报错error：Range out  大Z在a的前面
var reg4 = /\d?/   //代表对应的元字符出现0-1次
console.log(reg4.test(''));
console.log(reg4.test('1'));
console.log(reg4.test('123'));
console.log(reg4.test('q'));
console.log(reg4.test('q1'));
console.log('=====================================================');
var reg4 = /\d*/   //代表对应的元字符出现0到多次
console.log(reg4.test(''));
console.log(reg4.test('1'));
console.log(reg4.test('123'));
console.log(reg4.test('q'));
console.log(reg4.test('q1'));
console.log('====================================================');
var reg4 = /\d+/   //代表对应的元字符出现1到多次
console.log(reg4.test(''));//false
console.log(reg4.test('1'));
console.log(reg4.test('123'));
console.log(reg4.test('q'));//false
console.log(reg4.test('q1'));
console.log('===============================================');

var reg5 = /^\d+$/ //数字开头数字结尾  中间1到多个数字
console.log(reg5.test('11')); //true
console.log(reg5.test('12'));//true
console.log(reg5.test('113'));//true
console.log(reg5.test('11qw3'));//false

var reg5 = /^6+$/
console.log(reg5.test('616'));//false
console.log(reg5.test('666'));//true
console.log(reg5.test('66'));//true
console.log('=====================================================');

var reg6 = /\d{3}/  //三个数字连着中间不能有任何东西
console.log(reg6.test('1234'));//true
console.log(reg6.test('王峰123'))//true
console.log(reg6.test('12'))//false
console.log(reg6.test('你6你6你6'))//false
console.log(reg6.test('666'))//true
console.log(reg6.test(''))//false
console.log('============================================');
var reg6 = /^\d{3}$/  //三个数字连着中间不能有任何东西
console.log(reg6.test('1234'));//false
console.log(reg6.test('王峰123'))//
console.log(reg6.test('12'))//
console.log(reg6.test('你6你6你6'))//
console.log(reg6.test('666'))//
console.log(reg6.test(''))//
console.log('====================================================');

var reg = /[a-z]/i;
console.log(reg.test('123ABC123'));//true
var reg = /^a/m
console.log(reg.test('hello \na'));//true


 