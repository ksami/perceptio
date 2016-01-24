angular.module('formApp', ['ngRoute'])

.controller('formController', ['$scope', function($scope) {

  $scope.dataType = "static";
  $scope.color = "#f44336";
  $scope.file = "";
  $scope.height = 500;
  $scope.width = 500;

  $scope.isStatic = function() {
    return $scope.dataType === "static";
  }

  $scope.isDynamic = function() {
    return $scope.dataType === "dynamic";
  }

  $scope.is3D = function() {
    return $scope.dataType === "3d";
  }

  $scope.isAllInputsFilled = function() {
    return $scope.dataType && $scope.color && $scope.height && $scope.width &&
     ( ($scope.isStatic() && $scope.file && $scope.graphType) || ($scope.isDynamic() && $scope.url) ||
      ($scope.is3D() && $scope.file));
  }

  $scope.uploadFile = function(event) {
    $scope.file = event.target.files[0];
    if(!$scope.$$phase){
      $scope.$apply();
    }
  }

  $scope.isOutOfBound = function(value, min, max) {
    return value < min || value > max;
  }

}])

.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});