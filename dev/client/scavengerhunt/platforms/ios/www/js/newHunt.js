angular.module('scavengerhunt.newhunts', [])
.controller('NewHuntCtrl', function($scope, NewHuntFact, PhotoFact) {
  $scope.zipcode = null;

  $scope.makeHunt = function(zip) {
    NewHuntFact.setZipCode(zip);
    console.log(NewHuntFact.newHunt);
    console.log($scope.zipcode);
  };

  $scope.resetHunt = function() {
    NewHuntFact.newHunt = {};
    console.log(NewHuntFact.newHunt);
  };

  $scope.photos = PhotoFact.photos;

  $scope.addPhoto = function(index) {
    NewHuntFact.addPhoto(PhotoFact.photos[index]);
    if(!NewHuntFact.newHunt.cover) { //sets cover to be first photo added
      NewHuntFact.newHunt.cover = PhotoFact.photos[index];
    }
    console.log('added!');
    console.log(NewHuntFact.newHunt);
  };

  $scope.setZip = function() {
    $scope.zipcode = NewHuntFact.newHunt.zipcode || null;
  }

  $scope.map = { center: { latitude: 37, longitude: -122 }, zoom: 19 };

  $scope.map.markers = [];

  $scope.setMap = function() {
    if(NewHuntFact.newHunt.photos) {
      $scope.map.center.latitude = NewHuntFact.newHunt.cover.lat;
      $scope.map.center.longitude = NewHuntFact.newHunt.cover.lon;
    
    
    //set markers
    for(var i = 0; i < NewHuntFact.newHunt.photos.length; i++) {
      var marker = {
            id: i,
            latitude: NewHuntFact.newHunt.photos[i].lat,
            longitude: NewHuntFact.newHunt.photos[i].lon,
            options: {}
      };
      $scope.map.markers.push(marker);
    }
    }
    console.log($scope.map.markers);
  }; 

  $scope.setMap();
  $scope.setZip();
});
