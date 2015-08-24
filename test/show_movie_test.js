describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
            module('Elokuvakirjasto');
            
            var key = "12351234adfh";
            RouteParamsMock = (function(){
                return {
                    key: key
                };
            });
            
            FirebaseServiceMock = (function(){
                this.movie = {
                    $id: key,
                    name: "The Adventures of Priscilla, Queen of the Desert",
                    director: "Stephan Elliott",
                    year: "1994",
                    description: "A surprisingly tender and thoughtful road movie with some outstanding performances."
                };
                return {
                    getMovie: function(key, callback) {
                        callback(this.movie);
                    }
                };
            })();

            

            spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      controller = $controller('ViewMovie', {
	        $scope: scope,
                $routeParams: RouteParamsMock,
	        Firebase: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
            expect(scope.movie).toEqual(FirebaseServiceMock.movie);
            expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
	});
});