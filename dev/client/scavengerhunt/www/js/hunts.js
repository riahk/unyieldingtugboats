/* hunts.js, HuntsCtrl
 *  - gets hunt data from HuntFactory
 *  - uses modals to show individual hunt views
 */
angular.module('scavengerhunt.hunts', ['uiGmapgoogle-maps'])
.controller('HuntsCtrl', function($scope, $ionicModal, HuntFact) {
  // hunt data from database
  $scope.hunts = HuntFact.hunts;


  // Get all hunts from certain zip code
  $scope.filterByZip = function(zip) {
    if (String(zip).match(/^[0-9]{5}$/)) {
      HuntFact.getHunts(Number(zip), function(hunts) {
        $scope.hunts = hunts;
        console.log($scope.hunts);
      });
    } else {
      console.log('please enter valid zip code');
    }
  };

  // modal for individual views
  $ionicModal.fromTemplateUrl('templates/huntInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // selectedHunt is set when modal is opened
  $scope.selectedHunt = null;

  $scope.openModal = function(index) {
    $scope.selectedHunt = $scope.hunts[index];
    $scope.setMap($scope.selectedHunt.cover.lat, $scope.selectedHunt.cover.lon);
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.map = { center: { latitude: 37, longitude: -122 }, zoom: 19 };

  $scope.map.markers = [];

  $scope.setMap = function(lat, lon) {
    $scope.map.center.latitude = lat;
    $scope.map.center.longitude = lon;
    
    //set markers
    for(var i = 0; i < $scope.selectedHunt.photos.length; i++) {
      var marker = {
            id: i,
            latitude: $scope.selectedHunt.photos[i].lat,
            longitude: $scope.selectedHunt.photos[i].lon,
            options: {}
      };
      $scope.map.markers.push(marker);
    }

    console.log($scope.map.markers);
  };  
})

