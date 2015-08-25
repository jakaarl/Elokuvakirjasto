Elokuvakirjasto.service('Firebase', function($firebase) {
    var firebaseRef = new Firebase('https://blazing-fire-8325.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function() {
        return movies;
    };
    
    this.getMovie = function(key, callback) {
        movies.$loaded(function() {
            callback(movies.$getRecord(key));
        });
    };
    
    this.addMovie = function(movie) {
        for (var i = 0; movies.length > i; i++) {
            var other = movies[i];
            if (movie.name === other.name
                    && movie.director === other.director
                    && movie.year === other.year
                    && movie.description === other.description) {
                return false;
            }
        }
        movies.$add(movie);
        return true;
    };
    
    this.saveMovie = function(movie) {
        movies.$save(movie);
    };
    
    this.deleteMovie = function(movie) {
        movies.$remove(movie);
    };
});
