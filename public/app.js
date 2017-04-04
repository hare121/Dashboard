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

myApp.controller('mainController', ['$scope', '$http', 'dataService', function($scope, $http, dataService) {

  $scope.city; // User entered search query
  $scope.data = []; // Sorted forecast data
  $scope.days = []; // Stores the forecast days for tabs

  $scope.search = function() {
    dataService.getWeather($scope.city)
      .success(function(result) {

        // Iterate the list array in result
        result.list.forEach(function(item, index) {

          // Temp obj to save the desired data from list array
          var obj = {
            date: new Date(item.dt_txt).toUTCString(),
            min_temp: item.main.temp_min,
            max_temp: item.main.temp_max,
            humidity: item.main.humidity
          };
          $scope.data.push(obj);

          $scope.flag = true; // Flag variable to store unique values in days array
          // Iterate the days array to store only unique forecast days
          $scope.days.forEach(function(day) {
            // If day already exists in days array, set flag to false to avoid duplicates
            if (day === new Date(item.dt_txt).toUTCString().substring(0, 11)) {
              $scope.flag = false;
            }
          });

          // If flag is unchanged, insert the new value
          if ($scope.flag) {
            $scope.days.push(new Date(item.dt_txt).toUTCString().substring(0, 11));
          }

        })
      })
      .error(function(data, status) {
        console.log(data);
      });
  }

}]);

myApp.service('dataService', ['$http', function($http){
  // Returns a promise
  this.getData = function(){
    return $http.get('/data');
  }
}])
