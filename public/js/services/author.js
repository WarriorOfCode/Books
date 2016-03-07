angular
    .module('Books')
    .factory('AuthorService', ['$http', function($http) {
        return {
            getBooksByAuthorId: getBooksByAuthorId,
            getFactsByAuthorId: getFactsByAuthorId
        };

        function getBooksByAuthorId(authorId) {
            return $http.get('/api/author/'+ authorId +'/books');
        }

        function getFactsByAuthorId(authorId) {
            return $http.get('/api/author/'+ authorId +'/facts');
        }
    }]);
