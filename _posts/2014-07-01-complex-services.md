---
layout: post
title: Testing complex services in both Angular and Node
---
Controllers are supposed to be small. The complex business logic goes in services, factories, or providers. So goes conventional Angular wisdom.According to Robert Martin's *Clean Code*, functions are supposed to be really small. In JavaScript, there is some tension between these two aims. Add in a requirement that services be fully *testable* and you've got a real dilemma.

Here's the problem. A service should interact with controllers through a thin API. From a controller's perspective, a service should be more or less a black box. *Within* that black box, the service should do what it needs to do using a myriad of different, typically small functions. By design, those small functions will not be exposed to the controller or to any other component of the application.

A typical design that fits this description (not Angular specific) might look like this:

```javascript
function someService(directory){
    this.directory = directory;
    this.getAllFilesFromDirectory();
    this.convertAllFilesToModules();
}

someService.prototype.getAllFilesFromDirectory = function(){
    files = someUtilityFunctionThatGetsFilesFromADirectory(dir);
    return files;
}

someService.prototype.convertAllFilesToModules = function(){
    var modules = [];
    files.forEach(function(file){
       modules.push(someUtilityFunctionThatTakesAFileAndReturnsAModule(file));
    });
}
```

The first question to ask is where the utility functions should go. And, obviously, there could be a whole bunch of them, not just two as in this example. The utility functions do most of the real work, and if we're being *clean* about it, each of them should be small and only do a little *bit* of work. Linking the functions together -- running them in a certain sequence, for example -- will yield the output that the overarching API should make available to consumers of the service.

*But*, I'd argue, for just that reason, the utility functions shouldn't be part of the API -- that is, they shouldn't go on someService's prototype. The only functions that should go on the prototype are high level functions that the service consumer will access (e.g. an Angular controller.)

So if we don't put them on the prototype, where do we define them? We could simply define them in the scope of the same file as the service, but outside the scope of the service itself. At the top or the bottom of the file, we could have a large list of functions:

```javascript
function someUtilityFunctionThatGetsFilesFromADirectory(dir){
    
}

function someOtherUtilityFunction(){
    
}

function anotherUtilityFunction(){
    
}
```
But this is extremely problematic as well. We're going to want to unit test each of those functions. We won't be able to do that unless we somehow make the functions accessible. The testing framework -- Jasmine, for example -- needs to access the functions in some way, but it won't be able to do that if it is stuck behind the same API as the service's regular consumers.

What's the solution? In Node, I used a closure like this one:

```javascript
"use strict";

var FromDirectoryProvider = (function(){

    //This allows us to keep the utility functions in a separate module, where they are testable, but still use them in the closure.
    var provider = require("./from-directory-utils");
    // getModulesFromDir is a utility function that is simply exported from from-directory.utils.js
    
    provider.fn = function(directory){
        var allModules, useFunctionNames;
        if(typeof directory == "string"){
            allModules = provider.getModulesFromDir(directory, true);
            useFunctionNames = true;
        } else if(typeof directory == "object"){
            if(!directory.dir) throw new Error("Property 'dir' is required.");
            directory.recursive = directory.recursive || true;
            directory.useFunctionNames = directory.useFunctionNames || true;
            allModules = provider.getModulesFromDir(directory.dir, directory.recursive);
        }

        provider.processModules(allModules, useFunctionNames);
    }

    return provider.fn;
})();

module.exports = FromDirectoryProvider;
```

The benefit to this approach is that the utility functions stay easily accessible within the closure, but are not accessible outside it. However, during testing, it is easy to load `from-directory-utils` and test every one of the functions on it.