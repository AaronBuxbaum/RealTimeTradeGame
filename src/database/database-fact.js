Database.factory('DatabaseService', function ($firebaseArray, $firebaseObject) {
	var svc = this;
	
	//Get firebase reference
	svc.ref = new Firebase("https://realtimetrade.firebaseio.com/league");
	
	//Return firebase reference object
	svc.getReference = function () {
		return svc.ref;
	};
	
	//Return firebase sync object
	svc.getSyncObject = function () {
		return $firebaseObject(svc.ref);
	};
	
	svc.getSyncArray = function (ref) {
		return $firebaseArray(svc.ref);
	};
	
	return svc;
});