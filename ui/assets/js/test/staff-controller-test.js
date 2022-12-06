'use strict';

  describe('StaffController', function() {
	   var $controller,  $httpBackend,userServiceMock,dataServiceMock;	   
	beforeEach(module('myApp'));
	
	 beforeEach(module('myApp', function($provide) {
		 userServiceMock = {
		    	dataLoad: jasmine.createSpy(),
		    	initAlphabets :jasmine.createSpy()		    	
		    };		   
		    $provide.value('UserSrvc', userServiceMock);		    
	  }));	 
	 
	 beforeEach(module('myApp', function($provide) { 
		 dataServiceMock = {		    	
		    	table :  jasmine.createSpy()		    	
		    };
	    $provide.value('DataService', dataServiceMock);
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
		    // $httpBackend.verifyNoOutstandingExpectation();
		    // $httpBackend.verifyNoOutstandingRequest();
		   });
	  
//	  describe('$scope.grade', function() {
//	    it('sets the strength to "strong" if the password length is >8 chars', function() {
//	      var $scope = {};
//	      var controller = $controller('StaffController', { $scope: $scope });
//	      $scope.password = 'longerthaneightchars';
//	      $scope.grade();
//	      expect($scope.strength).toEqual('strong');
//	    });
//	  });
	
	  
	   describe('$scope.registerStaff for add staff', function() {
	    it('add staff', function() { 
		      var $scope = {};		      
		      var controller = $controller('StaffController', { $scope: $scope });
		     // $httpBackend.expectGET(ROOT_URL_TEST+'/getAllStaff').respond(200,'success');
		      $scope.newUser = {"email":"anubhav@gmail.com" , "is_available":0 , "left_date":"2016-04-30" ,"name":"Anubhav" ,"on_duty":"EMPLOYED","phone_no":"8882178768","report_to":1,"slot_end":"18:11:59","slot_start":"09:11:59","staff_type":1};
	         $httpBackend.expectPOST(ROOT_URL_TEST+'/addStaff', $scope.newUser).respond(200,{'status':'success','message':'Staff Member added successfully.'} );
	         $scope.registerStaff(true) 
	         //$httpBackend.flush();
	         expect($scope.success).toEqual('Staff Member added successfully.');
	    });
	  });
//	   describe('$scope.registerStaff for update staff', function() {
//		    it('update staff', function() { 
//			      var $scope = {};
//			      var controller = $controller('StaffController', { $scope: $scope });
//			      $scope.newUser = {"email":"anubhav@gmail.com" , "is_available":0 ,"join_date":"2016-04-26", "left_date":"2016-04-30" ,"name":"Anubhav" ,"on_duty":"EMPLOYED","phone_no":"8882178768","report_to":1,"slot_end":"18:11:59","slot_start":"09:11:59","staff_type":1};
//		         $httpBackend.expectPOST(ROOT_URL_TEST+'/addStaff', $scope.newUser).respond(200,{'status':'success','message':'Staff updated successfully.'} );
//		         $scope.registerStaff(true,1) 
//		          $httpBackend.flush();
//		         expect($scope.success).toEqual('Staff updated successfully.');
//		    });
//		  });
//	   describe('$scope.loaddropdown for showing ComplaintTypeList', function() {
//		    it('ComplaintTypeList', function() { 
//			      var $scope = {};
//			      var controller = $controller('StaffController', { $scope: $scope });
//		         $httpBackend.expectGET(ROOT_URL_TEST+'/complaintTypeList').respond(200);
//		         $httpBackend.expectGET(ROOT_URL_TEST+'/getStaffTypeList').respond(200);
//		         $httpBackend.expectGET(ROOT_URL_TEST+'/constant/empstatus').respond(200);
//		        // $httpBackend.expectGET(ROOT_URL_TEST+'/getAllStaff').respond(200);
//		         $scope.loadDropDown() 
//		          $httpBackend.flush();
//		         expect($scope.status1).toEqual(200);
//		         expect($scope.status2).toEqual(200);
//		         expect($scope.status3).toEqual(200);
//		        // expect($scope.status4).toEqual(200);
//		    });
//		  });
//	   describe('$scope.searchItems for showing StaffList', function() {
//		    it('StaffList by name', function() { 
//			      var $scope = {};			    
//			      var controller = $controller('StaffController', { $scope: $scope });
//		         $httpBackend.expectGET(ROOT_URL_TEST+'/getStaffBy'+'Name'+'/Rohit').respond(200);
//		         $scope.searchItems('Name',['Rohit']);		        
//		         expect($scope.status).toEqual(200);
//		         $httpBackend.flush(); 
//		          $scope.$digest();
//		    });
//		  });
//	   
	  
	  
	});
