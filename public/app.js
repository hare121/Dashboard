/*
Date: April 3, 2017
Author: Akshay Arora
*/

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
              templateUrl: 'components/home.html',
              controller: 'homeController'
          })

      .when('/login', {
              templateUrl: 'components/login.html',
              controller: 'homeController'
          })

      .when('/reports', {
          templateUrl: 'components/report.html',
          controller: 'reportsController'
      })

      .when('/triggers', {
          templateUrl: 'components/triggers.html',
          controller: 'triggersController'
      })

      .when('/about', {
          templateUrl: 'components/about.html'
      })
}])



myApp.controller('popUpController', ['$rootScope', '$scope', '$uibModalInstance', function($rootScope, $scope, $uibModalInstance) {
  // $scope.columnHead = "abc";
    // Modal
    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


}])

myApp.controller('triggersController', ['$rootScope', '$scope', function($rootScope, $scope) {

  $scope.runTrigger = function() {
    dataService.runTrigger().success(function(response) {
      // success
    })
  }

}])

myApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
