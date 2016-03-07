angular
    .module('Books')
    .controller('AuthorCtrl', ['$scope', 'AuthorService', 'author', AuthorCtrl])
    .controller('FactsCtrl', ['$scope', 'AuthorService', 'author', FactsCtrl]);

function AuthorCtrl($scope, AuthorService, author) {
    var authorId = author.id;
    $scope.birthDate = author.Birth_date && new Date(Date.parse(author.Birth_date));

    AuthorService.getBooksByAuthorId(authorId)
        .success(function(data){
            $scope.books = data;
        })
        .error(function(data){
            console.log(data);
        });
}

function FactsCtrl($scope, AuthorService, author) {
    var authorId = author.id;

    AuthorService.getFactsByAuthorId(authorId)
        .success(function(data){
            $scope.facts = data;
            $scope.firstFact = $scope.facts[0];
            $scope.facts.splice(0, 1);
        })
        .error(function(data){
            console.log(data);
        });
}