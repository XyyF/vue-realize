/**
 * Created by rengar on 2020/4/28.
 */
const path = require('path')
import babel from '@rollup/plugin-babel'

export default {
    input: path.join(__dirname, './src/core/index.js'),
    output: {
        file: 'build/index.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
};