let path = require('path')
module.exports = {
    mode:'development',
    devServer:{
        contentBase:path.resolve(__dirname,'../dist'),
        compress:true,
        port:3000
    }
}