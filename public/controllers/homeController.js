var myApp = angular.module('myApp');

myApp.controller('homeController', ['$rootScope', '$scope', '$http', 'dataService', '$uibModal', function($rootScope, $scope, $http, dataService, $uibModal) {
    // Stores Actual JSON Data
    $scope.data = [];
    $scope.columnHead = [];

    // Request to get JSON Data
    dataService.getPriorityData().success(function(result) {
       // $scope.data = result;
        var newobj = {
        };
        console.log('======+++++'+ result[0] + typeof(result));
        console.log('+++++++'+ $scope.data[0])
        var len = result.length;
        console.log('(((((((('+len);
        console.log(')))))))'+result[0]);
        for(var i=0;i<len;i++){
            $scope.data[i] = {};
            $scope.data[i].id = (i+1);
            $scope.data[i].to = result[i].to;
            $scope.data[i].from = result[i].from;
            $scope.data[i].emaildatetime = result[i].emaildatetime;
            $scope.data[i].subject = result[i].subject;
            $scope.data[i].body = result[i].body;
            $scope.data[i].action = result[i].intent;
            $scope.data[i].deadline = result[i].entity;
            $scope.data[i].priority = result[i].priority;
            // delete $scope.data[i].uniqueid;
            // delete $scope.data[i].intent;
            // delete $scope.data[i].entity;

        }
		console.log('=======-- here is the result '+ result[0].to);
        console.log('============' + $scope.data[len-1].to);
        console.log('============' + $scope.data[len-1].body);

        // Adds only column names to display in the table
        // Object.keys($scope.data[0]).map(function(key) {
        //     if (key == '_id')
        //     $scope.columnHead.push('id');
        //     else if(key == 'intent')
        //     $scope.columnHead.push('action');   
        //     else if(key == 'entity')
        //     $scope.columnHead.push('deadline');
        //     else if(key != 'uniqueid')
        //     $scope.columnHead.push(key);

        // })
        $scope.columnHead = ['id','to','from','emaildatetime','subject','body','action','deadline','priority']
        console.log('========' +$scope.columnHead[0] + $scope.columnHead[1] +$scope.columnHead[4] );
    })

    // For Accordion
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    // Makes the table sortable
    $scope.sortTable = function(n) {
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
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
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
                    switchcount++;
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

    // Switch value
    // $scope.validationValue = true;
    $scope.isValid = function(Num, Val) {
      // $scope.validationValue = !$scope.validationValue;
      if(typeof Val != 'undefined') {
        console.log('Num', Num, 'Value', Val);
        var data = {
          'Num': Num,
          'Status': Val
        };
        $http.post('/postStatus', data).success(function(response) {
          // console.log('POST', response);

          // Request to get JSON Data
          dataService.getData().success(function(result) {
              $scope.data = result;
            });

        })
        // Toggle
        // console.log('Toggle Value', Val, 'Num: ', Num);
      }
    }

    // Proof Popup
    $scope.animationsEnabled = true;
    $scope.ok = function() {
        $scope.$close();
    };

    $scope.cancel = function() {
        $scope.$dismiss('cancel');
    };

    $scope.open = function(num, parentSelector) {
      console.log(num);
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/popup.html',
            controller: 'homeController',
            scope: $scope,
            appendTo: parentElem,
            resolve: {
                items: function() {
                  // get clicked item's email details
                  dataService.emailData(num).success(function(result) {
                    // console.log(result);
                    // Object.keys(result).map(function(key) {
                    //   $scope.emailHeaders.push(key);
                    // })
                    $scope.emailData = result;
                  })
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            // $scope.selected = selectedItem;
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    // Filters
    // Map stores the filter fields as key, value
    $scope.searchFields = {};
    $scope.customFilter = function(item) {
      // if a filter is not empty, then filter the results
        if (Object.keys($scope.searchFields).length > 0) {
            var passed = true;
            // checks which column filter is used
            $scope.columnHead.forEach(function(col) {
                var value = $scope.searchFields[col];
                // if the value is not undefined, means got the filter with entered value
                // item[col].indexOf(value) checks if the entered value exists in JSON data
                // if not exist do not display
                if (typeof value !== 'undefined' && value.length > 0 && item[col].indexOf(value) !== 0) {
                    passed = false;
                }
            });
            return passed;
        } else {
            return true;
        }
    };

    // Email Exceptions
    $scope.isException = function(exception) {
      var exceptions = ['emailUID', 'attachment'];
      var mySet = new Set(exceptions);
      if(mySet.has(exception))
        return false;
      return true;
    }

    // Check/Uncheck Modal
    $scope.openCheck = function(size, parentSelector) {
      console.log('Check Uncheck Clicked', size);
      var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo2 ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/components/columnsModal.html',
          controller: 'popUpController',
          scope: $scope,
          appendTo: parentElem,
          resolve: {
              items: function() {
                // get clicked item's email details
                return $scope.columnHead;

              }
          }
        });

        modalInstance.result.then(function(selectedItem) {
            // $scope.selected = selectedItem;
            // $rootScope.columnExceptions = [];
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $rootScope.columnExceptions = ['Num','Sedol', 'comments', 'NLP Status', 'Status', 'Bkg rate','A/C Name','Nominal','ISIN', 'Global-1 BR', 'Cpy Bkg Rate', 'Cpy VD', 'Scratch Code','Action To be Performed','G1 BR Approval','TLM update','Action Approval','BOT action' ,'Claim History'];
    $scope.isColumnException = function(exception) {
      var mySet = new Set($scope.columnExceptions);
      if(mySet.has(exception))
        return true;
      return false;
    }

    $scope.addColumnException = function(exception) {
      var check = false;
      if($scope.columnsCheck[exception] == true) {
        console.log('Add: ', exception);
        $rootScope.columnExceptions.push(exception);
      }
      else {
        console.log('Remove: ', exception);
        var exceptions = [];
        $rootScope.columnExceptions.forEach(function(col) {
          if(col !== exception)
            exceptions.push(col);
        })
        $rootScope.columnExceptions = exceptions;
      }
      // console.log($scope.columnsCheck);
    }

    $scope.columnsCheck = {
      'Num': true,
      'Sedol': true,
      'ISIN': true,
      'Bkg rate':true,
      'A/C Name':true,
      'Nominal':true,
      'Global-1 BR': true,
      'Cpy Bkg Rate': true,
      'Cpy VD': true,
      'Scratch Code': true,
      'BOT action':true,
      'Action To be Performed':true,
      'BOT action':true,
      'G1 BR Approval':true,
      'TLM update':true,
      'Action Approval':true,
      'Claim History': true
    }

    $scope.isGlobalVal = {};
    $scope.globalValue = {};
    $scope.getGlobalVal = function(num) {
      dataService.getGlobalVal(num).success(function(result) {
        $scope.globalValue[num] = result.globalBkgrate;
        $scope.isGlobalVal[num] = true;
        // $scope.globalValue = result.globalBkgrate;
        // console.log(result);
      })
    }

    $scope.isGlobalAccept = function(num, val) {
      console.log(num, val);
      dataService.setGlobalAccept(num, val).success(function(result) {
        console.log('Result:', result);
      })
    }

    $scope.isCareUpdate = function(num, value) {
      dataService.setCareUpdate(num, String(value)).success(function(response) {
        // success
      })
    }

    $scope.isTLMUpdate = function(num, value) {
      dataService.setTLMUpdate(num, String(value)).success(function(response) {
        // success
      })
    }

    // Exception Modal

    $scope.openException = function(num, parentSelector) {
      console.log(num);
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/components/exceptionModal.html',
            controller: 'homeController',
            scope: $scope,
            appendTo: parentElem
        });

        modalInstance.result.then(function(selectedItem) {
            // $scope.selected = selectedItem;
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.saveException = function(num, text, drop) {
      console.log(num, text, drop);
      $scope.alerts = ["1"];
    }

}])
