module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
  env: {
    test: {
      presets: [
        ["@babel/env", {"modules": false}],
      ],
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "syntax-dynamic-import",
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}