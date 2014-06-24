---
layout: page
title: Angular study sheet
---
#### Difference between factory, service, and provider
[Plunkr](http://plnkr.co/IKiVOU)

See [also.](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/)

An Angular factory can return any type (Function, Number, String.) Whatever is returned is what is used when the factory is injected. Hence, you can easily use a JavaScript constructor function, and instantiate new copies within controllers or other services.

 ```javascript
var app = angular.module("TestApp", []);
app.factory("Cat", [function(){
  function Cat(name){
    this.name = name;
  }
  Cat.prototype.noise = "meow!";
  return Cat;
}])
 ```

With a service, you directly attach properties and methods to "this". It is as if the entire service were within a constructor function, which is returned with the new keyword when the service is injected.
 
 ```javascript
app.service("CatService", [function(){
  this.name = "Unknown";
  this.noise = "meow!";
}])
 ```

A provider is much like a factory, in that it can return any time. But unlike a factory, it can be configured in the config stage, before the app officially launches, given default values, etc.

```javascript
app.provider("kitten", [function(){
  var defaultOwner = "Terrence";   //default owner of the kittens
  var defaultName = "Herbie";      //default name of all the kittens
  var defaultAge = 1;
  
  this.setDefaultOwner = function(newOwner){
    defaultOwner = newOwner;
  }
  
  this.setDefaultName = function(newName){
    defaultName = newName;
  }
  
  this.setDefaultAge = function(newAge){
    defaultAge = newAge;
  }
  
  function Kitten(name, age, owner){
    Kitten._super.call(this, name, age, owner);    //call the superconstructor
    this.name = name || defaultName;
    this.age = age || defaultAge;
    this.owner = owner || defaultOwner;
  }
  
  this.$get = ["CatService", function(CatService){
    //Let's make Kitten inherit from Cat!
    Kitten.prototype = CatService;
    Kitten._super = CatService.constructor;         //now the Kitten constructor has a reference to the cat superconstructor

    return Kitten;
  }];
}])
```