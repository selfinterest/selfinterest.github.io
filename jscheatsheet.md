---
layout: page
title: JavaScript study sheet
---
#### Inheritance
1.   Prototypical inheritance, not class based (though classes can be simulated.)
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
1.  JavaScript is a function-scope language.    
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