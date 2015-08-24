Elokuvakirjasto.controller('AddMovie', function($scope, $location, Firebase) {
    $scope.name;
    $scope.director;
    $scope.year;
    $scope.description;
    
    $scope.submitForm = function() {
        if ($scope.name
                && $scope.director
                && $scope.year
                && $scope.description) {
            var movie = {
                name: $scope.name,
                director: $scope.director,
                year: $scope.year,
                description: $scope.description
            };
            if (Firebase.addMovie(movie)) {
                $location.path('/movies');
            }
        }
    };
});