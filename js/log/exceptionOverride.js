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