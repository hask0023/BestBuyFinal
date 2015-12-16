// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'LocalStorageModule','starter.storecontroller', 'starter.storeservice', 'starter.searchservice', 'starter.searchcontroller', 'starter.logscontroller', 'starter.logsservice', 'angular-logger', 'starter.exceptionOverride', 'satellizer'])


    
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, logEnhancerProvider, $authProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'  
      }
    }
  })
  
    .state('app.logs', {
    url: '/logs',
    views: {
      'menuContent': {
        templateUrl: 'templates/logs.html',
        controller: 'LogsCtrl'  
      }
    }
  })

  .state('app.stores', {
      url: '/stores',
      views: {
        'menuContent': {
          templateUrl: 'templates/stores.html',
            controller: 'StoreCtrl'
        }
      }
    })
  
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
   // $urlRouterProvider.otherwise('/app/login');
    
    logEnhancerProvider.datetimePattern = 'HH:mm:ss';
    logEnhancerProvider.prefixPattern = '%s %s: ';
    
    $authProvider.facebook({
      clientId: '771402229636026',
      responseType: 'token'
    });
    
    
});

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, logsSrv, $exceptionHandler, $auth, $http, $log) {
var validUser;
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    
  // Form data for the login modal
  $scope.loginData = {};

    $scope.loggedIn = false;
    $scope.currentUser = "";
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    backdropClickToClose: false,  
    hardwareBackButtonClose: false
      
  }).then(function(modal) {
    $scope.modal = modal;
      $scope.modal.show();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
     
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
      $scope.loggedIn = false;
      $auth.logout();
  };
    
    

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
      
      
      if ($scope.loginData.password && $scope.loginData.username ){
          if ($scope.loginData.username === "guest" )
          {
              alert('Invalid username.');
          }
      else if ($scope.loginData.password.length < 5) {
          alert ('Password too short. Must be at least 5 characters.');
      }
      
      else {
          validUser = $scope.loginData.username;
          console.log ($scope.loginData.password.length);
          $scope.modal.hide();
          $scope.currentUser = validUser;
          $scope.loggedIn = true;
      }
          
      }
      else{
          alert('You must enter a username and password');
        
      }
      

  };
    
            $scope.isAuthenticated = function() {
  return $auth.isAuthenticated();
};

    
    $scope.authenticate = function(provider) {
$auth.authenticate(provider)
.then(function(result) {
    $scope.loggedIn = true;
    $scope.modal.hide();
var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
$http.get(graphApiUrl).then(function(response) {
//console.log(response.data.first_name + ' ' + response.data.last_name);
$scope.currentUser = response.data.first_name+ ' ' + response.data.last_name;

});
})
.catch(function(response) {
// error msg here
      logsSrv.logError($log.debug(response));

});
};
    
    //logout
    $scope.logout = function(){
        $auth.logout();
        $scope.loggedIn = false;
        if ($auth.isAuthenticated()){
            console.log ('it is not logged out');
           
            
        }
        if (!$auth.isAuthenticated()){
              logsSrv.logError($log.debug("logged out successfully"));
        }
        
       
    };
      

});


angular.module('starter.exceptionOverride', [])

.factory('exceptionOverride', ['$exceptionHandler', function (localStorageService) {
    
    
    
    return function(exception, cause){
         var storageErrorList = localStorageService.get("errors") || [];
        
        exception.message += ' (caused by "' + cause + '" )';
        throw exception;
        
        storageErrorList.push({
                        "error": exception,                       
                    });
                
                
                localStorageService.set("errors", storageErrorList);
        
     
    };
    
    
    
    
    
    }]);
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
angular.module('starter.logsservice', [])

.factory('logsSrv', ['localStorageService', '$log', '$exceptionHandler', function (localStorageService, $log, $exceptionHandler) {
     var storageErrorList = localStorageService.get("errors") || [];
    
//logsSrv.logError($log.debug("This is how I debug dawg"));
    
    
    return {
            logError: function($log) {
             //   console.log(error);
                
                storageErrorList.push({
                        "error": $log,
                        
                    });
                
                
                localStorageService.set("errors", storageErrorList);
                
                return "Error added";
            }
                       
     }

}]);
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
angular.module('starter.searchservice', [])
.factory('searchSrv', ['$http', '$cordovaGeolocation' , function ($http, $cordovaGeolocation, logsSrv) {

    var apiKey = "3kjmw8ybzsfxhfenh6nnujud";
    var localStoreData;
    
    
   return{
            searchItems: function(search) {
                var words = search.split(' ');
                var firstWord = words[0];
                var secondWord = '';
                var thirdWord = '';
               
               
                if (words.length > 1)
                    {
                         secondWord = "&search=" + words[1];
                    }
                if (words.length > 2)
                    {
                         thirdWord = "&search=" + words[2];
                    }
             
                 
                
                var promise = $http.get('http://api.bestbuy.com/v1/products((search='+firstWord +secondWord + thirdWord +'))?show=name,sku,salePrice,image&format=json&apiKey=' + apiKey).then(function(resp) {
                console.log('Success', resp);
                var stringResponse = angular.fromJson(resp);
               
               
                //for JSON, resp.data contains the result
                var data = resp.data.products;
                    return data;
                    
            }, function(err) {
                console.error('ERR', err);
                 return {"status": false};    
            });
                return promise;
                    
                
            }
       
       
   }
    


       
        
}]);
    
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
angular.module('starter.storeservice', [])
.factory('storeSrv', ['$http', '$cordovaGeolocation' , function ($http, $cordovaGeolocation) {

    var apiKey = "3kjmw8ybzsfxhfenh6nnujud";
   
    
    
   return{
       getNearbyStores: function (lat, long) {
           var promise = $http.get('http://api.bestbuy.com/v1/stores(area('+ lat +','+ long +','+'1000'+'))?show=name,address,hoursAmPm,phone,distance&format=json&apiKey=' + apiKey).then(function(resp) {
                console.log('Success', resp);
                console.log(resp.data);
                var data = resp.data.stores;
                return data;
                  
               
            }, function(err) {
               logsSrv.logError($log.debug(err));
                console.error('ERR', err);
               return {"status": false};
            });
         return promise;         
       },
       
       getCityStores: function (city) {
           var promise = $http.get('http://api.bestbuy.com/v1/stores(city='+city+')?show=name,address,hoursAmPm,phone,distance&format=json&apiKey=' + apiKey).then(function(resp) {
                console.log('Success', resp);
               
                //for JSON, resp.data contains the result
                var data = resp.data.stores;
                     return data;
            }, function(err) {
               logsSrv.logError($log.debug(err));
                console.error('ERR', err);
                return {"status": false};
            });
           return promise;
           
       }
       
       
   }
    


       
        
}]);