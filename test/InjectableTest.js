var expect = require('expect');

describe("Injectable", function() {
    it("assigns given valid type", function() {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", "Manthan", "variable");
        expect(testInjectable.isVariable()).toBe(true);
        expect(testInjectable.isFactory()).toBe(false);
    });

    it("defaults type to variable if invalid type is assigned", function() {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", "Manthan", "asf jhashf");
        expect(testInjectable.isVariable()).toBe(true);
        expect(testInjectable.isFactory()).toBe(false);
    });

    it("gives type as factory when type is explicitly assigned as factory", function() {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", "Manthan", "factory");
        expect(testInjectable.isVariable()).toBe(false);
        expect(testInjectable.isFactory()).toBe(true);
    })
});