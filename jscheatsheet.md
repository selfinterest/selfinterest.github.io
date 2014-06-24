---
layout: page
title: JavaScript study sheet
---
#### Inheritance
1.   Prototypal inheritance, not class based (though classes can be simulated.)
2.   Objects are created from constructor functions using the new keyword (and functions are themselves objects.)
3.   See [here](http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)
4.   Simplified picture of JavaScript inheritance:
        1.   A constructor function is created.
        ```javascript
            function Cat (name) {
                this.name = name;
            }

            Cat.__proto__ === Function.__proto;     //true
            Cat instanceof Cat;                                 //false
            Cat instanceof Function;                        //true
            Cat instanceof Object;                           //true
        ```
        2.  The constructor function is invoked with the `new` keyword.
        ```javascript
            var senea = new Cat("Senea");
            Cat.__proto__ === senea.__proto__;    //false
            Cat.prototype === senea.__proto__;   //true -- Cat.prototype and senea.__proto__ are the SAME OBJECT
            senea instanceof Cat;                           //true
            senea instanceof Function;                   //false
            senea instanceof Object;                      //true
        ```
        3.  The new object has a `__proto__` property. This property points to the prototype property of the immediate constructor.
        ```javascript
            Cat.prototype.noise = "meow!";            //notice that we can change the prototype after senea has been created
            console.log(senea.noise);                      //meow!
            console.log(senea.__proto__.noise);      //meow!
        ```
        4.  Properties of the object that were/are not properties of the constructor's prototype will NOT be found on `__proto__`
        ```javascript
            console.log(senea.name);                    //Senea
            typeof senea.__proto__.name;            //undefined
            typeof Cat.prototype.name;               //undefined
        ```
        5.  `__proto__` is an object, and hence has its own `__proto__` property. This points not to Cat's prototype, but to the prototype of the object from which Cat was constructed.
        ```javascript
            senea.__proto__.__proto__;                    //empty object {}
            senea.__proto__.__proto__.type = "animal";          //a Senea is a type of animal
            console.log(senea.type);                        //animal
            console.log(Cat.type);                            //animal
        ```
        6.  When a property look up is done on an object, and that object doesn't itself have the property, the search moves up the *prototype* chain until the property is found (and if it isn't found, undefined is returned.)
        ```javascript
            //Let's be more specific.
            Cat.prototype.type = "cat";
            console.log(Cat.type);                            //still animal, but...
            console.log(senea.type);                        //cat! we defined "type" on the Cat.prototype, so that was found first.
            senea.type = "SeneaBeast";
            console.log(senea.type);                        //SeneaBeast. Now the property is found immediately. No need to go up.
            //Note: this is not how you would normally do things; it's just a cool demonstration.
        ```
        7.  Aside from prototype and __proto__, every object keeps a reference to its actual constructor function in its constructor property.
        ```javascript
            senea.constructor;                                    //Cat
            senea.constructor.prototype.class  = "feline";
            senea.class;                                              //feline
        ```
        8.  We can, therefore, do something more like inheritance in class based languages.
        ```javascript
            function Kitten(name, age) {
                 this.age = age;
                 Kitten._super.call(this, name, age);    //Call the super constructor, i.e. Cat
            }
            Kitten.prototype = senea;                       //We set the prototype to a created object
            Kitten._super = senea.constructor;         //We set a reference to Senea's constructor function
            var amala = new Kitten("Amala", 2);
            console.log(amala.name);                        //Amala
            console.log(amala.age);                           //2
            console.log(amala.class);                         //feline -- yes, these properties, too
            console.log(amala.type);                          //animal -- NOT SeneaBeast
            //And, last but not least...
            console.log(amala.noise);                        //meow!
        ```
        9.  But wouldn't age also be relevant to cats as well as kittens? Sure. Let's do this.
        ```javascript
            Cat.prototype.age = "unknown";
            console.log(senea.age);                            //unknown
            console.log(amala.age);                            //2
            Cat.prototype.sayAge = function(){
                console.log("My name is " + this.name + " and my age is " + this.age + ". " + this.noise);
            }
            senea.sayAge();                                         //"My name is Senea and my age is unknown. Meow!"
            amala.sayAge();                                         //"My name is Amala and my age is 2. Meow!"
        10. Make all cats bark
        ```javascript
            Cat.prototype.noise = "bark!";
            senea.age = 4;
            senea.sayAge();                                         //"My name is Senea and my age is 4. Bark!"
            amala.sayAge();                                         //"My name is Amala and my age is 2. Bark!"
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
 ```