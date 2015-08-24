describe('Add movie', function(){
	var controller, scope;

	var FirebaseMock;

  	beforeEach(function(){
            module('Elokuvakirjasto');

            FirebaseMock = (function(){
                var movies = [];
                return {
                    getMovies: function() {
                        return movies;
                    },
                    addMovie: function(movie) {
                        movies.push(movie);
                    }
                };
            })();

	    spyOn(FirebaseMock, 'getMovies').and.callThrough();
            spyOn(FirebaseMock, 'addMovie').and.callThrough();

	    inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                controller = $controller('AddMovie', {
                    $scope: scope,
                    Firebase: FirebaseMock
                });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
            scope.name = 'Plan 9 from Outer Space';
            scope.director = 'Ed Wood';
            scope.year = '1959';
            scope.description = 'Worst movie ever made!';
            scope.submitForm(true);
            expect(FirebaseMock.getMovies().length).toBe(1);
            expect(FirebaseMock.addMovie).toHaveBeenCalled();
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
            scope.director = 'Ed Wood';
            scope.year = '1959';
            scope.description = 'Worst movie ever made!';
            scope.submitForm(true);
            expect(FirebaseMock.getMovies().length).toBe(0);
            expect(FirebaseMock.addMovie).not.toHaveBeenCalled();
	});
});