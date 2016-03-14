angular
	.module('Books')
	.factory('ListService', ['$http', function($http) {
		return {
			searchList: searchList,
			getLists: getLists,
			getBookInLists: getBookInLists,
			getListNewBooks: getListNewBooks,
			getListRatingBooks: getListRatingBooks
			
		};

		function getLists() {
			return $http.get('/api/lists');
		}

		function getBookInLists() {
			return $http.get('/api/lists/books');
		}

		function searchList(search) {
			return $http.get('/api/lists/search/'+search);
		}

		function getListNewBooks() {
			return $http.get('/api/lists/newBooks');
		}

		function getListRatingBooks() {
			return $http.get('/api/lists/rating');
		}
		
	}]);