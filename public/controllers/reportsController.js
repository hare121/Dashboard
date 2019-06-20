var myApp = angular.module('myApp');

myApp.controller('reportsController', ['$scope', '$http', function($scope, $http) {
    // array data for pie chart
    $scope.chartData = [];

    // get the json data from file
    $http.get('/report').success(function(data) {
      // store the data as array of array
		console.log(data[0]);
        Object.keys(data[0]).map(function(key) {
            $scope.chartData.push([key, parseInt(data[0][key])]);
        })
        console.log($scope.chartData);
    })

    // For Accordion
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    // For loading the chart
    $scope.loadCharts = function() {
        // Pie chart
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Status');
            data.addColumn('number', 'Percentage');

            data.addRows($scope.chartData);

            var options = {
                title: 'Progress Status',
                is3D: true
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }
    }
}])
