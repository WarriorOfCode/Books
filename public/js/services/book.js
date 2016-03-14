angular
	.module('Books')
	.factory('BookService', ['$http', function($http) {
		return {
			getAllBooks: getAllBooks,
			addBook: addBook,
			deleteBook: deleteBook,
			updateBook: updateBook,
			getFactByBookId: getFactByBookId,
			addMark: addMark,
			updateMark: updateMark,
			deleteMark: deleteMark,
			getMark: getMark,
			getAuthorsByBookId: getAuthorsByBookId,
			checkUserReadedByBookId: checkUserReadedByBookId,
			deleteReadedMark: deleteReadedMark,
			addReadMark: addReadMark,
			deleteReadMark: deleteReadMark,
			deleteWillReadMark: deleteWillReadMark,
			getListsByBookId: getListsByBookId,
			getReviewsByBooksId: getReviewsByBooksId,
			addReview: addReview,
			deleteReview: deleteReview,
			getCitationsByBookId: getCitationsByBookId,
			addCitation: addCitation,
			deleteCitation: deleteCitation

		};

		function getAllBooks() {
			return $http.get('/api/books');
		}

		/**
		* Creation and deletion
		*/
		function addBook(book) {
			return $http.put('/api/book', book);
		}

		function deleteBook(bookId) {
			return $http.delete('/api/book/'+ bookId)
		}

		function updateBook(bookId, book){
			return $http.post('/api/book/' + bookId, book);
		}

		/**
		 * Work with fact about book.
		 */
		function getFactByBookId(bookId) {
			return $http.get('/api/book/'+bookId+'/facts');
		}
		
		/**
		 * Work with Marks of book.
		 */
		function addMark(bookId, mark) {
			return $http.put('/api/book/'+bookId+'/mark', {rate: mark});
		}
		
		function updateMark(bookId, mark) {
			return $http.post('/api/book/'+bookId+'/mark', {rate: mark});
		}	

		function deleteMark(bookId) {
			return $http.delete('/api/book/'+bookId+'/mark');
		}

		function getMark(bookId) {
			return $http.get('/api/book/'+bookId+'/mark');
		}

		/**
		 * Work with authors of book.
		 */
		function getAuthorsByBookId (bookId){
			return $http.get('/api/book/'+bookId+'/authors')
		}

		/**
		 * Work with folder of user
		 */
		function checkUserReadedByBookId(bookId) {
			return $http.get('/api/book/user/'+bookId);
		}

		function deleteReadedMark(bookId) {
			return $http.delete('/api/book/user/'+bookId);
		}

		function addReadMark(bookId, time) {
			return $http.put('/api/book/user', { bookId: bookId, progress: time});
		}

		function deleteReadMark(bookId) {
			return $http.delete('/api/book/user/inPresent/'+bookId);
		}

		function deleteWillReadMark(bookId) {
			return $http.delete('/api/book/user/inFuture/'+bookId);
		}

		/**
		 * Work with list.
		 */
		function getListsByBookId(bookId) {
			return $http.get('/api/book/lists/'+bookId);
		}

		/**
		 * Work with reviews.
		 */
		function getReviewsByBooksId(bookId) {
			return $http.get('/api/book/'+bookId+'/review');
		}

		function addReview(bookId, review) {
			return $http.put('/api/book/'+bookId+'/review', review);
		}

		function deleteReview(reviewId) {
			return $http.delete('/api/book/review/'+reviewId);
		}

		/**
		 * Work with citations.
		 */
		function getCitationsByBookId(bookId) {
			return $http.get('/api/book/'+bookId+'/citations');
		}

		function addCitation(bookId, citation) {
			return $http.put('/api/book/'+bookId+'/citation', {text: citation});
		}

		function deleteCitation(citationId) {
			return $http.delete('/api/book/citation/'+citationId);
		}

	}]);