'use strict';

// Declare app level module which depends on views, and components
var myApp=angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);


myApp.controller('T2PController', function T2PController($scope) {
  var  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET","/testPNML/test.pnml",false);
  xmlhttp.send();
  var xmlDoc=xmlhttp.response;
  var parser = new DOMParser();
  var xmlDoc2 = parser.parseFromString(xmlDoc,"text/xml");
  $scope.pnml=xmlDoc2;
  $scope.loading=false;
  $scope.callback = function(pnml){
  $scope.pnml = pnml;
}

$scope.loadingCallback = function(loading){
$scope.loading = loading;
}
});
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
