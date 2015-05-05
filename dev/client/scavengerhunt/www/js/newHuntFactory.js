angular.module('scavengerhunt.newhuntFactory', [])
.factory('NewHuntFact', function() {
  return {

    newHunt: {},

    addPhoto: function(photo) {
      this.newHunt.photos = this.newHunt.photos || [];
      this.newHunt.photos.push(photo);
    },

    setZipCode: function(zip) {
      this.newHunt = {};
      this.newHunt.zipcode = zip;
      console.log('zipcode set!');
    },

    resetHunt: function() {
      this.newHunt = {};
    }
  }  
});
