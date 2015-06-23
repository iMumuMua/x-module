(function() {

    'use strict';

    /**
     * 模块类的构造函数
     * @param  {String} name 模块名
     * @param  {Array} deps 依赖的模块名
     * @param  {Function} def  模块定义
     */
    var Mod = function(name, deps, def) {
        if (typeof name !== 'string') {
            throw new Error('Module name should be a string.');
        }
        if (!(deps instanceof Array)) {
            throw new Error('Module dependencies should be an array.');
        }
        for (var i = 0, len = deps.length; i < len; i++) {
            if (typeof deps[i] !== 'string') {
                throw new Error('Module dependency should be a string.');
            }
        }
        if (typeof def !== 'function') {
            throw new Error('Module definition should be a function.');
        }

        this.name = name;
        this.deps = deps;
        this.def = def;
        this.deferred = Promise.defer();
    };

    /**
     * 发布一个模块
     * @param  {Any} mod 对外输出的模块，可以是对象、字符串、数字等
     */
    Mod.prototype.pub = function(mod) {
        this.mod = mod;
        this.deferred.resolve(this.mod);
    };

    /**
     * 执行一个模块
     * @param  {Array} deps     依赖的模块
     * @return {Promise}
     */
    Mod.prototype.run = function(deps) {
        try {
            this.def.apply(this, deps);
        } catch (e) {
            this.deferred.reject(e);
        } finally {
            return this.deferred.promise;
        }
    };


    var xModule = {
        mods: []
    };

    /**
     * 获取模块，如果不存在，则返回false
     * @param  {String}  name 模块名
     * @return {Boolean}      如果存在返回模块对象，不存在返回false
     */
    xModule.get = function(name) {
        for (var i = 0, len = this.mods.length; i < len; i++) {
            if (name === this.mods[i].name) {
                return this.mods[i];
            }
        }
        return false;
    };

    /**
     * 定义一个模块
     * @param  {String} name 模块名
     * @param  {Array} deps 依赖的模块名
     * @param  {Function} def  模块定义
     */
    xModule.def = function(name, deps, def) {
        var mod = this.get(name);
        if (mod) {
            throw new Error('The module "' + name + '" is already exists.');
        }
        this.mods.push(new Mod(name, deps, def));
    };

    /**
     * 执行依赖模块
     * @param  {Array} deps     依赖模块名
     * @return {Promise}
     */
    xModule._runDeps = function(deps) {
        var deferred = Promise.defer();
        var len = deps.length;
        var receiveMods = new Array(len);
        var receiveCount = 0;
        for (var i = 0; i < len; i++) {
            (function(i) {
                xModule._run(deps[i]).then(function(mod) {
                    receiveMods[i] = mod;
                    receiveCount += 1;
                    if (receiveCount === len) {
                        deferred.resolve(receiveMods);
                    }
                }).then(null, deferred.reject);
            })(i);
        }
        return deferred.promise;
    };

    /**
     * 执行模块
     * @param  {String} name     模块名
     * @return {Promise}
     */
    xModule._run = function(name) {
        var mod = xModule.get(name);
        if (mod.deps.length > 0) {
            return xModule._runDeps(mod.deps).then(function(mods) {
                return mod.run(mods);
            });
        }
        else {
            return mod.run([]);
        }
    };


    /**
     * 执行一个模块
     * @param  {String} name    模块名
     * @return {Promise}
     */
    xModule.run = function(name) {
        return xModule._run(name);
    };


    if (typeof exports === "object" && typeof module === "object") {
        module.exports = xModule;
    }
    else if (typeof define === "function" && define.amd) {
        define(function() {
            return xModule;
        });
    }
    else {
        this.xModule = xModule;
    }

})();
