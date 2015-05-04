angular.module('scavengerhunt.hunts', ['uiGmapgoogle-maps'])
.controller('HuntsCtrl', function($scope, $ionicModal) {
  $scope.test = function() {
    console.log('hello!');
  }
  
  $scope.hunts = [
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
  ];

  $ionicModal.fromTemplateUrl('templates/huntInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.selectedHunt = null;

  $scope.openModal = function(index) {
    $scope.selectedHunt = $scope.hunts[index];
    console.log($scope.selectedHunt.title);
    //$scope.setMap($scope.selectedPhoto.lat, $scope.selectedPhoto.lon);
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });




})

