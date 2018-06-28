'use strict';

angular.module('myApp').
  component('t2pForm', {
    templateUrl: '/components/form/form.html',
    bindings: {
      pnml: '<',
      loading:'<'
      },
    controller: function T2pFormController($http,$scope) {
      $scope.pnml=this.pnml;
      $scope.loading=this.loading;
      $scope.previousText=null;
      $scope.isGeneratable=function(){
        if($scope.text==null){
          return true;
        }else{
        return !($scope.text.length>0);
        }
      }
      $scope.clearText=function(){
      $scope.text="";
      }
      $scope.isClearable=function(){
        if($scope.text==null){
          return true;
        }else{
        return !($scope.text.length>0);
        }
      }
      $scope.generate=function(){
          if(!($scope.text===$scope.previousText)){
      $scope.loading(true);
        var req = {
            method: 'POST',
            url: 'http://193.196.7.214:8080/t2p/generate',
            headers: {
     'Content-Type': "text"
   },
   data: $scope.text
  }

  $http(req).then(function(response){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(response.data,"text/xml");
      $scope.loading(false);
      $scope.pnml(xmlDoc);
      $scope.previousText=$scope.text;
      //console.log($scope.that);
  }, function(response){
  $scope.loading(false);
    var message="An unexspected Error Occured";

    if(response.status===400){
      message="You used unallowed characters eg.<=#"
    }
    if(response.status===500){
      message="We were not able to create a Petrinet based on your text. Make sure you stick to natural languages grammar and syntax."
    }
    if(response.status===503){
      message="Our servers are currently busy. Try again in a few minutes."
    }

      swal({
        title: "Error!",
        text: message,
        icon: "error",
        button: "Ok then...",
        });
      });
      }
}
    }
  });
