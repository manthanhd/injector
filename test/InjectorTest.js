var expect = require('expect');

describe("Injector", function () {
    it("throws TypeError when initialScope variable isn't of type InjectorScope", function() {
        var Injector = require('../Injector');

        try{
            var testInjector = new Injector({});
        } catch (e) {
            return expect(e).toBeA(TypeError);
        }

        expect(true).toBe(false);
    });

    it("throws TypeError when childScope isn't of type InjectorScope", function() {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');

        var testInjector = new Injector();
        try {
            testInjector.inject(undefined, undefined);
        } catch (e) {
            return expect(e).toBeA(TypeError);
        }

        expect(true).toBe(false);
    });

    it("injects variable from initialScope", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var initialScope = new InjectorScope();
        initialScope.add(new Injectable("name", "Manthan"));
        var testInjector = new Injector(initialScope);

        var testFunction = function (name) {
            expect(name).toBe("Manthan");
            done();
        };

        testInjector.inject(testFunction);
    });

    it("injects variable from child scope", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var childScope = new InjectorScope();
        childScope.add(new Injectable("name", "Manthan"));

        var testInjector = new Injector();

        var testFunction = function (name) {
            expect(name).toBe("Manthan");
            done();
        };

        testInjector.inject(testFunction, childScope);
    });

    it("throws ReferenceError when suitable injectable is not found for injection", function () {
        var Injector = require('../Injector');

        var testInjector = new Injector();

        var testFunction = function (name) {
        };

        try {
            testInjector.inject(testFunction);
        } catch (e) {
            if (e instanceof ReferenceError) {
                return expect(e).toExist();
            }

            expect(true).toBe(false);
        }

        expect(true).toBe(false);
    });

    it("executes factory method from rootScope and injects the result", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var getName = function () {
            return "Manthan";
        };

        var rootScope = new InjectorScope();
        rootScope.add(new Injectable("name", getName, "factory"));

        var testInjector = new Injector(rootScope);

        var testFunction = function (name) {
            expect(name).toBe("Manthan");
            done();
        };

        testInjector.inject(testFunction);
    });

    it("executes factory method from childScope and injects the result", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var getName = function () {
            return "Manthan";
        };

        var childScope = new InjectorScope();
        childScope.add(new Injectable("name", getName, "factory"));

        var testInjector = new Injector();

        var testFunction = function (name) {
            expect(name).toBe("Manthan");
            done();
        };

        testInjector.inject(testFunction, childScope);
    });

    it("injects dependencies into factory method from rootScope and injects the result on invoking function dependent on the factory method.", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var getProfile = function (id) {
            return {id: id, name: "Manthan"};
        };

        var rootScope = new InjectorScope();
        rootScope.add(new Injectable("profile", getProfile, "factory"));
        rootScope.add(new Injectable("id", 123));

        var testInjector = new Injector(rootScope);

        var testFunction = function (profile) {
            expect(profile.name).toBe("Manthan");
            expect(profile.id).toBe(123);
            done();
        };

        testInjector.inject(testFunction);
    });

    it("injects dependencies from child scope into factory method from rootScope and injects the result on invoking function dependent on the factory method.", function (done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var getProfile = function (id) {
            return {id: id, name: "Manthan"};
        };

        var rootScope = new InjectorScope();
        rootScope.add(new Injectable("profile", getProfile, "factory"));

        var testInjector = new Injector(rootScope);

        var testFunction = function (profile) {
            expect(profile.name).toBe("Manthan");
            expect(profile.id).toBe(123);
            done();
        };

        var childScope = new InjectorScope();
        childScope.add(new Injectable("id", 123));

        testInjector.inject(testFunction, childScope);
    });
});