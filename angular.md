---
layout: page
title: Angular study sheet
---
#### Difference between factory, service, and provider
[Plunkr](http://plnkr.co/bhq1ilgHUygLe5rcftBi)

See [also.](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/)

An Angular factory can return any time. Whatever is returned is what is used when the factory is injected. Hence, you can easily use a JavaScript constructor function, and instantiate new copies within controllers or other services.
 ```javascript
    angular.module("TestApp").factory([function(){
        var Cat = function(name){
             this.name = name;
        }

        Cat.prototype.noise = "meow!";

        return Cat;
    }])
    .controller(["Cat", "$scope", function(Cat, $scope){
        var senea = new Cat("Senea");

    }])
 ```
With a service, you directly attach properties and methods to "this". It is as if the entire service were within a constructor function, which is returned with the new keyword when the service is injected.
 ```javascript
    angular.module("TestApp").service([function(){
        this.noise = "bark!";
    }])
 ```