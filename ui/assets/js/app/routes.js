'use strict';

var ROOT_URL_TEST = "http://localhost/isocietymanager.com/api";  
	
var myApp = angular.module('myApp', ['ngRoute','ngSanitize', 'ui.bootstrap', 'ngTable','ngTableExport','ngStorage','angularTreeview','ui.bootstrap.typeahead','AxelSoft']);


//myApp.run(function($http,$localStorage) {
//	console.log('Token-----');
//	console.log($localStorage.loggedinUser)
//	if($localStorage.loggedinUser){	
//		console.log('Token--If---');
//		console.log($localStorage.loggedinUser)
//		  $http.defaults.headers.common['api-token'] = $localStorage.loggedinUser.api_token;
//		  $http.defaults.headers.common['user-id'] = $localStorage.loggedinUser.id;
//	}
//	});

myApp.config(function($routeProvider,$httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
	
	
    $routeProvider.when(
        	'/dashboard', 
        	{
        		templateUrl: 'static/admin/view/dashboard.html', 
        		controller: 'AdminDashboardController'
        	});
    
    $routeProvider.when(
        	'/template', 
        	{
        		templateUrl: 'static/admin/view/template.html', 
        		controller: 'TemplateController'
        	});
    $routeProvider.when(
        	'/order-details', 
        	{
        		templateUrl: 'static/admin/view/order-details.html', 
        		controller: 'OrderDetailsController'
        	});
    $routeProvider.when(
        	'/profile', 
        	{
        		templateUrl: 'static/admin/view/profile.html', 
        		controller: 'ProfileController'
        	});
    $routeProvider.when(
        	'/manage-store', 
        	{
        		templateUrl: 'static/admin/view/manage-store.html', 
        		controller: 'ManageStoreController'
        	});
    
    
   		
    $routeProvider.when(
        	'/index', 
        	{
        		template: 'Hello -', 
        		controller: 'IndexController'
        	});  
//    $routeProvider.otherwise(
//        {
//            redirectTo: '/dashboard'
//        });

  
			
    
    
   
		$routeProvider.when(
        	'/index', 
        	{
        		template: 'Hello -', 
        		controller: 'IndexController'
        	});  
	
    $routeProvider.otherwise(
        {
            redirectTo: '/login'
        });

});
myApp.run(function($rootScope, $route, $location){
	
	   $rootScope.$on('$locationChangeSuccess', function() {
	        $rootScope.actualLocation = $location.path();
	    });        

	   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
//	            console.log(newLocation);
//	            console.log($rootScope.actualLocation);
	    });
	});

