var Elokuvakirjasto = angular.module('Elokuvakirjasto', ['ngRoute', 'firebase', 'validation.match']);

Elokuvakirjasto.config(function ($routeProvider) {
    $routeProvider
            .when('/', { controller: 'ListMovies', templateUrl: 'app/views/movies.html' })
            .when('/login', { controller: 'UserManagement', templateUrl: 'app/views/login.html' })
            .when('/register', { controller: 'UserManagement', templateUrl: 'app/views/register.html' })
            .when('/movies', { controller: 'ListMovies', templateUrl: 'app/views/movies.html' })
            .when('/movies/new', { controller: 'AddMovie', templateUrl: 'app/views/add_movie.html' })
            .when('/movies/find', { controller: 'FindMovies', templateUrl: 'app/views/find_movies.html'})
            .when('/movies/:key', { controller: 'ViewMovie', templateUrl: 'app/views/view_movie.html' })
            .when('/movies/:key/edit', { controller: 'EditMovie', templateUrl: 'app/views/edit_movie.html' });
}).config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]).run(function($rootScope, AuthenticationService) {   
    $rootScope.loggedInUser = AuthenticationService.getLoggedInUser();
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();    
    };
});
