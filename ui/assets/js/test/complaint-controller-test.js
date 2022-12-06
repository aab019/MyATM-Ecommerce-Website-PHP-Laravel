'use strict';

  describe('StaffController', function() {
	   var $controller,  $httpBackend, mockedFactory;	   
	beforeEach(module('myApp'));
	
	 beforeEach(module('myApp', function($provide) {
		    mockedFactory = {
		    	showDetail: jasmine.createSpy()
		    };

		    $provide.value('MsgSrvc', mockedFactory);
	  }));
	  beforeEach(inject(function($injector) {
		     // Set up the mock http service responses
		     $httpBackend = $injector.get('$httpBackend');
		   }));
	  
	 
	  beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	  }));
	  
	  afterEach(function() {
		     $httpBackend.verifyNoOutstandingExpectation();
		     $httpBackend.verifyNoOutstandingRequest();
		   });
	
	   describe('$scope.loaddropdown call  services for load data into list', function() {
		    it('ComplaintController loaddropdown services', function() { 
			      var $scope = {};
			      var controller = $controller('ComplaintController', { $scope: $scope });
		         $httpBackend.expectGET(ROOT_URL_TEST+'/complaintTypeList').respond(200);
		         $httpBackend.expectGET(ROOT_URL_TEST+'/constant/complaintstatus').respond(200);
		         $httpBackend.expectGET(ROOT_URL_TEST+'/getStaffList').respond(200);
		         $httpBackend.expectGET(ROOT_URL_TEST+'/getAllStaff').respond(200);
		         $httpBackend.expectGET(ROOT_URL_TEST+'/getStaffTypeList').respond(200);
		         $scope.loadDropDown() 
		        $httpBackend.flush();
		         console.log($scope.status1)
		         expect($scope.status1).toEqual(200);
		         expect($scope.status2).toEqual(200);
		         expect($scope.status3).toEqual(200);
		       expect($scope.status4).toEqual(200);
		       expect($scope.status5).toEqual(200);
		    });
		  });
	   
	   describe('$scope.openStaffDetail for show staff detail', function() {
		    it('show staff detail', function() { 
			      var $scope = {};
			      $scope.newUser=3759
			      var controller = $controller('ComplaintController', { $scope: $scope });
		         $httpBackend.expectGET(ROOT_URL_TEST+'/staffDetail/'+$scope.newUser).respond(200);
		         $scope.openStaffDetail(1) 
		          $httpBackend.flush();
		         expect($scope.status).toEqual(200);
		    });
		  });
	   describe('$scope.showComplaintDetail for show complaint detail', function() {
		    it('show complaint detail', function() { 
			      var $scope = {};
			      var controller = $controller('ComplaintController', { $scope: $scope });
		         $scope.showComplaintDetail() 
		         expect($scope.log).toEqual($scope.complain);
		    });
		  });
	});
