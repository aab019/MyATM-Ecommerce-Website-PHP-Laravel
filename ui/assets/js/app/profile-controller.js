'use strict';

myApp.controller('ProfileController', [
		'$scope',
		'$rootScope',
		'$http',
		'CONSTANTS',
		'DataService',
		'MsgSrvc',
		'UtilSrvc',
		'UserSrvc',
		'SessionService','$timeout', '$modal','$localStorage','$filter',
		function($scope,$rootScope,$http, CONSTANTS, DataService, MsgSrvc, UtilSrvc,UserSrvc, SessionService,$timeout, $modal,$localStorage,$filter) { 
			$scope.objectKeys = function(obj){
				  return Object.keys(obj)
				}			
			$scope.clearMsg()	
			$scope.page = {
				view : 'read',
				heading : 'My Profile',				 
				update : 'Update Profile Detail',
				change: 'Change Password',
				read : 'My Profile'
			}
			$scope.profile = {}
			$scope.name=CONSTANTS.USERNAME;
			$scope.changeView = function(view) {
				UtilSrvc.changeView($scope, view)
				$scope.clearMsg()
			}
			$scope.editUser = function(profile) { 
					$scope.profile = profile
			}		
			$scope.callInitialDataFromParent = function() {
		        $rootScope.$broadcast("CallInitialDataFromParent", {});
		    }
			
			$scope.updateProfile = function(isFormDirty) { 
				if (!isFormDirty) {
					$scope.display.warning= "No changes found!!" 
						MsgSrvc.popupMsg($scope.display)
					return
				}	
				$scope.loading=true
				$scope.profile.dob = $filter('date')(new Date($scope.profile.dob),'yyyy-MM-dd')
				
				$scope.clearMsg();
				var user = DataService.postRequest('updateuser', $scope.profile);
				user.success(function(result) {
					$scope.loading=false
					if (result.status == CONSTANTS.STATUS_ERR) {
						$scope.display.error= result[CONSTANTS.MSG_KEY]
						MsgSrvc.popupMsg($scope.display)
						return;
					}
					$scope.changeView('read')
					$scope.callInitialDataFromParent()
					$scope.display.success= CONSTANTS.MSG_UPD_SUC 
					MsgSrvc.popupMsg($scope.display)
				})
			}
			$scope.dataLoad = function() {
				var users = DataService.getRequest('getUserById/'+$scope.loggedinUser.id);
				users.success(function(result) {
						$scope.profile = result.data	
				})	 
			} 
			$scope.dataLoad(); 
			$scope.pwd = {}
			$scope.changePassword = function(pwd) {
				$scope.loading=true
				$scope.clearMsg()
				if(pwd.new_password != pwd.cpassword){
					$scope.display.warning= 'Password Mismatch, both password should be same !' 
						MsgSrvc.popupMsg($scope.display)
						$scope.loading=false
						return
				}	
				else{
				var pwdChange = DataService.postRequest('changePasswordin',pwd);
				pwdChange.success(function(result) {
					$scope.loading=false
					if (result.status == CONSTANTS.STATUS_ERR) {
						$scope.display.error= result[CONSTANTS.MSG_KEY] 
						MsgSrvc.popupMsg($scope.display)
						return;
					}
					$scope.display.success=result[CONSTANTS.MSG_KEY] 
					MsgSrvc.popupMsg($scope.display)
					$scope.pwd = {}
				})	
				}
			}
			
			
} ]); // End User Controller
		
		
		