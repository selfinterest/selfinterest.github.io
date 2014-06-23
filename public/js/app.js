angular.module("TerrenceWatson", ["ui.router"])
    .config(["$interpolateProvider", function($interpolateProvider){
        //Override the interpolate symbols because Jekyll uses {{ }} fot its own interpolation.
        $interpolateProvider.startSymbol("//");
        $interpolateProvider.endSymbol("//");
    }])
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
                            $rootScope.data = data[0];
                            deferred.resolve(data[0].posts);
                        });
                        return deferred.promise;
                    }]
                }
            })
    }])
    .controller("AppCtrl", ["$scope", "$http", function($scope, $http){
        
    }])
    .controller("IndexCtrl", ["$scope", "posts", function($scope, posts){
        console.log(posts);
        $scope.posts = posts;
    }])