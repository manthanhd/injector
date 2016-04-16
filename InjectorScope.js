function InjectorScope() {
    var Injectable = require('./Injectable');

    this.injectees = {};

    this.get = function (name) {
        return this.injectees[name];
    };

    this.add = function (injectable) {
        if (!(injectable instanceof Injectable)) {
            throw new TypeError("injectable is not of type Injectable.");
        }

        this.injectees[injectable.getName()] = injectable;
    };

    return this;
}

module.exports = InjectorScope;