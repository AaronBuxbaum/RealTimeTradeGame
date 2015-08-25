Database.factory('DatabaseService', function ($firebaseObject, $firebaseArray) {
	var svc = this;
	
	//Get firebase reference
	svc.ref = new Firebase("https://realtimetrade.firebaseio.com/examplePlayer");
	svc.examplePlayer = $firebaseObject(svc.ref);
	
	//Return firebase reference object
	svc.getReference = function () {
		return svc.ref;
	};
	
	//Return firebase sync object
	svc.getSyncObject = function () {
		return svc.examplePlayer;
	};

	svc.getSyncArray = function (ref) {
		return $firebaseArray(svc.ref);
	};

	return svc;
});