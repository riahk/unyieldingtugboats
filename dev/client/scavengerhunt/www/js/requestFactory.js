angular.module('reqFactory', [])
.factory('ReqFact', [$http, function($http) {
  return {
    request: function(url, data, callback) {
      if (data) {
        $http.post(url, data)
        .success(function(response) {
          callback(response);
        })
        .error(function(err) {
          console.log('Error: Unable to post data to server');
        });
      } else {
        $http.get(url)
        .success(function(response) {
          callback(response);
        })
        .error(function(err) {
          console.log('Error: Unable to get data from server');
        });
      }
    }
  }
}]);