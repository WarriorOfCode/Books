angular
	.module('Books', ['ngAnimate', 'ui.bootstrap'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('QuestCtrl', ['$scope', '$http', QuestCtrl]);


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

function QuestCtrl($scope, $http){
	$scope.search = function () {
		$http.get('/search')
	};
}