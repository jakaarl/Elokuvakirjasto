Elokuvakirjasto.controller('ViewMovie', function($scope, $routeParams, Firebase) {
    
    Firebase.getMovie($routeParams.key, function(movie) {
        $scope.movie = movie;
    });
    
});