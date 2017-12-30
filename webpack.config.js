// 1.导入node.js的path这个核心包
var path=require('path');
// import path from 'path';
var web=require('html-webpack-plugin');
// 导入webpack这个包
var webpack = require('webpack');

module.exports={
    // 2指定webpack的打包入口
    entry:'./src/main.js',
    // 指定打包完成以后的输出文件
    output:{
        // 指定的是build.js要生成的目录，注意：一定是一个绝对路径，写相对路径会报错
        // __dirname就是获取当前文件(webpack.config.js)所在的绝对路径
     path:path.join(__dirname,'/dist'),
    //  这个文件名可以自定义
    filename:'build.js'
    },
    // 导入jquery这个包
    resolve: {
        alias: {
            //   导入node_modules文件夹中的jquery这个包
            'jquery': 'jquery'
        }
    },
    module:{
        // 配置webpack相对的loader包
        loaders:[
           //  在这里配置的是具体的某一个的loader
          {
        // 配置的是用来解析.css文件的loader(style-loader和css-loader)
           test:/\.css$/,  // 用正则匹配当前访问的文件的后缀名是.css
           loader:'style-loader!css-loader'  // //webpack底层调用这些包的顺序是从右到左
          },
          {
           test:/\.less$/,// 用正则匹配当前访问的文件的后缀名是.less
           loader:'style-loader!css-loader!less-loader'   
          },
          {
          test:/\.scss$/,
           loader:'style-loader!css-loader!sass-loader'       
          },
          {
          test:/\.(jpg|png|ttf|gif|woff|eot|svg)$/,
           // 可以在url-loader?limit=设定的限定值大小(单位：Byte  1K=1024Byte )
         //  如果图片大于10k就存放build里
           loader:'url-loader?limit=10240'   //注意这个地方不需要使用file-loader     
          },
          {
            // 配置的是用来解析.vue文件的loader(vue-loader)
           test: /\.vue$/,    
           loader:'vue-loader'   
          },
        ]
    },
    plugins:[
        new web({
            // 在内存中生成的名称，自动自动将build注入到这个页面底部，才能实现自动刷新功能
        filename:'index.html',// 在内存中生成的html的文件名称
        // 根据index1.html这个模板来生成(这个文件请程序员自己生成)
        template:'index1.html'   // 通过script标签加载到index.html的底部

        }),
        // 将jqeruy对象映射为$和jQuery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}