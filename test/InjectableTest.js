var expect = require('expect');

describe("Injectable", function () {
    it("assigns given valid type", function () {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", "Manthan", "variable");
        expect(testInjectable.isVariable()).toBe(true);
        expect(testInjectable.isFactory()).toBe(false);
    });

    it("defaults type to variable if invalid type is assigned", function () {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", "Manthan", "asf jhashf");
        expect(testInjectable.isVariable()).toBe(true);
        expect(testInjectable.isFactory()).toBe(false);
    });

    it("gives type as factory when type is explicitly assigned as factory", function () {
        var Injectable = require("../Injectable");

        var testInjectable = new Injectable("name", function(){}, "factory");
        expect(testInjectable.isVariable()).toBe(false);
        expect(testInjectable.isFactory()).toBe(true);
    });

    it("creates new factory injectable on newFactory", function () {
        var Injectable = require("../Injectable");

        var testInjectable = Injectable.newFactory("name", function () {
        });
        expect(testInjectable.isFactory()).toBe(true);
    });

    it("throws TypeError when value is not a function for a factory injectable", function () {
        var Injectable = require("../Injectable");

        try {
            var testInjectable = Injectable.newFactory("name", "not a function");
        } catch (e) {
            return expect(e).toBeA(TypeError);
        }

        expect(false).toBe(true);
    });

    it("creates new variable injectable on newVariable", function () {
        var Injectable = require("../Injectable");

        var testInjectable = Injectable.newVariable("name", "Manthan");
        expect(testInjectable.isVariable()).toBe(true);
    });

    it("turns on caching when calling makeCacheable", function() {
        var Injectable = require("../Injectable");

        var testInjectable = Injectable.newVariable("name", "Manthan").makeCacheable();
        expect(testInjectable.isCacheable()).toBe(true);
    });

    it("has caching off by default", function() {
        var Injectable = require("../Injectable");

        var testInjectable = Injectable.newVariable("name", "Manthan");
        expect(testInjectable.isCacheable()).toBe(false);
    })
});