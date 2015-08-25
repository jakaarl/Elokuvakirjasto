Elokuvakirjasto.controller('AddMovie', function($scope, $rootScope, $location, Firebase) {
    if (!$rootScope.loggedInUser) {
        $location.path('/login');
    }
    $scope.movie = {};
    
    $scope.submitForm = function() {
        if ($scope.movie.name
                && $scope.movie.director
                && $scope.movie.year
                && $scope.movie.description) {
            if (Firebase.addMovie($scope.movie)) {
                $location.path('/movies');
            }
        }
    };
});