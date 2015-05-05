/* PhotoFactory.js, PhotoFact
 *  - handles photo data
 *  - communicates with RequestFactory to grab photos from the database
 */
angular.module('scavengerhunt.photofact', [])
.factory('PhotoFact', function() {
  return {
  
  //test photo set, delete later:
  photos: [
    {
      src: "img/noah.jpg",
      lat: 37.783482,
      lon: -122.409116,
      comment: "It's Noah!!! Nice hat."
    },
    {
      src: "img/building.jpg",
      lat: 37.783602,
      lon: -122.409360,
      comment: "cool building."
    }
  ],

  // retrieve photos from the server
  getPhotos: function() {
    //call request.request with photo url
    //callback will set this.photos with the returned data
  }

  }
});
