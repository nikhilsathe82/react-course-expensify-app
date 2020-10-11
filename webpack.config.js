const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production'; // if env is production. then is production is true. if false > isPRoduction is false and web pack is run without production optimization
    // console.log('env',env);
    // const CSSExtract = new ExtractTextPlugin('style.css'); //the 
    return {

        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                        'style-loader',
                        {
                        loader: 'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    }
                ]
                
            }]
        },
        // plugins:[
        //     CSSExtract
        // ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist'
        }

    };
};
