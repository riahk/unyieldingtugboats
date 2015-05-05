angular.module('scavengerhunt.newhunts', [])
.controller('NewHuntCtrl', function($scope, NewHuntFact, PhotoFact) {
  $scope.zipcode = null;

  $scope.makeHunt = function(zip) {
    NewHuntFact.setZipCode(zip);
    $scope.zipcode = NewHuntFact.newHunt.zipcode;
    console.log(NewHuntFact.newHunt);
  };

  $scope.resetHunt = function() {
    NewHuntFact.newHunt = {};
    console.log(NewHuntFact.newHunt);
  };

  $scope.photos = PhotoFact.photos;

  $scope.addPhoto = function(index) {
    NewHuntFact.addPhoto(PhotoFact.photos[index]);
    console.log('added!');
    console.log(NewHuntFact.newHunt);
  };

  $scope.test = function() {
    console.log('reviewing hunt...');
    console.log(NewHuntFact.newHunt);
  };

});
