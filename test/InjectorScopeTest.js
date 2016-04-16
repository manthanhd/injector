var expect = require("expect");

describe("InjectorScope", function () {
    it("throws TypeError when injectable that is being added isn't of type Injectable", function () {
        var InjectorScope = require('../InjectorScope');

        var testInjectorScope = new InjectorScope();

        try {
            testInjectorScope.add({});
        } catch (e) {
            return expect(e).toBeA(TypeError);
        }

        expect(true).toBe(false);
    });

    it("gets an injectable", function() {
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var testScope = new InjectorScope();
        var testInjectable = new Injectable("name", "manthan");
        testScope.add(testInjectable);

        var actualInjectable = testScope.get("name");
        expect(actualInjectable.getValue()).toBe("manthan");
        expect(actualInjectable.isVariable()).toBe(true);
    });
});