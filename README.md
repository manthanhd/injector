# injector
Dependency injection for JavaScript.

## Introduction
Working across multiple stacks, I've found dependency injection a blessing in strongly typed languages like Java. This module provides just that. A simple and clean dependency framework for people to use with JavaScript.
There are basic two things to injection. The **where** and the **how**. Where specifies what function to do the injection in and **how** specifies how to inject something in. As of now, the library supports two kinds of injections. Injection using a static variable and injection using a factory function. Using a static variable, the framework will inject the value of required variable straightaway. However, when using factory functions, injection will resolve the factory function and its dependencies first, execute the factory function and then inject the return value from that factory function. The framework takes care of this out of the box so you don't have to worry.

## Usage
### Install and setup
Setup is quick and simple. To install the module in your project, do:
```shell
npm install
```

Once installed, three function definitions will have to be imported.
```javascript
var Injector = require("injector").Injector;
var Injectable = require("injector").Injectable;
var InjectorScope = require("injector").InjectorScope;
```

### Variables and Scopes
In order to use the injector, you'll have to provide it with some injectables. An injectable is an object that tells the framework how something can be injected. To bind a variable, you'll need to create a injectable first. Injectable defines what it is that you are asking the framework to inject.
```javascript
var myInjectable = Injectable.newVariable("name", "Manthan");
```

Once you have an injectable, create the injector instance.
```javascript
var myInjector = new Injector();
```

And then bind the injectable to the injector.
```javascript
myInjector.bind(myInjectable);
```

You can also bind injectables to a InjectorScope instance which you can then pass into an injector as it's initial scope.
```javascript
var myScope = new InjectorScope();
myScope.add(myInjectable);
myInjector = new Injector(myScope);
```

At any given time, an injector has at most two scopes. One is the scope that it has when it is first created. This is the root scope of the injector. The second scope is optional and can be passed in as part of the `inject` or `injectAndExecute` functions on the injector itself. This second scope overrides values from the first scope. This means that if secondScope has `{name: "Dave"}` and the root scope has `{name: "Manthan"}`, upon injection name will be injected as `Dave`.

### Using injection
Injector will need a function to inject its injectables in. This can be done in two ways. One is to use the normal inject where it will inject the variables and return a prepared function. A prepared function is a function that already has everything injected in and is ready to be executed.
```javascript
var printName = function(name) {
    console.log("Hello %s!", name);
};

var injectedPrintName = myInjector.inject(printName);
injectedPrintName();
```

Here `injectedPrintName()` is a prepared function.

Another way is to let injector execute the function for you. This can be done like so:
```javascript
myInjector.injectAndExecute(printName);
```

You can also pass in a child scope while calling `inject` or `injectAndExecute` function(s). This for those special cases where something that you're trying to inject isn't constant across all things and you want to override something just this once. Values in root scope are never overwritten. They are simply less prefered when a child scope is provided.
```javascript
var childScope = new InjectorScope();
childScope.add(new Injectable("name", "Dave"));
myInjector.injectAndExecute(printName, childScope);
```
