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

  //*********************** */
$scope.sortTable = function (n) {
  console.log("N value is ",n);
  console.log("Inside sort table");
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("sortable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
//****************************** */
  
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
