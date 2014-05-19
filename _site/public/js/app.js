angular.module("TerrenceWatson", ["ui.router"])
    .config(["$locationProvider", "$stateProvider", "$urlRouterProvider",  function($locationProvider, $stateProvider, $urlRouterProvider){
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise("/blog");
        $stateProvider
            .state("index", {
                url: "",
                templateUrl: "index.html",
                controller: "IndexCtrl",
                resolve: {
                    "posts": ["$http", "$rootScope", "$q", function($http, $rootScope, $q){
                        var deferred = $q.defer();
                        $http.get("/posts.json").success(function(data){
                            $rootScope.posts = data;
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }]
                }
            })
    }])
    .controller("AppCtrl", ["$scope", "$http", function($scope, $http){
        
    }])
    .controller("BodyCtrl", ["$scope", function($scope){
        
    }])