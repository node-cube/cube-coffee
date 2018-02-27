/*!
 * cube-coffee: index.js
 */
var path = require('path');
var coffee = require('coffeescript');
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
