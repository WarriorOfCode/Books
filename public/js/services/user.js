angular
	.module('Books')
	.factory('UserService', ['$http', function($http) {
		return {
			checkFollowing: checkFollowing,
			unsubscribe: unsubscribe,
			subscribe: subscribe,
			getFollowers: getFollowers,
			getFollowing: getFollowing,
			getUserBooks: getUserBooks,
			getUserReviews: getUserReviews,
			deleteReview: deleteReview,
			getCitations: getCitations,
			deleteCitation: deleteCitation,
			addOffer: addOffer,
			getAllOffers: getAllOffers,
			deleteOffer: deleteOffer,
			addUser: addUser,
			login: login,
			logout: logout,
			editPersonalInformation: editPersonalInformation,
			editPassword: editPassword
		};

		/**
		 * Work with follower and following.
		 */
		function checkFollowing(userId) {
			return $http.get('/api/checkFollowing/'+ userId);
		}

		function unsubscribe(userId) {
			return $http.delete('/api/friend/' + userId);
		}

		function subscribe(userId) {
			return $http.put('/api/friend/', { userId: userId });
		}

		function getFollowers(userId) {
			return $http.get('/api/user/'+userId+'/follower/');
		}

		function getFollowing(userId) {
			return $http.get('/api/user/'+userId+'/following/');
		}

		/**
		 * Work with book of user.
		 */
		function getUserBooks(userId) {
			return $http.get('/api/user/books/'+userId);
		}

		/**
		 * Work with user reviews.
		 */
		function getUserReviews(userId) {
			return $http.get('/api/user/'+userId+'/reviews');
		}

		function deleteReview(reviewId) {
			return $http.delete('/api/book/review/'+reviewId);
		}

		/**
		 * Work with citations.
		 */
		function getCitations(userId) {
			return $http.get('/api/user/'+userId+'/citations');
		}

		function deleteCitation(citationId) {
			return $http.delete('/api/book/citation/'+citationId);
		}

		/**
		 * Work with offer.
		 */		
		function addOffer(offer) {
			return $http.put('/api/offer', offer);
		}

		function getAllOffers() {
			return $http.get('/api/offers');
		}

		function deleteOffer(offerId) {
			return $http.delete('/api/offer/'+offerId)
		}

		/**
		 * Work with login.
		 */
		function addUser(user) {
			return $http.put('/api/user', user)
		}

		function login(user) {
			return $http.post('/api/login', user)
		}

		function logout() {
			return $http.get('/api/out');
		}

		/**
		 * Work with personal information.
		 */
		function editPersonalInformation(user) {
			return $http.post('/api/edit', user)
		}

		function editPassword(password) {
			return $http.post('/api/edit', password)
		}

	}]);