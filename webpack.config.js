let path = require('path'); //webpack遵循node规范，使用require进行引入
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/index.js', //入口
    output: {
        filename: "js/[name][hash:8].js", //给输出的js打hash号
        path: path.resolve('./release') //必须是绝对路径
    }, //出口
    devServer: { //开发服务器
        contentBase: './dev',
        port: 6767,
        compress: true,
        open: true,
        hot: true
    },
    module: { //模块配置
        rules: [
            {
                test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'}
                    ]
                })
            },
            {
                test: /\.less/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'},
                        {loader: 'less-loader'}
                    ]
                })
            }
        ]
    },
    plugins: [ //插件配置
        new CopyWebpackPlugin([
            {
                from: './src/static',
                to: './'
            }
        ]),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
            disable: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            title: 'index',
            hash: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        })
    ],
    mode: "development", //可以更改模式
    resolve: {}, //配置解析
};
