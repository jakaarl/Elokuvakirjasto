describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock, locationMock;
    var key = "5215haET";
    var originalMovie = {
        $id: key,
        name: "Pink Flamingos",
        director: "John Waters",
        year: "1972",
        description: "A campy cult classic."
    };
    var movie;

    beforeEach(function () {
        module('Elokuvakirjasto');

        RouteParamsMock = (function () {
            return {
                key: key
            };
        });

        FirebaseServiceMock = (function () {
            return {
                getMovie: function (key, callback) {
                    callback(originalMovie);
                },
                saveMovie: function (saved) {
                    movie = saved;
                }
            };
        })();

        locationMock = (function () {
            return {
                path: function (value) {

                }
            };
        })();

        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'saveMovie').and.callThrough();
        spyOn(locationMock, 'path').and.callThrough();

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('EditMovie', {
                $scope: scope,
                $routeParams: RouteParamsMock,
                $location: locationMock,
                Firebase: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.movie).toEqual(originalMovie);
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.movie.year = 1997;
        scope.movie.description = "25th anniversary edition of the original.";
        scope.submitForm();
        expect(movie.year).toEqual(scope.movie.year);
        expect(movie.description).toEqual(scope.movie.description);
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
        expect(FirebaseServiceMock.saveMovie).toHaveBeenCalled();
        expect(locationMock.path).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.movie.description = undefined;
        scope.submitForm();
        expect(movie.description).toEqual(originalMovie.description);
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
        expect(FirebaseServiceMock.saveMovie).not.toHaveBeenCalled();
        expect(locationMock.path).not.toHaveBeenCalled();
    });
});