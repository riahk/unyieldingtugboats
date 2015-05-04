angular.module('scavengerhunt.newhunts', [])
.controller('NewHuntCtrl', function($scope) {
  $scope.newHunt = {};

  $scope.setZipCode = function(zip) {
    $scope.newHunt.zipcode = zip;
  }  
});
