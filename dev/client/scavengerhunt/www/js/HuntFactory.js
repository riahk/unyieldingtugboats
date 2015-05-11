angular.module('scavengerhunt.huntfactory', [])
.factory('HuntFact', function(request, SERVER) {
  var hunts = []; 
  return {

    //get hunts from the database by making a request to api/hunts
    getHunts: function(zip, callback) {
      var zipCode = '';
      if (zip) {
        zipCode = '?zip='+zip;
      }

      request.request(SERVER.url + '/api/hunts' + zipCode, null, function(data) {
        callback(data);
      });
    }

  }
});
