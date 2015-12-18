angular.module('starter.logscontroller', [])

.controller('LogsCtrl', function ($scope, localStorageService) {

    $scope.$on('$ionicView.enter', function ( ) {
        var stringVersion = localStorageService.get("errors");
        $scope.errors = stringVersion;


    });



    $scope.clearLogs = function () {
        localStorageService.clearAll();
        $scope.errors = localStorageService.get("errors");
    };

});