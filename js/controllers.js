angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, logsSrv, $auth, $http, $log, $ionicPopup) {
    var validUser;

    // Form data for the login modal
    $scope.loginData = {};

    $scope.loggedIn = false;
    $scope.currentUser = "";

    // Create the login modal 
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        backdropClickToClose: false,
        hardwareBackButtonClose: false

    }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();

    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
        $scope.loggedIn = false;
        $auth.logout();
        logsSrv.logError($log.debug("Logged out successfully"));
    };



    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);



        if ($scope.loginData.password && $scope.loginData.username) {
            if ($scope.loginData.username === "guest") {

                $ionicPopup.alert({
                    title: 'Error',
                    content: "Invalid Username"
                });

            } else if ($scope.loginData.password.length < 5) {

                $ionicPopup.alert({
                    title: 'Error',
                    content: "Password too short. Must be at least 5 characters."
                });
            } else {
                validUser = $scope.loginData.username;
                console.log($scope.loginData.password.length);
                $scope.modal.hide();
                $scope.currentUser = validUser;
                $scope.loggedIn = true;
                logsSrv.logError($log.debug("Logged in successfully"));
            }

        } else {

            $ionicPopup.alert({
                title: 'Error',
                content: "You must enter a username and password."
            });

        }


    };

    $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };


    $scope.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function (result) {
            //checking out the token
             console.log(JSON.stringify(result));
            
                $scope.loggedIn = true;
                logsSrv.logError($log.debug("Logged in successfully"));
                $scope.modal.hide();
                var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
                var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
                $http.get(graphApiUrl).then(function (response) {

                    $scope.currentUser = response.data.first_name + ' ' + response.data.last_name;

                });
            })
            .catch(function (response) {
                // error msg here
                logsSrv.logError($log.debug(response));

            });
    };

    //logout
    $scope.logout = function () {
        $auth.logout();
        $scope.loggedIn = false;



    };


});