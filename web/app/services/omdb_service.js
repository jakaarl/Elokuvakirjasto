Elokuvakirjasto.service('Omdb', function($http) {
    this.findMovies = function(name, year){
        return $http.get('http://www.omdbapi.com', { params: { s: name, y: year }});
    };
});