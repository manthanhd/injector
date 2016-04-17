function InjectorScope() {
    var Injectable = require('./Injectable');

    var injectees = {};

    this.get = function (name) {
        return injectees[name];
    };

    this.add = function (injectable) {
        if (!(injectable instanceof Injectable)) {
            throw new TypeError("injectable is not of type Injectable.");
        }

        injectees[injectable.getName()] = injectable;
    };

    return this;
}

module.exports = InjectorScope;