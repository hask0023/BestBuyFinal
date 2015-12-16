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