angular
	.module('Books', ['ngAnimate', 'ui.bootstrap'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl]);


function LogoutCtrl($scope, $http) {
	$scope.send = function () {
		$http.get('/api/out')
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
}

function SearchCtrl($scope) {
	$scope.query =  decodeURIComponent(location.search.replace("?query=", ""));
}