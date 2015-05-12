angular.module('scavengerhunt.huntfactory', [])
.factory('HuntFact', function() {
  return {
  
    hunts: [
      {
        title: 'Test Hunt',
        cover: {
              src: "img/noah.jpg",
              lat: 37.783482,
              lon: -122.409116,
              comment: "It's Noah!!! Nice hat."
            }, 
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
        ]
      }
    ]

  }
});
