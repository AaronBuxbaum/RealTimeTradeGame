angular.module('RealTimeTrade').controller('RealTimeTradeCtrl', function (AuthenticationService) {
    var ctrl = this;

	ctrl.loadingStyle = {
		'background-image': 'url(http://thenextweb.com/wp-content/blogs.dir/1/files/2013/04/stocks.jpg)',
		'background-size': 'cover',
		'height': '100%',
		'width': '100%'
	};
	
	//Changes the object when authentication state changes
	AuthenticationService.auth.$onAuth(function (authState) {
		ctrl.isAuthenticated = !!authState;
	});
});