angular
	.module('Books')
	.controller('AuthorCtrl', ['$scope', '$http', '$window', AuthorCtrl])
	.controller('FactsCtrl', ['$scope', '$http', '$window', FactsCtrl]);

function AuthorCtrl($scope, $http, $window) {
	var authorId = $window.App.authorId;
	$scope.birthDate = new Date(Date.parse($window.App.authorDate));
	$http.get('/api/author/'+authorId+'/books')
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data);
	})
}

function FactsCtrl($scope, $http, $window) {
	var authorId = $window.App.authorId;
	$http.get('/api/author/'+authorId+'/facts')
	.success(function(data){
		$scope.facts = data;
		$scope.firstFact = $scope.facts[0]
		$scope.facts.splice(0, 1);
	})
	.error(function(data){
		console.log(data);
	})
}