angular.module('starter.storeservice', [])
    .factory('storeSrv', ['$http', function ($http, logsSrv, $log) {

        var apiKey = "3kjmw8ybzsfxhfenh6nnujud";



        return {
            getNearbyStores: function (lat, long) {
                var promise = $http.get('http://api.bestbuy.com/v1/stores(area(' + lat + ',' + long + ',' + '1000' + '))?show=name,address,hoursAmPm,phone,distance&format=json&apiKey=' + apiKey).then(function (resp) {
                    console.log('Success', resp);
                    console.log(resp.data);
                    var data = resp.data.stores;
                    return data;


                }, function (err) {
                    logsSrv.logError($log.debug(err));
                    console.error('ERR', err);
                    return {
                        "status": false
                    };
                });
                return promise;
            },

            getCityStores: function (city) {
                var promise = $http.get('http://api.bestbuy.com/v1/stores(city=' + city + ')?show=name,address,hoursAmPm,phone,distance&format=json&apiKey=' + apiKey).then(function (resp) {
                    console.log('Success', resp);

                    //for JSON, resp.data contains the result
                    var data = resp.data.stores;
                    return data;
                }, function (err) {
                    logsSrv.logError($log.debug(err));
                    console.error('ERR', err);
                    return {
                        "status": false
                    };
                });
                return promise;

            }


        };





}]);