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

    returnPhotos: function(){
      console.log('return photos: ', photos);
      return photos; 
    },

    getPhotos: function(callback){
      console.log('get photos with this zip: ', this.newHunt.zipcode)
      if (this.newHunt.zipcode){
        $http({
          method:'POST', 
          url: '/api/photos',
          // data: {zipcode: 95070}
          data: { zipcode: this.newHunt.zipcode}
        })
        .then(function(response){
          photos = response.data.slice(); 
          console.log('this.photos: ', photos);
          //for each photo in the this.photos, add an object to the this.photos array
          photos.forEach(function(photo) {
            photo.src = 'http://localhost:3000/api/photos/' + photo._id,
            photo.lon = photo.loc[0],
            photo.lat = photo.loc[1]
          })
          console.log('this.photos in getPhotos: ', photos)
          // callback(this.photos);
          callback(photos)
        })
      }
    },

    resetHunt: function() {
      this.newHunt = {};
      photos = [];
      console.log('photos: ', this.photos);
      console.log('this.newHunt: ', this.newHunt);
    }
  }  
});
