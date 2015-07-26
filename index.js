var xModule = require('./lib/x-module.js');

var fs = require('fs');
var path = require('path');

/**
 * 遍历目录树的文件
 *
 * walkPath: 目录绝对路径
 * iter: 迭代器 function(file, filePath) {}, file:文件名, filePath:文件绝对路径
 */
var walk = function(walkPath, iter) {
    var files = fs.readdirSync(walkPath);
    files.forEach(function(file) {
        var newPath = path.join(walkPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            iter(file, newPath);
        } else if (stat.isDirectory()) {
            walk(newPath, iter);
        }
    });
};

/**
 * 加载目录中的所有文件
 * @param  {String} path       绝对路径
 */
xModule.loadDir = function(path) {
    global.xModule = xModule;
    walk(path, function(file, filePath) {
        require(filePath);
    });
};

module.exports = xModule;
