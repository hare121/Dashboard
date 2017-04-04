var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'components/home.html',
      controller: 'homeController'
    })

    .when('/about', {
      templateUrl: 'components/about.html'
    })
}])

myApp.controller('homeController', ['$scope', '$http', 'dataService', function($scope, $http, dataService) {

  $scope.data = [];
  $scope.columnHead = [];

  dataService.getData().success(function(result) {
    console.log(result);
    $scope.data = result;

    Object.keys($scope.data[0]).map(function(key) {
      $scope.columnHead.push(key);
    })

    console.log($scope.columnHead);
  })

}])

myApp.service('dataService', ['$http', function($http){
  // Returns a promise
  this.getData = function(){
    return $http.get('/data');
  }
}])
