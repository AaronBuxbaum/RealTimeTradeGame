RealTimeTrade.controller('RealTimeTradeCtrl', function (AuthenticationService) {
    var ctrl = this;

	ctrl.leagueName = 'Example League';
	
	//TODO: why doesn't this work?
	//ctrl.isAuthenticated = AuthenticationService.isAuthenticated;

	//Changes the object when authentication state changes
	AuthenticationService.auth.$onAuth(function (authState) {
		ctrl.isAuthenticated = !!authState;
	});
});