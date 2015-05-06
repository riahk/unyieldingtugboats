angular.module('scavengerhunt.newhuntFactory', [])
.factory('NewHuntFact', function($http) {
  var photos = []; 
  return {

    newHunt: {},

    addPhoto: function(photo) {
      this.newHunt.photos = this.newHunt.photos || [];
      this.newHunt.photos.push(photo);
    },

    setZipCode: function(zip) {
      this.newHunt = {};
      this.newHunt.zipcode = zip;
      console.log('zipcode set to : ', this.newHunt.zipcode, zip);
    },

    getPhotos: function(callback){
      console.log('get photos with this zip: ', this.newHunt.zipcode)
      $http({
        method:'POST', 
        url: '/api/photos',
        data: { zipcode: this.newHunt.zipcode}
      })
      .then(function(response){
        photos = response.data.slice(); 
        console.log('photos: ', photos);
        //for each photo in the photos, add an object to the photos array
        photos.forEach(function(photo) {
          photo.src = 'http://localhost:3000/api/photos/' + photo._id,
          photo.lon = photo.loc[0],
          photo.lat = photo.loc[1]
        })
        callback(photos);
      })
    },

    resetHunt: function() {
      this.newHunt = {};
      photos = [];
      console.log('photos: ', photos);
      console.log('this.newHunt: ', this.newHunt);
    }
  }  
});
