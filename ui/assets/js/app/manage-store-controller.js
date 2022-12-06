myApp.controller('ManageStoreController', [
		'$scope',
		'$http',
		'CONSTANTS',
		'DataService',
		'MsgSrvc',
		'UtilSrvc',
		'UserSrvc',
		'SessionService',
		'$timeout',
		'$modal',
		'$localStorage',
		'$filter',
		function($scope, $http, CONSTANTS, DataService, MsgSrvc, UtilSrvc,
				UserSrvc, SessionService, $timeout, $modal, $localStorage,$filter) {
			
			
			
			$scope.page = {
					view : 'read',
					heading : 'Manage Store'
			}
			$scope.changeView = function(view) {						 
				UtilSrvc.changeView($scope, view);
			};
			$scope.itemvalue=''
			
			$scope.marketPlaces = [
				{place:'Australia',place_id:'A39IBJ37TRP1C6'},
				{place:'Brazil',place_id:'A2Q3Y263D00KWC'},
				{place:'Canada',place_id:'A2EUQ1WTGCTBG2'},
				{place:'China',place_id:'AAHKV2X7AFYLW'},
				{place:'France',place_id:'A13V1IB3VIYZZH'},
				{place:'Germany',place_id:'A1PA6795UKMFR9'},
				{place:'India',place_id:'A21TJRUUN4KGV'},
				{place:'Italy',place_id:'APJ6JRA9NG5V4'},
				{place:'Japan',place_id:'A1VC38T7YXB528'},
				{place:'Mexico',place_id:'A1AM78C64UM0Y8'},
				{place:'Spain',place_id:'A1RKKUPIHCS9HS'},
				{place:'UK',place_id:'A1F83G8C2ARO7P'},
				{place:'US',place_id:'ATVPDKIKX0DER'}
			]	
				
				
				
			$scope.print=function(){
				window.print()
			}
			$scope.profile ={}
			$scope.dataLoad = function() {
				var users = DataService.getRequest('getstorebyuserid/'+$scope.loggedinUser.id);
				users.success(function(result) {
						$scope.profile = result.data	
				})	 
			} 
			$scope.dataLoad();
			var msg=[]
			$scope.saveStoreSetting = function(isFormDirty){
				if (!isFormDirty) {
					$scope.display.warning= "No changes found!!" 
						MsgSrvc.popupMsg($scope.display)
					return
				}	
				$scope.loading=true
				$scope.profile.dob = $filter('date')(new Date($scope.profile.dob),'yyyy-MM-dd')
				if(!$scope.profile.user_id){
					$scope.profile.user_id = $scope.loggedinUser.id
				}
				$scope.clearMsg();
				var user = DataService.postRequest('savestoresetting', $scope.profile);
				user.success(function(result) {
					$scope.loading=false
					if (result.status == CONSTANTS.STATUS_ERR) {
						msg.push(result.message)
						angular.forEach(result.data,function(val){
								msg.push(val)
						})
						$scope.display.multiError=msg
						MsgSrvc.popupMsg($scope.display)
						return;
					}
					$scope.display.success= CONSTANTS.MSG_UPD_SUC 
					MsgSrvc.popupMsg($scope.display)
				})
			}
			
			$scope.filters = function(date){
				return date.replace(/[\s]/g, '');
			}
			
			
		} ])