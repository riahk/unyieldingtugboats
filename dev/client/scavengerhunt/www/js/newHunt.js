angular.module('scavengerhunt.newhunts', [])
.controller('NewHuntCtrl', function($scope, $window, NewHuntFact, PhotoFact) {
  $scope.zipcode = null;
  $scope.zipcode = NewHuntFact.newHunt.zipcode;

  $scope.makeHunt = function(zip) {
    console.log('make hunt called');
    NewHuntFact.setZipCode(zip)
  };

  NewHuntFact.getPhotos(function(photos) {
    $scope.photos = photos; 
    console.log('make hunt photos: ', $scope.photos);
  });
    

  $scope.resetHunt = function() {
    console.log('$scope.resetHunt called');
    NewHuntFact.resetHunt(); 
    $window.location.reload(true)
  };


  $scope.addPhoto = function(index) {
    // NewHuntFact.addPhoto(PhotoFact.photos[index]);
    NewHuntFact.addPhoto($scope.photos[index]);
    console.log('added!');
    console.log(NewHuntFact.newHunt);
  };

  $scope.test = function() {
    console.log('reviewing hunt...');
    console.log(NewHuntFact.newHunt);
  };

});
