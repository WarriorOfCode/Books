var app = angular.module('books', []);
app.controller('registration', ['$scope', function($scope) {
    $scope.user = {};
    $scope.sendData = function() {
		console.log($scope.user);
    };
}]);