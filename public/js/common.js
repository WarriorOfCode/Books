angular
	.module('Books', ['ngAnimate', 'ui.bootstrap'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl])
	.controller('OfferCtrl', ['$scope', '$http', OfferCtrl]);


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

	$scope.openModal = function(){
		$('#myModal').modal();
	};
}

function OfferCtrl($scope, $http) {

	$scope.send = function(){
		$http.put('/api/offer', $scope.book)
		.success(function(data){
			$scope.message = data["message"];
		})
		.error(function(data){
			console.log(data);
		})
	}
}