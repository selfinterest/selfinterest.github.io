---
layout: page
title: JavaScript study sheet
---
#### Inheritance
1.   Prototypical inheritance, not class based (though classes can be simulated.)
2.   Objects are created from constructor functions using the new keyword (and functions are themselves objects.)
3.   The difference between __proto__ and prototype:
       *  `__proto__` is the actual object used in the lookup chain to resolve methods, etc.
       * “prototype” is the object used to build `__proto__` when an object is constructed with new.
       * Prototype is the property of the constructor function from which `__proto__` is created.
       * Which is to say: if a.someFunction === a.`__proto__`.makeNoise, when aConstructor.prototype.someFunction

             ##### Example:
                 
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

             ##### Example 2 -- making cats bark:
                   
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

