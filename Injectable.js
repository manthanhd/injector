function Injectable(name, val, type) {
    var TYPE_VAR = 'var';
    var TYPE_FACTORY = 'factory';

    var injectable = {name: name, val: val, caching: false, cacheValue: undefined};

    if (type) {
        injectable.type = (type === TYPE_VAR || type === TYPE_FACTORY) ? type : TYPE_VAR;
    } else {
        injectable.type = TYPE_VAR;
    }

    if(injectable.type === TYPE_FACTORY) {
        if(typeof val !== 'function') {
            throw new TypeError("Value for factory injectable must be a function");
        }
    }

    this.isVariable = function () {
        return (injectable.type === TYPE_VAR)
    };

    this.isFactory = function () {
        return (injectable.type === TYPE_FACTORY)
    };

    this.isCacheable = function() {
        return injectable.caching || false;
    };

    this.getName = function () {
        return injectable.name;
    };

    this.getValue = function () {
        return injectable.val;
    };

    this.getCacheValue = function() {
        return injectable.cacheValue;
    };

    this.setCacheValue = function(value) {
        injectable.cacheValue = value;
    };

    this.makeCacheable = function() {
        injectable.caching = true;
        return this;
    };

    return this;
}

Injectable.newVariable = function(name, val) {
    return new Injectable(name, val);
};

Injectable.newFactory = function(name, val) {
    return new Injectable(name, val, "factory");
};

module.exports = Injectable;