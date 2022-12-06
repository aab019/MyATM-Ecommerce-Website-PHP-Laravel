'use strict';

// Login Controller Start
// --------------------------------------------------------------
myApp.controller('LoginController', function($scope, $rootScope, $http,Login,$timeout, SessionService, $modal, CONSTANTS, $filter, DataService,UtilSrvc,$localStorage, $controller,$location, $window,MsgSrvc, $parse) {
	//$controller('AppController',{$scope:$scope})
	$scope.globalObject = {'device':'WEB'}
	function isScriptAlreadyIncluded(src){
	    var scripts = document.getElementsByTagName("script");
	    for(var i = 0; i < scripts.length; i++) {	    	
	       if(scripts[i].getAttribute('src') == src) return true;
	    }
	    return false;
	}
	if(isScriptAlreadyIncluded('cordova.js') == true)
		$scope.globalObject.device = 'APP'
			
	if(localStorage.getItem('loggedinUserIndex')){
		$localStorage.loggedinUser = angular.fromJson(localStorage.getItem('loggedinUserIndex'))
		$scope.loggedinUser = $localStorage.loggedinUser
//		console.log(localStorage.getItem('loggedinUserIndex'));
	}else if($scope.globalObject.device != 'APP'){
			var url = $location.absUrl()
			window.location.href = url.split('home')[0]
	}
	$rootScope.location = $location;
	$scope.setBillConstant = function(name,data){
		var billCons = $parse(name);
		billCons.assign($scope, data);
	}
	//$scope.society = $scope.$parent.sessionValue(CONSTANTS.SOCIETY_KEY);
	$scope.child = {}
	$scope.notificationArray=[]
	$scope.autoRefresh =false;
	$scope.pn = {com:false, com_count:0}
	$rootScope.globalCons = {count: {'resident':0}}	
	function addConstant(result){
		angular.forEach(result, function(val) {
			if(!$rootScope.globalCons[val.type]){
				$rootScope.globalCons[val.type] = {}
			}
			$rootScope.globalCons[val.type][val.id] = val.name
		})
	}
	$scope.addConstantByType = function(result,type,key){
		angular.forEach(result, function(val) {
			if(!$rootScope.globalCons[type]){
				$rootScope.globalCons[type] = {}
			}
			$rootScope.globalCons[type][val[key]] = val.name
		})
	}	
		
	$scope.addConstantByType($scope.messageConstant,'errormsg','code')	
	$scope.userInfo = function(result){
		var userList=[]
			angular.forEach(result,function(val){
				if(val.flat_no !=null)
					userList.push(val)
			})
			$rootScope.globalCons.count.resident=userList.length
			$rootScope.globalCons.users = userList
			$scope.addConstantByType(result,'username','id')
			var flatno = []
			angular.forEach(result, function(val) {		
				flatno.push({flat_no:val.flat_no,id:val.id})			
			})
			$rootScope.globalCons.flatno = flatno
			var flats = []
		var flatToDisplayUnit = []
		var numbersToUnit = []
		var flatsToName=[]
			angular.forEach(result, function(val) {		
				flats.push({id:val.id,name:val.flat_no})
				flatToDisplayUnit.push({id:val.flat_no,name:val.display_unit_no})
				if(val.phone_no){
					numbersToUnit.push({id:val.phone_no,name:val.name})
				}
				flatsToName.push({id:val.flat_no,name:val.name})
			})
			$scope.addConstantByType(flats,'flat','id')
			$scope.addConstantByType(flatToDisplayUnit,'flatToDisplayUnit','id')
			$scope.addConstantByType(numbersToUnit,'name','id')
			$scope.addConstantByType(flatsToName,'unitname','id')
	}
		
		
	
	$scope.unSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    }
	$scope.display = {}
	$scope.showMessage={}
	
	$scope.clearMsg = function(){
		$scope.display = {}
		$scope.showMessage={}
	}
	
	
	$scope.clearMsg()
	$scope.isDashboard=false
	$scope.dashboardCall=function(){
		$scope.isDashboard=true
	}
	$scope.dashboardCallBack=function(){
		$scope.isDashboard=false
	}
	
	$scope.errorMsg=function(result){
		if(result && result.data && result.data.length > 0){
			$scope.display.multiError=result.data
		}else{
			$scope.display.error=result.message
		}
		
	}
	$scope.getHomePageUrl = function() {
		var path = 'static/'
		if($scope.role && $scope.role == $scope.CONS.ROLE_RESIDENT)
			path += 'user/'
		else
			path += 'admin/'							
		path = path+'view/home.html'
		return path
	}
	
	$scope.logout = function() {		
		var loggedInUser = $scope.loggedinUser
		$scope.loggedinUser= null
		$localStorage.$reset()
		var logout = DataService.getRequest('logout');
		var url = $location.absUrl()
		
		logout.success(function(result){
			if(result && result.status=='success'){
				localStorage.removeItem('loggedinUserIndex');
				window.location.reload()
				$scope.$broadcast('logout', loggedInUser);
			}
			
		})
		
	};
	
	$scope.ownPageView={
			view : 'read'
			
	}
	$scope.page={
			view : 'read'
	}
	$scope.changeMod=function(name){
		var dsbURL = '/'+name
		if(dsbURL!=$rootScope.actualLocation){
			$location.path(dsbURL); 
		}
			$scope.ownPageView.view='read'
	}
	
	
	$scope.initLogin = function(){	
//		console.log('initlogin called')
		if($localStorage.loggedinUser){
			$scope.loggedinUser = $localStorage.loggedinUser;
			$scope.name = $scope.loggedinUser.name
			$scope.phone_no = $scope.loggedinUser.phone_no
			$scope.email = $scope.loggedinUser.email
		}
	}
	
	$scope.changeModule = function(item){
		$scope.changeMod(item)
	}
	
	
	
	$rootScope.$on("CallInitialDataFromParent", function(){
		var users = DataService.getRequest('getUserById/'+$scope.loggedinUser.id);
		users.success(function(result) {
			if( result && result.status == CONSTANTS.STATUS_OK){
			$scope.name = result.data.name
			$scope.phone_no = result.data.phone_no
			$scope.email = result.data.email	
			}
		})	 
     });
	
	
	$scope.initLogin()	
	$scope.sessionValue = function(key) {	
		if($scope.loggedinUser){
		var val = $scope.loggedinUser[key]
		if(val)
			return val
		}
		return null
	}
	
	$scope.isAuthorize = function(roles) {
			var authorize = false;
			if ($scope.loggedinUser) {
				var userRole = $scope.loggedinUser.role;
				angular.forEach(roles, function(role) {
					if (userRole == role)
						authorize = true;
				});
			}
			return authorize;
	}
	$scope.item={}
	$scope.loading=false
	
	/*otp functioin */
	$scope.otp={
			'form':null,
			'val' : null
	}
	$scope.chpwd = {
		'pswd':'',
		'cpswd':''
	}
	/*$scope.otpVal = function(){
		console.log("validate")
	}*/
	
	$scope.fsLogin = function() {
		var data = {
			'phone' : $scope.item.identity 
		}
		var result = DataService.postRequest('firstLogin',data);
		result.success(function(result) {
			if(result.status == 'success'){
				$scope.clearMsg()
				$scope.otp.form = 'fs-ok';
			}
			else{
				$scope.display.error=result.message;
			}
			
		})
	}
	
	
	
	
	$scope.login=function(item){
		$scope.loading=true
		$scope.clearMsg()
		var msg = 'Please Enter Values !!';
		if (item.length == 0 || !item.identity) {
			$scope.display.error=msg
			$scope.checkLogin(msg);
			return;
		}

		if(!item.action){
			item.action='Login';		
		}	
		
		if (item.action == 'Login') {
			if (!item.password) {
				$scope.display.error=msg
				$scope.checkLogin(msg);
				return;
			}
			var auth = Login.auth(item);
			auth.success(function(response) {
				$scope.loading=false
				if (response.status == CONSTANTS.STATUS_OK) {						
					$localStorage.loggedinUser = response.data
					$scope.initLogin()
					$scope.$broadcast('login',response)
					if($localStorage.loggedinUser.role=='resident' || $localStorage.loggedinUser.role=='member'){
						 var substring = "home.html#/login";
						var url = $location.absUrl()
						if(url.includes(substring)){
							$timeout(function() {
							url = url.replace("home.html#/login", "home.html#/dashboard");
							window.location.href = url+''},500)
						}else{
							$scope.changeMod('dashboard')
						}
						 
					}else{
						$scope.changeMod('dashboard')
					}
					
					
				}else if (response.status == 'multipleLogin') {
					angular.forEach(response.data,function(value){
						if(value.flat_no == null){
								value.flat_no = value.name
							}
					})
					$scope.multipleFlats=response.data
					$scope.display.warning=response.message
				} 
				else {
					$scope.display.error=response.message
					$scope.checkLogin(response.message);	
				}
			});
			auth.error(function(response) {
			});
		} else {
			var result = $scope.otpCheck(item.identity);
			$scope.loading=false
			
		}
	}

	$scope.checkLogin = function(msg) {
//		initGlobalConstant()
			if (!$scope.loggedinUser) {
			$scope.item = {
				heading : 'User Login ',
				action : 'Login',
				error : msg
			};
		} 
	}
	
	$scope.menuToggle = true;
	$scope.menu = function() {
		$scope.menuToggle = !$scope.menuToggle;
	};
		
	$scope.loggedin = false;
	
	$scope.logoUrl=''
	$scope.getLogoUrl = function(id){
		var data = DataService.getRequest('societyImgPath/'+id)
		data.success(function(result) {
			if(result && result.status == CONSTANTS.STATUS_OK ){
				$scope.logoUrl = result.img
			}
		})
	}
//	$scope.changeView = function(view) {
//		UtilSrvc.changeView($scope, view)
//	}
	$scope.notificationClicked=function(){
				$scope.pn = {com:false, com_count:0}
			}
	
	$scope.opened = [ false, false, false,false, false, false,false, false, false,false, false, false ];
	$scope.open = function($event, index) {
		//console.log(index);
		$event.preventDefault();
		$event.stopPropagation();
		for (var i = 0; i < $scope.opened.length; i++) {
			if (i == index) {
				$scope.opened[i] = true;
			} else {
				$scope.opened[i] = false;
			}
		}
	};
	
	
	
	
	$scope.comparePermission = function(prev, curr){
		var check1 = true;
		var check2 = true;
		var keepGoing = true
		angular.forEach(prev, function(val, key) {
			if(keepGoing){
				if(curr[key] != val){
//					console.log(val)
					check1 = false
					keepGoing = false
				}
			}
		})
		if(check1){
			keepGoing = true
			angular.forEach(curr, function(val, key) {
				if(keepGoing){
					if(prev[key] != val){
//						console.log(val)
						check1 = false
						keepGoing = false
					}
				}
			})
		}
		return (check1 == true && check2 == true) ? true : false; 
	}
//	$scope.updateUserProfile();
	
	 

	$scope.close=function(){
		$scope.template={url:''}
	}
     $scope.closeOptionDetails = function() {
         $scope.optionModal.close();
     }
     
     $scope.activeMenu =0
     $scope.activateMenu = function(no){
    	 $scope.activeMenu =  no
     }
     $scope.activeBtn =0
     $scope.activateBtn = function(no){
    	 $scope.activeBtn =  no
     }
     
     $scope.reload = function(){
    	 window.location.reload()
     }
     
     
     $scope.noAuth = function() {
			$scope.display.warning="You are not Authorised for this Service please contact Society Admin";
			MsgSrvc.popupMsg($scope.display)
		};
		
		$scope.objCtrl={}
		$scope.objCtrlItem={}
		$scope.objFromCtrl=function(obj,item){
			$scope.objCtrl=obj
			$scope.objCtrlItem=item
		}
		
		
		
		
		$scope.openChangePhotoModal = function (items) {
		    var modalInstance = $modal.open({
		      templateUrl: 'static/shared/view/change-image.html',
		      controller: 'ModalInstCtrl',
		      backdrop : 'static',
		      size: 'sm',
		      resolve: {
		        items: function () {
		          return items;
		        }
		      }
		    });
		    
		    modalInstance.result.then(function (id) {
		    	//$scope.transferBill(id)
		    }, function () {
		     console.log('Modal dismissed at: ' + new Date());
		    });
		  };
		  
		  
		  $scope.pop = function(status, title, message){
		        toaster.pop(status, title, message);
		       
		    };
		    
		   
		    $scope.clear = function(){
//		        toaster.clear();
		    };
		    
		    $scope.activatedMenu
		    $scope.activatingMenu = function(item){
		        $scope.activatedMenu=item
		    };
		    
		    
//		    

});

myApp.controller('ImageUploadController', function($scope, $rootScope, $http,$timeout,$route,  $modal, CONSTANTS,$modalStack, $filter, DataService,UtilSrvc,$localStorage, $window,MsgSrvc) {
	$scope.clearMsg = function(){
		$scope.display = {}
	}
	$scope.clearMsg()
	$scope.addImageAndData = function(image,url,dataObject){
	var fd = new FormData()
				if(image){
					fd.append("file", image.compressed.dataURL)
				}
			
				
				angular.forEach(dataObject, function(value, key) {
					fd.append(key , value)
				});
				
				console.log( fd)
			var ap = $http({
				method : 'POST',
				url : CONSTANTS.BASE_URL + url,
				data : fd,
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
			return ap
}

	$scope.updateUserProfileFromLogin = function() {
        $rootScope.$broadcast("CallupdateUserProfile", {});
//        $scope.$apply();
//        $route.reload()
    }
	
	
	
	
	
$scope.saveImage = function(){
	if(angular.isUndefined($scope.image)){
		$scope.display.warning='Please Select Photo !'
		MsgSrvc.popupMsg($scope.display)
		return
	}
	if($scope.image && !$scope.validateImage($scope.image)){
		$scope.loading = false;
		return
	}
	$scope.loading=true
	$scope.profObj={'societyId':$localStorage.loggedinUser.societyId,'userId':$localStorage.loggedinUser.id}
	var ap = $scope.addImageAndData($scope.image,'addPhoto',$scope.profObj)			
	ap.success(function(result) {
		$scope.loading=false
		if(result && result.status == CONSTANTS.STATUS_OK){	
			$scope.display.success='Photo Updated Successfully !';
			MsgSrvc.popupMsg($scope.display)
			$scope.clearImage()
			$timeout(function(){
		    	 $modalStack.dismissAll("nothing");
		    	},100);
			$scope.updateUserProfileFromLogin()
		}else{
			$scope.display.error=result[CONSTANTS.MSG_KEY]
			MsgSrvc.popupMsg($scope.display)
			}
		
	 })	
}


$scope.clearImage=function(){	
	if($scope.image)
		$scope.image.compressed.dataURL='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'	
	$scope.image = ''
}


$scope.stopImageLoading=function(){
	if($scope.image && $scope.image.url){
		$scope.loading = false
	}
		else{
			$timeout(function(){$scope.stopImageLoading()}, 1000);
		}
}





$scope.setFile = function(element) {
//	console.log(element)
	$scope.loading = true
	$timeout(function(){$scope.stopImageLoading()}, 1000);
	$scope.clearMsg();
	if(! (element.files[0].type.indexOf('image') > -1)){
		$scope.display.error=CONSTANTS.INVALID_IMAGE;
		MsgSrvc.popupMsg($scope.display)
		$scope.loading = false
		return;
	}
	$scope.file= {}
		if (element.files && element.files.length > 0) {								
			$scope.file=element.files[0]
		}
	$scope.loading = false
};
$scope.validateImage = function(image) {
	if(!image){
		$scope.display.warning = 'Please select the valid image file' 
		MsgSrvc.popupMsg($scope.display)
		return false;
	}
	if(image.file.size>4000000){
		$scope.display.warning = 'Image size must be less than 4MB'
		MsgSrvc.popupMsg($scope.display)
		return false;
	}
	return true;						
}



})
// End Login Controller
