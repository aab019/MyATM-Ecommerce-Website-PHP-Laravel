myApp.controller('OrderDetailsController', [
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
			
			$scope.manageStoreObj ={}
			$scope.msMessage=''

	$scope.dataLoad = function() {
		var users = DataService.getRequest('getstorebyuserid/'+$scope.loggedinUser.id);
		users.success(function(result) {
		if( result && result.status == CONSTANTS.STATUS_ERR){
				$scope.msMessage='Please update manage store information to view data !'
		}else{	
			$scope.manageStoreObj.obj = result.data	
			
			$scope.options = {'Date':'Date Range', 'Days':'No. of Previous Days','Status': 'Product Status'}
			
			$scope.page = {
					view : 'read',
					heading : 'Order List',
					read : 'Order List',
					detail:'Order Details'
			}
			$scope.changeView = function(view) {						 
				UtilSrvc.changeView($scope, view);
			};
			$scope.itemvalue=''
			
			$scope.changeHead=function(item){
				$scope.itemvalue=item
			}
			$scope.print=function(){
				window.print()
			}
			$scope.orderObj ={}
			
			$scope.getOrderDetails = function(id){
				$scope.loading=true
				var ord = DataService.getThirdPartyRequest('getOrder?OrderId='+id);
				ord.success(function(result) {
					$scope.loading=false
						$scope.orderDetails = angular.fromJson(result)
				})	 
			}
			
			$scope.filters = function(date){
				return date.replace(/[\s]/g, '');
			}
			
			$scope.orderListByStatus=[]
			$scope.ordersList ={}
			$scope.getListOrders = function(nexttoken){
				$scope.loading=true
				var url =''
					if(nexttoken){
						url='listOrders?NextToken='+nexttoken
					}else{
						url='listOrders'
					}
				var ord = DataService.getThirdPartyRequest(url);
				ord.success(function(result) {
					$scope.loading=false
						$scope.ordersList = angular.fromJson(result)
						$scope.orderListByStatus = result.ListOrdersResult.Orders
				})	 
			}
			
			$scope.getListOrders()
			$scope.getListOrdersDelivered = function(){
				$scope.loading=true
				var ord = DataService.getThirdPartyRequest('listOrdersDelivered');
				ord.success(function(result) {
					$scope.loading=false
						$scope.ordersList = angular.fromJson(result)
						$scope.orderListByStatus = result.ListOrdersResult.Orders
				})	 
			}
			
			$scope.getOrdersByStatus=function(flag,value){
				if(value){
					if($scope.orderListByStatus.length>0){
						$scope.ordersList.ListOrdersResult.Orders=[]
						angular.forEach($scope.orderListByStatus,function(val){
							if(val.OrderStatus==flag){
								$scope.ordersList.ListOrdersResult.Orders.push(val)
							}
						})
					}
					
				}
				
			}
		}
		})
	}
			$scope.dataLoad()
} ])