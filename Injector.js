function Injector(initialScope) {
    var Injectable = require('./Injectable');
    var InjectorScope = require('./InjectorScope');

    if (initialScope && !(initialScope instanceof InjectorScope)) {
        throw new TypeError("initialScope must be of type InjectorScope.");
    }

    var rootScope = initialScope || new InjectorScope();
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var getParamNames = function (fn) {
        var fnStr = fn.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    };

    this.injectAndExecute = function (fn, scope) {
        if (scope && !(scope instanceof InjectorScope)) {
            throw new TypeError("scope must be of type InjectorScope.");
        }

        var fnParams = getParamNames(fn);
        var fnParamsLen = fnParams.length;
        var injectables = [];
        for (var i = 0; i < fnParamsLen; i++) {
            var param = fnParams[i];
            var injectable = (scope) ? scope.get(param) : undefined;
            if (!injectable) {
                injectable = rootScope.get(param);
                if (!injectable) {
                    throw new ReferenceError("Injection failed for injectable param " + param + ". Could not find a suitable object or factory to inject.");
                }
            }

            if (injectable.isFactory()) {
                injectable = this.injectAndExecute(injectable.getValue(), scope);
                injectables.push(injectable);
                continue;
            }

            injectables.push(injectable.getValue());
        }

        return fn.apply(fn, injectables);
    };

    this.inject = function(fn, scope) {
        var self = this;
        return function() {
            self.injectAndExecute(fn, scope);
        }
    };

    this.bind = function(injectable) {
        return rootScope.add(injectable);
    };

    return this;
}

module.exports = Injector;