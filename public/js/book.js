angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', '$window', ReadCtrl])
	.controller('ListCtrl', ['$scope', '$http', ListCtrl])
	.controller('ReviewCtrl', ['$scope', '$http', '$window', ReviewCtrl]);

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

function ListCtrl($scope, $http){
	var bookId = location.pathname.replace("/book/", "");

	$http.get('/api/book/lists/'+bookId)
	.success(function(data){
		$scope.lists = data;
	})
	.error(function(data){
		console.log(data);
	})
}

function ReviewCtrl($scope, $http, $window){

	var bookId = location.pathname.replace("/book/", "");

	$http.get('/api/book/'+bookId+'/review')
	.success(function(data){
		if (data.length>0){
			$scope.reviews = data;
			data.forEach(function(data){
				if (data.NickName == $window.App.login){
					$scope.buttonHide = true;
					return;
				}
			});
		}
	})
	.error(function(data){
		console.log(data);
	})

	$scope.send = function(){
		if ($scope.review != null && $scope.review.body){
			$http.put('/api/book/'+bookId+'/review', $scope.review)
			.success(function(data){
				$scope.checked = !$scope.checked;
			})
			.error(function(data){
				console.log(data);
			})
		}
	}
	
}