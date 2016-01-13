angular
	.module('Books', ['ngAnimate', 'ui.bootstrap'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl]);


function LogoutCtrl($scope, $http) {
	$scope.send = function() {
		$http.get('/api/out')
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
}