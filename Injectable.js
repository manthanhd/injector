function Injectable(name, val, type) {
    var TYPE_VAR = 'var';
    var TYPE_FACTORY = 'factory';

    var injectable = {name: name, val: val};

    if (type) {
        injectable.type = (type === TYPE_VAR || type === TYPE_FACTORY) ? type : TYPE_VAR;
    } else {
        injectable.type = TYPE_VAR;
    }

    this.isVariable = function () {
        return (injectable.type === TYPE_VAR)
    };

    this.isFactory = function () {
        return (injectable.type === TYPE_FACTORY)
    };

    this.getName = function () {
        return injectable.name;
    };

    this.getValue = function () {
        return injectable.val;
    };

    return this;
}

module.exports = Injectable;