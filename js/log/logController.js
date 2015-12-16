angular.module('starter.logscontroller', [])

.controller('LogsCtrl', function($scope, localStorageService, logsSrv, $log, $exceptionHandler) {

    $scope.$on('$ionicView.enter', function(e) {
         var stringVersion = localStorageService.get("errors");
    $scope.errors = stringVersion;
   // console.log(stringVersion);
        
  });
  
   
       
    $scope.clearLogs = function(){
        localStorageService.clearAll();
        $scope.errors=localStorageService.get("errors");
    }
    
});