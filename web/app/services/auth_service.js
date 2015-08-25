Elokuvakirjasto.service('AuthenticationService', function ($firebase, $firebaseAuth, $rootScope) {
    var firebaseRef = new Firebase('https://blazing-fire-8325.firebaseio.com');
    var firebaseAuth = $firebaseAuth(firebaseRef);
    firebaseAuth.$onAuth(function(authData) {
        $rootScope.loggedInUser = authData;
    });

    this.createUser = function (email, password) {
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    };
    
    this.logUserIn = function (email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    };
    
    this.checkLoggedIn = function () {
        return firebaseAuth.$waitForAuth();
    };
    
    this.logUserOut = function () {
        firebaseAuth.$unauth();
    };

    this.getLoggedInUser = function () {
        return firebaseAuth.$getAuth();
    };
});