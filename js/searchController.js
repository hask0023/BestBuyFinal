angular.module('starter.searchcontroller', [])

.controller('SearchCtrl', function($scope, $http, $ionicSlideBoxDelegate, searchSrv, logsSrv, $log, $exceptionHandler) {
    
     
    
    $scope.searchNow = function () {
        $scope.products = null;
        if($scope.searchName){
            $scope.noResults = false;
            searchSrv.searchItems($scope.searchName).then(function(promise){
                console.log (promise.length);
                if (promise.length < 1)
                    {
                        // $scope.products = promise;
                        $scope.noResults = true;
                        logsSrv.logError($log.debug("You searched something weird didn't ya."));
                        
                    }
                else{
                    $scope.products = promise;
                }
                 
//                
//               
//                if($scope.products.length === 0)
//                         {
//                             $scope.noResults = true;
//                           
//                         }
            });
         
        }
            
    }
    
});