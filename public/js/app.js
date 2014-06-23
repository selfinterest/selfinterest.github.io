angular.module("TerrenceWatson", ["ui.router"])
    .config(["$locationProvider", "$stateProvider", "$urlRouterProvider",  function($locationProvider, $stateProvider, $urlRouterProvider){
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise("/blog");
        $stateProvider
            .state("index", {
                url: "",
                templateUrl: "/public/templates/index.html",
                controller: "IndexCtrl",
                resolve: {
                    "posts": ["$http", "$rootScope", "$q", function($http, $rootScope, $q){
                        var deferred = $q.defer();
                        $http.get("/posts.json").success(function(data){
<<<<<<< HEAD
                            $rootScope.data = data[0];
                            deferred.resolve(data[0].posts);
=======
                            $rootScope.posts = data;
                            deferred.resolve(data);
>>>>>>> parent of 05f91bb... About to change template
                        });
                        return deferred.promise;
                    }]
                }
            })
    }])
    .controller("AppCtrl", ["$scope", "$http", function($scope, $http){
        
    }])
<<<<<<< HEAD
    .controller("IndexCtrl", ["$scope", "posts", function($scope, posts){
        console.log(posts);
        $scope.posts = posts;
=======
    .controller("IndexCtrl", ["$scope", function($scope){
        
>>>>>>> parent of 05f91bb... About to change template
    }])