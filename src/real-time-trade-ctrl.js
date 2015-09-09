angular.module('RealTimeTrade').controller('RealTimeTradeCtrl', function (AuthenticationService) {
    var ctrl = this;
	
	//Changes the object when authentication state changes
	AuthenticationService.auth.$onAuth(function (authState) {
		ctrl.isAuthenticated = !!authState;
	});
});