---
layout: page
title: JavaScript study sheet
---
#### Inheritance
1.   Prototypal inheritance, not class based (though classes can be simulated.)
2.   Objects are created from constructor functions using the new keyword (and functions are themselves objects.)
3.   The difference between `__proto__` and prototype:
       *  `__proto__` is the actual object used in the lookup chain to resolve methods, etc.
       * “prototype” is the object used to build `__proto__` when an object is constructed with new.
       * Prototype is the property of the constructor function from which `__proto__` is created.
       * Which is to say: if a.someFunction === a.`__proto__`.makeNoise, when aConstructor.prototype.someFunction
4. See [here](http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

##### Example:
                 
 ```javascript
 function Cat(name) {
      this.name = name;
      this.noise = "meow!"
 }
  Cat.prototype.makeNoise = function () {
       console.log(this.name + " says " + this.noise );
  }
 var senea = new Cat('Senea');
 senea.makeNoise();   // Senea says meow!
 senea.makeNoise === senea.__proto__.makeNoise;  //is true
 Cat.prototype.makeNoise === senea.makeNoise; //also true

 function Dog(name) {
      this.name = name;
      this.noise = "bark!";
 }

 var kacy = new Dog("Kacy");
 kacy.makeNoise = function(){
     console.log(this.name + " says " + this.noise);
 }

 kacy.makeNoise();  // Kacy says bark!
 kacy.makeNoise === kacy.__proto__.makeNoise; //is false, because makeNoise is not part of Dog's prototype
 console.log(typeof kacy.__proto__.makeNoise); //should be undefined
 ```

##### Example 2 -- making cats bark:

 ```javascript
function Cat(name) {
   this.name = name;
}

Cat.prototype.noise = "meow!";

Cat.prototype.makeNoise = function() {
   console.log(this.name + " says " + this.noise);
}

var senea = new Cat('Senea');
senea.makeNoise();  //Senea says meow!

function Dog(name) {
   this.name = name; 
}

Dog.prototype.noise = "bark!";

Dog.prototype.makeNoise = Cat.prototype.makeNoise;

var kacy = new Dog('Kacy');
kacy.makeNoise();  //Kacy says bark!

//Now make Senea bark
senea.__proto__ = kacy.__proto__;
senea.makeNoise();  //Senea says bark!

var amala = new Cat('Amala');
amala.makeNoise();  //Amala says meow!

//Make all cats bark
Cat.prototype.noise = "bark!";
amala.makeNoise();  //Amala says bark!

var herbie = new Cat('Herbie');
herbie.makeNoise();  //Herbie says bark!
 ```

#### Variable hoisting/scope
1.  JavaScript has [function-level scope](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html).
    ##### Example  
 ```javascript
    var name = "Terrence";
    function area(length, width) {
        console.log(name);
        return length * width;
    }

    area(2, 2); //prints Terrence

    function area2(length, width) {
        var name = "Heather";
        console.log(name);
        return length * width;   
    }
     
    area2(2, 2); //prints Heather
    console.log(name); //prints Terrence
    
    var name = "Terrence";
    if(true) {
       var name = "Heather";
    }

    console.log(name);  //prints Heather
 ```
2.  Variable and function declarations are silently moved to the top of the scope.   
    ##### Example   
 ```javascript
    function area(length, width) {
        if(length > 2) {
            var name;  //the declaration is moved to the top of the function; note that an assignment, e.g. name = "Heather" would not be!
        }
        name = "Heather";
        console.log(name);  //Heather
    }
    var name = "Terrence";
    area(2, 2); //prints Heather. No error is raised.
    console.log(name); //prints Terrence. The assignment in area was NOT global because the declaration was moved out of the conditional.
 ```

#### That tricky this.
1. In general, the value of "this" is the current scope of execution.
2. *HOW* a function is invoked determines the value of "this". Crockford sets out four function invocation patterns for JavaScript:
    1. **Method** -- function stored as property of an object
    2. **Function** -- function not stored, invoked directly.
    3. **Constructor** -- function is invoked with "new".
    4. **Apply/call** -- function is invoked with apply or call.

    ##### Example
 ```javascript
    function Cat(name) {
        this.name = name;
    }

    //Function invocation pattern
    var cat = Cat("Senea");
    console.log(this.name); //prints Senea -- oops, in Cat, "this" was bound to global scope!
    
    delete this.name;   //remove the errant property. this.name is now undefined.

    var senea = new Cat("Senea");    //constructor invocation
    console.log(this.name);     //is undefined.
    console.log(senea.name);      //Senea

    senea.makeNoise = function() {
        console.log(this.name + " says meow!");
    }

    senea.makeNoise();            //Senea says meow. "this" is bound to the senea object.

    //Apply/call
    var amala = new Cat("Amala");
    amala.makeNoise = function() {
        console.log(this.name + " says meow!");
    }

    amala.makeNoise();     //Amala says meow. "this" is bound to the amala object.
    amala.makeNoise.apply(senea);  //Senea says meow. "this" is bound to the senea object.
 ```
3. This can cause problems when a function is executed inside another function. A value assigned to a property of "this" outside the inner function will not be accessible inside that function.
    ##### Example
 ```javascript

    //Note, this is a stupid example. There are many better ways of doing this. It's just to demonstrate.

    function purr(){
        console.log(this.name + " purrs!");
    }

    function Cat(name, action) {
        this.name = name;
        action();
    }
    
    var senea = new Cat("Senea", purr); // prints "undefined purrs";

    function Cat(name, action) {
        this.name = name;
        this.action = action;
        this.action();
    }

    var senea = new Cat("Senea", purr); // prints "Senea purrs!" -- because of method invocation.

    //However ...

    function Cat(name) {
        this.name = name;
    }

    Cat.prototype.doTheThing = function(aThing){
        console.log(this.name + " is doing: " +aThing());
    }
    
    var senea = new Cat("Senea");

    senea.doTheThing(function(){
        return "counting the letters in her name: " + this.name;
    });  // prints "Senea is doing: counting the letters in her name: undefined"

    senea.doTheThing(function(){
        return "counting the letters in her name: " + this.name;
    }.bind(senea)); //prints "Senea is doing: counting the letters in her name: senea"
 ```

#### Strict mode
1. "use strict";
2. Converts mistakes into errors. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode).
3. No more accidental globals. All variables must be declared with `var`.
4. Improper assignments no longer silently fail, as do improper deletions (i.e. you can't delete Object.prototype).
5. Functions must be declared at the top of functions or scripts.
    ##### Example (illegal in strict mode)
 ```javascript
    if(true) {
        function Cat(name) {
            this.name = name;
        }
    }