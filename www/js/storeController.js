angular.module('starter.storecontroller', [])

.controller('StoreCtrl', function($scope, $http, $ionicSlideBoxDelegate, storeSrv, $cordovaGeolocation, logsSrv, $log) {
   
    var localStoreData;
    
    
    
 var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
       var lat  = position.coords.latitude
       var long = position.coords.longitude
       storeSrv.getNearbyStores(lat, long).then(function(promise){
        $scope.storeListGeo = promise;
           localStoreData = $scope.storeListGeo;
            if($scope.storeListGeo.length === 0)
                         {
                             $scope.noResults = true;                         
                         }
    });
       
    }, function(err) {
      // error
      logsSrv.logError($log.debug(err));
    });
    

      $scope.searchCity = function(){
        if($scope.cityName) {
            $scope.storeListGeo = null;
            $scope.noResults = false;
        storeSrv.getCityStores($scope.cityName).then(function(promise){
               $scope.storeListCity = promise;
             if($scope.storeListCity.length === 0)
                         {
                             $scope.noResults = true;
                           
                         }
           });
           
            
        }
    }
      
        $scope.findNearbyStores = function(){
        $scope.noResults = false;
        $scope.storeListCity = null;
        $scope.storeListGeo = localStoreData;
        
    }
    
});