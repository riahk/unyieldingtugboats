angular.module('scavengerhunt.photos', [])
.controller('PhotosCtrl', function($scope, $ionicModal) {
  $scope.photos = [
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
  ];
    
  $ionicModal.fromTemplateUrl('templates/picInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.selectedPhoto = null;

  $scope.openModal = function(index) {
    $scope.selectedPhoto = $scope.photos[index];
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.test = function() {
    console.log(this.selectedPhoto);
  }
});