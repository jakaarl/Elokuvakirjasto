Elokuvakirjasto.controller('ListMovies', function($scope, Firebase) {
    $scope.movies = Firebase.getMovies();
    
    $scope.deleteMovie = function(movie) {
        Firebase.deleteMovie(movie);
    };
});


