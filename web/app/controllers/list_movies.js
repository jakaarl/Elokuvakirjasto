Elokuvakirjasto.controller('ListMovies', function($scope, $location, Firebase) {
    $scope.movies = Firebase.getMovies();
});


