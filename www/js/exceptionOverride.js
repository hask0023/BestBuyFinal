angular.module('starter.exceptionOverride', [])

.factory('exceptionOverride', ['$exceptionHandler', function (localStorageService) {

// This was something I was working on to play with exception handler. Not enough time to complete, but keeping it around
// incase I want to revisit

    return function (exception, cause) {
        var storageErrorList = localStorageService.get("errors") || [];

        exception.message += ' (caused by "' + cause + '" )';


        storageErrorList.push({
            "error": exception,
        });


        localStorageService.set("errors", storageErrorList);


    };


    }]);