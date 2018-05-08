angular.module('socialRemedy', ['ngAnimate', 'ngRoute'])
	.config(function($routeProvider, $locationProvider) {

		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		})
		.when('/cliente', {
			templateUrl: 'partials/cliente.html',
			controller: 'ClienteController'
		});

		$routeProvider.otherwise({redirectTo: '/home'});
	});