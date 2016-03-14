angular
	.module('Books')
	.factory('AuthorService', ['$http', function($http) {
		return {
			addAuthor: addAuthor,
			deleteAuthor: deleteAuthor,
			updateAuthor: updateAuthor,
			getBooksByAuthorId: getBooksByAuthorId,
			getFactsByAuthorId: getFactsByAuthorId,
			searchAuthor: searchAuthor,
			getAllAuthors: getAllAuthors
		};

		function addAuthor(author) {
			return $http.put('/api/author', author);
		}

		function deleteAuthor(authorId) {
			return $http.delete('/api/author/'+ authorId);
		}

		function updateAuthor(authorId, author){
			return $http.post('/api/author/'+authorId, author);
		}

		function getBooksByAuthorId(authorId) {
			return $http.get('/api/author/'+ authorId +'/books');
		}

		function getFactsByAuthorId(authorId) {
			return $http.get('/api/author/'+ authorId +'/facts');
		}
		
		function searchAuthor(search) {
			return $http.get('/api/authors/search/'+search);
		}

		function getAllAuthors() {
			return $http.get('/api/authors');
		}
	}]);