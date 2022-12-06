myApp.controller('TemplateController', [
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
		'$sce',
		function($scope, $http, CONSTANTS, DataService, MsgSrvc, UtilSrvc,
				UserSrvc, SessionService, $timeout, $modal, $localStorage,$sce) {
			
			$scope.templateObj={}
			$scope.templates=[]
			
			$scope.page = {
					view : 'read',
					heading : 'View Template',
					read : 'View Template',
					create:'Add Template',
					update:'Update Template'
			}
			$scope.changeView = function(view) {						 
				UtilSrvc.changeView($scope, view);
			};
			
			
			$scope.getAllTemplates=function(){
				var cat = DataService.getRequest('getAllTemplates');
							cat.success(function(result) {
								if (result.status == CONSTANTS.STATUS_ERR) {
									$scope.display.error=result.message
//									 MsgSrvc.popupMsg($scope.display)
									return;
								}else{
									$scope.templates = result.data
								}	
								
							})
			}
			
			$scope.getAllTemplates()
			
			$scope.getTemplateById=function(id){
				var cat = DataService.getRequest('getTemplateById/'+id);
							cat.success(function(result) {
								if (result.status == CONSTANTS.STATUS_ERR) {
									$scope.display.error=result.message
//									 MsgSrvc.popupMsg($scope.display)
									return;
								}else{
									$scope.templateObj = angular.fromJson(result.data)
									$scope.templateObj.template = $sce.trustAsHtml($scope.templateObj.template);
									console.log($scope.templateObj.template)
								}	
							})
			}
			
			
			
			$scope.saveTemplate = function(id){
				$scope.clearMsg()
				$scope.loading = true;
				$scope.templateObj.is_active=true
				if(id){					
					var ap = DataService.postRequest('updateTemaplate',$scope.templateObj);
					ap.success(function(result) {
						$scope.loading = false;
						if (result.status == CONSTANTS.STATUS_ERR) {
							$scope.display.error=result.message
							 MsgSrvc.popupMsg($scope.display)
							return;
						}	else{
							$scope.display.success='Template Updated Successfully'
								MsgSrvc.popupMsg($scope.display)
								$scope.changeView('read')
								$scope.getAllTemplates()
								$scope.templateObj={}
								return;
						}
						
					});
			}else{
				var ap = DataService.postRequest('saveTemaplate',$scope.templateObj);
				ap.success(function(result) {
					$scope.loading = false;
					if (result.status == CONSTANTS.STATUS_ERR) {
						$scope.display.error=result.message
						 MsgSrvc.popupMsg($scope.display)
						return;
					}else{
						$scope.display.success='Template Saved Successfully'
						MsgSrvc.popupMsg($scope.display)
						$scope.changeView('read')
						$scope.templateObj={}
					}
				});
			}
			}
			
			
			$scope.edit = function(template){
				$scope.templateObj=template
//				if(template.is_active==1 || template.is_active=="1"){
//					$scope.templateObj.is_active=true
//				}else{
//					$scope.templateObj.is_active=false
//				}
			}
			
			
		} ])