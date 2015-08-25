Elokuvakirjasto.controller('EditMovie', function($scope, $rootScope, $routeParams, $location,  Firebase) {
    if (!$rootScope.loggedInUser) {
        $location.path('/login');
    }
    
    Firebase.getMovie($routeParams.key, function(movie) {
        $scope.movie = movie;
    });
    
    $scope.submitForm = function() {
        if ($scope.movie.name
                && $scope.movie.director
                && $scope.movie.year
                && $scope.movie.description) {
            Firebase.saveMovie($scope.movie);
            $location.path('/movies/' + $scope.movie.$id);
        }
    };
});