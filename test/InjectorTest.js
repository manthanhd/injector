var expect = require('expect');

describe("Injector", function () {
    // Setting timeout for potential slowness with timeouts.
    this.timeout(5000);

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
            testInjector.injectAndExecute(undefined, undefined);
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

        testInjector.injectAndExecute(testFunction);
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

        testInjector.injectAndExecute(testFunction, childScope);
    });

    it("throws ReferenceError when suitable injectable is not found for injection", function () {
        var Injector = require('../Injector');

        var testInjector = new Injector();

        var testFunction = function (name) {
        };

        try {
            testInjector.injectAndExecute(testFunction);
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

        testInjector.injectAndExecute(testFunction);
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

        testInjector.injectAndExecute(testFunction, childScope);
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

        testInjector.injectAndExecute(testFunction);
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

        testInjector.injectAndExecute(testFunction, childScope);
    });

    it("does nth degree factory injection in native mode with child scope", function(done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var getProfile = function (id) {
            return {id: id, name: "Manthan"};
        };

        var rootScope = new InjectorScope();
        rootScope.add(new Injectable("profile", getProfile, "factory"));

        var testInjector = new Injector(rootScope);
        Injector.enableNativeInjection(testInjector);

        var testFunction = function (profile) {
            expect(profile.name).toBe("Manthan");
            expect(profile.id).toBe(123);
            done();
        };

        var childScope = new InjectorScope();
        childScope.add(new Injectable("id", 123));

        testFunction.ix(childScope);
    });

    it("does nth degree factory injection in native mode without child scope", function(done) {
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
        Injector.enableNativeInjection(testInjector);

        var testFunction = function (profile) {
            expect(profile.name).toBe("Manthan");
            expect(profile.id).toBe(123);
            done();
        };

        testFunction.ix();
    });

    it("adds functions i() and ix() on enabling native mode", function() {
        var Injector = require('../Injector');

        var testInjector = new Injector();
        Injector.enableNativeInjection(testInjector);

        var testAnonFunction = function() {

        };

        function TestFunc() {

        }

        expect(testAnonFunction.i).toExist();
        expect(TestFunc.i).toExist();
        expect(testAnonFunction.ix).toExist();
        expect(TestFunc.ix).toExist();
    });

    it("caches value when factory caching is turned on", function(done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var testInjector = new Injector();

        testInjector.bind(Injectable.newVariable("name", "Manthan"));

        var getDate = function() {
            return new Date();
        };
        testInjector.bind(Injectable.newFactory("date", getDate).makeCacheable());

        Injector.enableNativeInjection(testInjector);

        var printName = function(date) {
            return date;
        };

        var date = printName.ix();

        return setTimeout(function() {
            var date2 = printName.ix();
            expect(date).toExist();
            expect(date2).toExist();
            expect(date).toBe(date2);
            done();
        }, 1200);
    });

    it("does not cache value when caching is turned off", function(done) {
        var Injector = require('../Injector');
        var InjectorScope = require('../InjectorScope');
        var Injectable = require('../Injectable');

        var testInjector = new Injector();

        testInjector.bind(Injectable.newVariable("name", "Manthan"));

        var getDate = function() {
            return new Date();
        };
        var myInjectable = Injectable.newFactory("date", getDate);
        testInjector.bind(myInjectable);

        Injector.enableNativeInjection(testInjector);

        var printName = function(date) {
            return date;
        };

        expect(myInjectable.isCacheable()).toBe(false);

        var date = printName.ix();

        return setTimeout(function() {
            var date2 = printName.ix();
            expect(date).toExist();
            expect(date2).toExist();
            expect(date).toNotBe(date2);
            done();
        }, 1200);
    });
});