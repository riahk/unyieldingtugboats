/* PhotoFactory.js, PhotoFact
 *  - handles photo data
 *  - communicates with RequestFactory to grab photos from the database
 */
angular.module('scavengerhunt.photofact', [])
.factory('PhotoFact', function($http) {
  var photos = []; 
  return {
  // retrieve photos from the server
    getPhotos: function(callback) {
      $http({
        method:'GET', 
        url: 'http://localhost:3000/api/photos'
      })
      .then(function(response){
        photos = response.data.slice(); 
        //for each photo in the photos, add an object to the photos array
        photos.forEach(function(photo) {
          photo.src = 'http://localhost:3000/api/photos/' + photo._id,
          photo.lon = photo.loc[0],
          photo.lat = photo.loc[1]
        })
        callback(photos);
      })
    }
  }
});

