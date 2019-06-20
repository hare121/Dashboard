var myApp = angular.module('myApp');

myApp.service('dataService', ['$http', function($http) {
    // Returns a promise
    this.getData = function() {
        return $http.get('/data');
    },
    this.getPriorityData = function(){
      return $http.get('/home');
    }
    this.emailData = function(num) {
      return $http.post('/postEmail', {'Num': num});
    },
    this.getGlobalVal = function(num) {
      return $http.post('/postGlobalVal', {'Num': num});
    },
    this.setGlobalAccept = function(num, val) {
      return $http.post('/setGlobalAccept', {'Num': num, 'Val': val});
    },
    this.setCareUpdate = function(num, val) {
      return $http.post('/setCareUpdate', {'Num': num, 'Value': val});
    }
    this.setTLMUpdate = function(num, val) {
      return $http.post('/setTLMUpdate', {'Num': num, 'Value': val});
    },
    this.runTrigger = function() {
      return $http.get('/runTrigger');
    }
}])
