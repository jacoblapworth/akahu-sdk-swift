let babel = require("rollup-plugin-babel"),
    commonjs = require("rollup-plugin-commonjs"),
    npm = require("rollup-plugin-npm"),
    lpb = require('list-bower-paths');

module.exports = {
    entry: "./src/XuiIconBlob.js",
    format: 'umd',
    dest: './build/bundle.js',
    moduleName: 'XuiIcons',
    plugins: [
        babel({
            exclude: "node_modules/**",
            presets: [
                "es2015-rollup",
                "react"],
            babelrc: false
        }),
        npm({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: "node_modules/**"
        })
    ]
};
