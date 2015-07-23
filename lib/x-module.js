(function() {

    'use strict';

    var xModule = {};
    var modules = [];

    xModule.def = function(name, deps, fn) {
        var _deps, _fn;
        if (typeof deps === 'function') {
            _fn = deps;
        }
        else {
            _deps = deps;
            _fn = fn;
        }

        modules.push({
            name: name,
            deps: _deps ? _deps : [],
            fn: _fn
        });
    };

    xModule.run = function(name, callback) {
        var mods = [];
        callback(runMod(name, mods));
    };

    function getMod(name, mods) {
        for (var i = 0, len = mods.length; i < len; i++) {
            if (name === mods[i].name) {
                return mods[i];
            }
        }
    }

    function runMod(name, mods) {
        var mod = getMod(name, mods);
        if (!mod) {
            mod = getMod(name, modules);
            mods.push(mod);
        }

        if (!mod.done) {
            var deps = [];
            for (var i = 0, len = mod.deps.length; i < len; i++) {
                deps.push(runMod(mod.deps[i], mods));
            }
            mod.done = mod.fn.apply(null, deps);
        }

        return mod.done;
    }

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
