// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('scavengerhunt', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'hunts.html',
    controller: 'HuntsCtrl'
  })

  .state('pics', {
    url: 'pics',
    templateUrl: 'pics.html',
    controller: 'PhotosCtrl'
  })

})
.controller('AppCtrl', function($ionicModal, $scope) {
  $ionicModal.fromTemplateUrl('huntsmodal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  
})
.controller('HuntsCtrl', function($scope) {
  $scope.test = function() {
    console.log('hello!');
  }
})
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
  $ionicModal.fromTemplateUrl('picInfo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.selectedPhoto = null;

  $scope.openModal = function(photo) {
    $scope.selectedPhoto = photo;
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
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
