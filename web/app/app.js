var Elokuvakirjasto = angular.module('Elokuvakirjasto', ['ngRoute', 'firebase']);

Elokuvakirjasto.config(function ($routeProvider) {
    $routeProvider
            .when('/', { controller: 'ListMovies', templateUrl: 'app/views/movies.html' })
            .when('/movies', { controller: 'ListMovies', templateUrl: 'app/views/movies.html' })
            .when('/movies/new', { controller: 'AddMovie', templateUrl: 'app/views/add_movie.html' });
});
