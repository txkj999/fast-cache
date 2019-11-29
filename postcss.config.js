const pxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [
        require('autoprefixer'),
        pxtorem({
            rootValue: 32,
            unitPrecision: 5,
            propList: ['*']
        })
    ]
};
