/* photos.js, PhotosCtrl
 *  - handles functionality for the photo view
 *  - uses modals to display single photo view
 */
angular.module('scavengerhunt.photos', [])
.controller('PhotosCtrl', function($scope, $ionicModal, PhotoFact, $ionicLoading) {
  // get photos from factory
  PhotoFact.getPhotos(function(photos) {
    $scope.photos = photos; 
  })
  
  // create modal for single photo view  
  $ionicModal.fromTemplateUrl('templates/picInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(index) {
    //on opening modal, set the selected photo
    $scope.selectedPhoto = $scope.photos[index];
    $scope.setMap($scope.selectedPhoto.lat, $scope.selectedPhoto.lon);
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  }); 

  // create photo map with default locations
  $scope.map = { center: { latitude: 37, longitude: -122 }, zoom: 19 };

  //selected photo is set when a modal is opened
  $scope.selectedPhoto = null;

  $scope.marker = null;

  //set location map based on selected photo information
  $scope.setMap = function(lat, lon) {
    $scope.map.center.latitude = lat;
    $scope.map.center.longitude = lon;
    
    //set marker
    $scope.marker = {
      id: 0,
      coords: {
        latitude: lat,
        longitude: lon
      }
    };
  }

});
