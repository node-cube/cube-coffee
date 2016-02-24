/*!
 * cube-coffee: index.js
 * Authors  : 剪巽 <jianxun.zxl@taobao.com> (https://github.com/fishbar)
 * Create   : 2015-11-04 20:50:48
 * CopyRight 2015 (c) Alibaba Group
 */
var path = require('path');
var coffee = require('coffee-script');
coffee.register();
/**
 * Class JsProcessor
 * @param {Object}   cube     the cube instance
 */
function CoffeeProcessor(cube) {
  this.cube = cube;
}

CoffeeProcessor.type = 'script';
CoffeeProcessor.ext = '.coffee';

CoffeeProcessor.prototype.process = function (data, callback) {
  var config = this.cube.config;
  var code = data.code;
  var file = data.realPath;
  try {
    data.code = coffee.compile(code, {
      generatedFile: path.basename(file),
      header: true,
      shiftLine: true,
      sourceRoot: '',
      sourceFiles: [path.basename(file) + '?m'],
      sourceMap: config.sourceMap
    });
  } catch (e) {
    return callback(e);
  }
  callback(null, data);
};

module.exports = CoffeeProcessor;
