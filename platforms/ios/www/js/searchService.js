angular.module('starter.searchservice', [])
    .factory('searchSrv', ['$http', function ($http, logsSrv, $log) {

        var apiKey = "3kjmw8ybzsfxhfenh6nnujud";



        return {
            searchItems: function (search) {
                var words = search.split(' ');
                var firstWord = words[0];
                var secondWord = '';
                var thirdWord = '';


                if (words.length > 1) {
                    secondWord = "&search=" + words[1];
                }
                if (words.length > 2) {
                    thirdWord = "&search=" + words[2];
                }



                var promise = $http.get('http://api.bestbuy.com/v1/products((search=' + firstWord + secondWord + thirdWord + '))?show=name,sku,salePrice,image&format=json&apiKey=' + apiKey).then(function (resp) {
                    console.log('Success', resp);



                    //for JSON, resp.data contains the result
                    var data = resp.data.products;
                    return data;

                }, function (err) {
                    console.error('ERR', err);
                    logsSrv.logError($log.debug(err));
                    return {
                        "status": false
                    };
                });
                return promise;


            }


        };





}]);