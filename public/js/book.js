angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', '$window', ReadCtrl]);

function ReadCtrl($scope, $http, $window) {

	var readText = "Читал",
		unReadText = "Не читал",
		inProgress = false;

	$scope.isReaded = $window.App.isReaded;

	updateText(); // called when page loaded and ready

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;

		var bookId = location.pathname.replace("/book/", "");

		if ($scope.isReaded) {
			$http.delete('/api/book/user/' + bookId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			$http.put('/api/book/user', { bookId: bookId })
			.success(successHandler)
			.error(errorHandler);
		}
	};

	function updateText()
	{
		$scope.text = $scope.isReaded ? unReadText : readText;	
	}

	// called when http request ended with success response 
	function successHandler(response)
	{
		$scope.isReaded = !$scope.isReaded;
		updateText();
		inProgress = false;
	}

	// called when http request ended with error
	function errorHandler(data) {
		console.log(data);
		inProgress = false;
	}

}