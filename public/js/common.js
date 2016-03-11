angular
	.module('Books', ['ngAnimate', 'ui.bootstrap', 'pascalprecht.translate'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl])
	.controller('OfferCtrl', ['$scope', '$http', '$translate', OfferCtrl])
	.controller('localazeCtrl', ['$scope', '$translate', localazeCtrl])
	.config(['$translateProvider', function ($translateProvider) {
		$translateProvider
			.translations('en', translations)
			.preferredLanguage('en');
}]);

var translations = {
	message:{
		offer: 'Спасибо за предложение, книга скоро будет добавлена!'	
	}
};

function localazeCtrl ($scope, $translate) {
	$translate('HEADLINE').then(function (headline) {
		$scope.headline = headline;
	});
	$translate('PARAGRAPH').then(function (paragraph) {
		$scope.paragraph = paragraph;
	});
	$translate('NAMESPACE.PARAGRAPH').then(function (anotherOne) {
		$scope.namespaced_paragraph = anotherOne;
	});
};

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
		$('#offersModal').modal();
	};
}

function OfferCtrl($scope, $http, $translate) {

	$scope.send = function(){
		if ($scope.book){
			$http.put('/api/offer', $scope.book)
			.success(function(data){
				//$scope.message = data["message"];
				$scope.book= {};
				 $translate('message.offer').then(function (data) {
				      $scope.message = data;
				    });
			})
			.error(function(data){
				console.log(data);
			});
		}
	}
}