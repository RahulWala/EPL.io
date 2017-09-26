app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
		.when('/first',{
			templateUrl: 'Pages/first.html',
			controller: 'engPreLea',
			controllerAs: 'EPL'
		})
		 .when('/second-view',{
		 	templateUrl: 'Pages/second.html',
		 	controller: 'engPreLea',
		 	controllerAs: 'EPL'   
		 })
		.otherwise({redirectTo: '/index.html'});

	$locationProvider
	.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);