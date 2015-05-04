angular.module('scavengerhunt', ['ionic', 
               'scavengerhunt.photos',
               'scavengerhunt.hunts',
               'uiGmapgoogle-maps'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/hunts.html',
    controller: 'HuntsCtrl'
  })

  .state('pics', {
    url: 'pics',
    templateUrl: 'templates/pics.html',
    controller: 'PhotosCtrl'
  })

  .state('newhunt', {
    url: 'newhunt',
    templateUrl: 'templates/newhuntsmodal.html'
  });

})
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
})
.controller('AppCtrl', function($ionicModal, $ionicSideMenuDelegate, $scope) {
  $ionicModal.fromTemplateUrl('templates/huntsmodal.html', {
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

  $scope.toggleMenuRight = function() {
    $ionicSideMenuDelegate.toggleRight();
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
