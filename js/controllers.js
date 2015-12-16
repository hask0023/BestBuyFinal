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

