Elokuvakirjasto.controller('FindMovies', function($scope, Omdb) {
    $scope.name;
    $scope.year;
    $scope.submitted = false;
    $scope.movies = [];
    
    $scope.findMovies = function() {
        if ($scope.name && $scope.year) {
            Omdb.findMovies($scope.name, $scope.year).success(function(response) {
                $scope.movies = response.Search || [];
                $scope.submitted = true;
            });
        }
    };
});