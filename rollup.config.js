let babel = require("rollup-plugin-babel"),
    commonjs = require("rollup-plugin-commonjs"),
    npm = require("rollup-plugin-npm");

module.exports = {
    entry: "./src/XUIIconBlob.js",
    format: 'umd',
    dest: './build/bundle.js',
    moduleName: 'XUIIconBlob',
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
