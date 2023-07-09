"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var esbuild_1 = __importDefault(require("esbuild"));
var options = {
    entryPoints: ['./lib/index.ts'],
    outfile: './test/index.js',
    bundle: true,
    minify: false,
    sourcemap: true,
    target: 'esnext',
    format: 'esm'
};
esbuild_1["default"].build(options)["catch"](function (err) {
    console.error(err);
});
