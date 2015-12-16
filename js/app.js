angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'LocalStorageModule', 'starter.storecontroller', 'starter.storeservice', 'starter.searchservice', 'starter.searchcontroller', 'starter.logscontroller', 'starter.logsservice', 'angular-logger', 'starter.exceptionOverride', 'satellizer'])


.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
           
            StatusBar.styleDefault();
        }
    });
})



.config(function ($stateProvider, $urlRouterProvider, logEnhancerProvider, $authProvider) {
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


    logEnhancerProvider.datetimePattern = 'HH:mm:ss';
    logEnhancerProvider.prefixPattern = '%s %s: ';

    $authProvider.facebook({
        clientId: '771402229636026',
        responseType: 'token'
    });


});