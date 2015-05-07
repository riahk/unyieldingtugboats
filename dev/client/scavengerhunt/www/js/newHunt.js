angular.module('scavengerhunt.newhunts', [])
.controller('NewHuntCtrl', function($scope, $window, NewHuntFact, PhotoFact) {
  // $scope.zipcode = null;
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
  };


  $scope.addPhoto = function(index) {
    NewHuntFact.addPhoto($scope.photos[index]);
    if(!NewHuntFact.newHunt.cover) { //sets cover to be first photo added
      NewHuntFact.newHunt.cover = $scope.photos[index];
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
})
.directive('rotate', function() {
    return {
            restrict: 'A',
            link: function (scope, element, attrs) {
              var r = 'rotate(0deg)'
              if (attrs.orientation === '6'){
                r = 'rotate(90deg)'; 
                element.css({
                  '-moz-transform': r,
                  '-webkit-transform': r,
                  '-o-transform': r,
                  '-ms-transform': r,
                });
              } 
            }
        }
});

