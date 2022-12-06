'use strict';

myApp.service('mailService', [
		'$http',
		'CONSTANTS',
		'DataService','appCache',
		function($http, CONSTANTS, DataService,appCache){
      
			var sendEmail = function(mail, to, type) {
				return $http.post(CONSTANTS.BASE_URL + 'send' + to + type,
						mail);
			};
			var loadEmails = function(scope, value, type, message) {
				$http.get(CONSTANTS.BASE_URL + value + type +"/"+message.page).success(
						function(result) {
							if(result && result.data && result.count){
								scope.emails = result.data;
								scope.message.count = result.count;
							}else{
								scope.emails = [];
								scope.message.count = 0;
							}
						});
			};
			
			var users = function(scope) {
				var user = appCache.get('userslist');
				if (angular.isUndefined(user)) {
				$http.get(CONSTANTS.BASE_URL + 'users').success(
						function(result) {
							scope.items = result;
							appCache.put('userslist',result)
						});
			}else{
				scope.items = user;	
			}
			
			};
			
			return {
				sendEmail : sendEmail,
				loadEmails : loadEmails,
				loadUsers : users
			};
		} ]);

myApp.controller('HomeController',['$scope','mailService','$rootScope','CONSTANTS','DataService','UtilSrvc','$http','MsgSrvc','$location','appCache', '$parse', function($scope, mailService, $rootScope,
		CONSTANTS, DataService,UtilSrvc, $http, MsgSrvc,$location,appCache,$parse) {
	$scope.activatingMenu('message')
// $scope.changeModIcon()
	$scope.society = $scope.$parent.sessionValue(CONSTANTS.SOCIETY_KEY)
	$scope.templateMsg={url:'static/user/view/message.html'}
	$scope.messageLink='static/shared/view/message-link.html'
	$scope.messageList='static/shared/view/message-list.html'
	$scope.messageCompose='static/shared/view/compose.html'
	$scope.sentMessage='static/shared/view/sent-message.html'
	$scope.readMessage='static/shared/view/read-message.html'	
	$scope.items = mailService.loadUsers($scope);
	$scope.selectedItems = []
	$scope.emails = []
	$scope.selectedMail;
	$scope.message = {'count':0,'page':1 ,'perPage':10}
	$scope.typeValue = {'message':'Message','sms':'SMS','email':'Email'}
	$scope.composeType = 'Compose'
		$scope.location=$location.path()
		if($location.path()=='/resident/message'){
			$scope.message.type=$location.path().replace('/resident/','')	
		}else{
			$scope.message.type=$location.path().replace('/','')
		}
		$scope.page = {
			view : 'inbox',
			compose : 'compose',
			sent : 'sent',
			readmsg : 'readmsg',
			sms : 'SMS',
			email : 'Email'	,
			failed:'Failed',
			delivered:'Delivered',
			in_progress:'In Progress'
	}
	$scope.loading=false
	$scope.clearMsg()	
	$scope.changeView = function(view) {
// $scope.emails =[]
		UtilSrvc.changeView($scope, view)
		$scope.clearMsg()
	}
	if($scope.message.type == 'message'){		
		$scope.view='inbox'		
	}else{	
		$scope.view='sent'
		$scope.changeView('sent') 
	}
// mailService.loadEmails($scope,
// $scope.view,$scope.typeValue[$scope.message.type], $scope.message)
	
	$scope.setSelectedMail = function(mail) {
		$scope.selectedMail = mail;
// $scope.selectedMail.names=$scope.selectedMail.name.split(',')
	}

	$scope.isSelected = function(mail) {
		if ($scope.selectedMail) {
			return $scope.selectedMail === mail;
		}
	}

	$scope.remove = function(email, index) {
		$scope.loading=true
		$scope.clearMsg()
		
		$http.delete(CONSTANTS.BASE_URL + 'removeMessage/'+email.msg_id).success(function(result) {	
			$scope.loading=false
			if(result.status){
			$scope.message.count--
			$scope.display.success = result.message 
			MsgSrvc.popupMsg($scope.display)
			$scope.emails.splice(index, 1);
			$scope.selectedMail = $scope.emails[index];
			
			}
		});		
	};
	
	
	
	
	
	$scope.removeSelected = function() {
		$scope.loading=true
		$scope.clearMsg();
		var ids =[];
		angular.forEach($scope.selection, function(val){
			ids.push(val.msg_id)
		})
		DataService.postRequest('removeMessages',{'message_ids':ids}).success(function(result) {	
			if(result.status){
			$scope.loading=false
			$scope.refresh()
			$scope.selection =[]
			}
		});		
	};
	$scope.curstatus={}
	$scope.getStatus = function(id) {
		$scope.loading=true
		$scope.clearMsg();
		DataService.getMSGRequest('v1/getsmsstatus/'+id)
		.success(function(result) {	
			$scope.loading=false
			if(result && result.data){
				$scope.curstatus.id=id
				$scope.curstatus.status=result.data.status
			}
		});		
	};
	
	
	$scope.groups = [];
	$scope.toggleCompose = function(value) {
		$scope.view = value;
		mailService.loadEmails($scope, value,$scope.typeValue[$scope.message.type],$scope.message);			
	};

	$scope.loadGroups = function(){
		var grp = appCache.get('group');
		if (angular.isUndefined(grp)) {
		$http.get(CONSTANTS.BASE_URL + 'groups').success(function(result) {
			$scope.groups = result;
			appCache.put('group',$scope.groups)
		});
		}else{
			$scope.groups = grp;
		}
	}

	$scope.showingReply = false;
	$scope.reply = {};

	$scope.toggleReplyForm = function() {
		$scope.reply = {};
		$scope.showingReply = !$scope.showingReply;
		$scope.reply.subject = $scope.selectedMail.subject;
		$scope.reply.userId = $scope.selectedMail.id;
		$scope.replyTo = $scope.selectedMail.name;

	};
	$scope.init = function(name) {		
		if(!name)
		name = 	$scope.cons[0]	
		$scope.tower.name = name
		$scope.getData( name)
	}
	
	$scope.tower ={}
//	DataService.initCons($scope,'tower')
	DataService.getBlocks($scope,'block')
	
	$scope.getTowers=function(){
		var twr = DataService.getRequest('constantBySociety/'+'tower');
		twr.success(function(result){
			$scope.towers=result
		});
	}
	
	$scope.getTowers()
	
	$scope.loadGroups();
	$scope.isReply = false;
	$scope.sendReply = function() {
		$scope.clearMsg()
		$scope.loading=true
		if($scope.message.type == 'sms'){		
			$scope.reply.subject='SMS'
		}
		if(!$scope.reply.subject || !$scope.reply.body || (!$scope.reply.groupId && !$scope.reply.userId && $scope.selectedItems.length == 0 && !$scope.reply.name )){
			$scope.display.warning = 'Please Select Inputs !!' 
				MsgSrvc.popupMsg($scope.display)
				$scope.loading=false
			return;
		}	
		var userId = [];
		if ($scope.reply.userId) {
			userId[0] = $scope.reply.userId;
		}
		angular.forEach($scope.selectedItems, function(item) {
			userId.push(item.id);
		});
		if (userId && userId.length > 0) {
			$scope.reply.userId = userId;
		}
		$scope.showingReply = false;
		$rootScope.loading = true;
		
		mailService.sendEmail($scope.reply, $scope.messageBy,$scope.typeValue[$scope.message.type]).success(
				function(result) {
					$scope.loading=false
					if (result.status) {
						$scope.display.success= result.message 
						MsgSrvc.popupMsg($scope.display)
					}
				}).error(function(err) {						  
					$scope.loading=false
			$scope.display.error= err 
			MsgSrvc.popupMsg($scope.display)
		});
		$scope.reply = {};		
		$scope.loading=false
	};
	
	$scope.messageBy = 'User'	
		
	$scope.dontSendMsgToGroup = function(){
		$scope.display.info= 'This feature is not enabled to your account, please contact system administrator !!' 
		MsgSrvc.popupMsg($scope.display)
	}

	$scope.$watch('selectedMail', function(evt) {
		$scope.showingReply = false;
		$scope.reply = {};
	});
	$scope.$watch('view', function(evt) {
		$scope.reply = {};
		$scope.selectedItems = [];
	});
	$scope.$watch('messageBy', function(evt) {
		$scope.reply = {};
		$scope.selectedItems = [];
	});

	$scope.$watch('selectedItem', function(evt) {
		if ($scope.selectedItem) {
			if ($scope.selectedItem['name']) {
				if ($scope.selectedItems.indexOf($scope.selectedItem) < 0)
					$scope.selectedItems.push($scope.selectedItem);
				$scope.selectedItem = '';
			}
		}
	});
	$scope.removeItem = function(index) {
		$scope.selectedItems.splice(index, 1);
	};
	$scope.selectedTowers=[]
	$scope.$watch('selectedTower', function(evt) {
		if ($scope.selectedTower) {
			if ($scope.selectedTower['name']) {
				if ($scope.selectedTowers.indexOf($scope.selectedTower) < 0)
					$scope.selectedTowers.push($scope.selectedTower);
				$scope.selectedTower = '';
			}
		}
	});
	$scope.removeTower = function(index) {
		$scope.selectedTowers.splice(index, 1);
	};
	
	/**
	 * SMS Service START-----
	 */
	$scope.phoneNumbr = /^[7-9]{1}[0-9]{9}$/
	$scope.sendSMSMessage = function() {
		$scope.loading=true
		if(!$scope.reply.body || !$scope.reply.to){
			$scope.display.warning= 'Enter Number and Message !!'
				MsgSrvc.popupMsg($scope.display)
				$scope.loading=false
			return;
			
		}
		
		$scope.showingReply = false;
		$rootScope.loading = true; 
		var send = DataService.postRequest('sendSMSMessage',$scope.reply) 
		send.success(function(result) {
			$rootScope.loading = false;
			var status = CONSTANTS.TITLE_ERR
			var msg = "Message Delivery Failed !!"
				$scope.loading=false
			if(result.status && result.status == "success") {
				status = CONSTANTS.TITLE_SUC
				msg = "Message Delivered Successfully !!"
					$scope.display.success=msg
					MsgSrvc.popupMsg($scope.display)
					$scope.loading=false
					return
				}
			$scope.display.error = msg	
			MsgSrvc.popupMsg($scope.display)
		}).error(function(error){
			$scope.loading=false
		})				
		
		$scope.reply = {}
	};
	
	
	$scope.sendSMS = function(url,data){
		$scope.loading=true
		delete data.groupId
		delete data.name
		delete data.others
		var send = DataService.postMSGRequest(url,data) 
		send.success(function(result) {
			$rootScope.loading = false;
				$scope.loading=false
			if(result.status == CONSTANTS.STATUS_OK) {
					$scope.display.success=result.message
					MsgSrvc.popupMsg($scope.display)
					$scope.loading=false
					$scope.reply = {}
					$scope.selectedItems=[]
					$scope.selectedTowers=[]
					return
				}
			$scope.display.error = result.message	
			MsgSrvc.popupMsg($scope.display)
		}).error(function(error){
			$scope.loading=false
		})	
	}
	
	$scope.sendSMSConfirmation = function(unit){
		if($scope.loading){
			return
		}
		var msg=[]
		$scope.clearMsg()
		$scope.loading=true
			if(angular.isUndefined($scope.reply.name) && angular.isUndefined($scope.reply.groupId) && angular.isUndefined(unit)){
				$scope.display.warning= 'Please select unit or sub-group or group !!'
					MsgSrvc.popupMsg($scope.display)
					$scope.loading=false
				return;
			}
		
		
		if($scope.location=='/email'){
			if( !$scope.reply.subject){
				$scope.display.warning= 'Please Enter Subject !!'
					MsgSrvc.popupMsg($scope.display)
					$scope.loading=false
				return;
			}
		}
		if(!$scope.reply.message){
			$scope.display.warning= 'Please Enter Message !!'
				MsgSrvc.popupMsg($scope.display)
				$scope.loading=false
			return;
		}
		var numbers={}
		var emailIds={}
		var nums=[]
		if($location.$$url=='/sms'){
		msg.push('FOLLOWING UNIT HAS NO PHONE/MOBILE NUMBER. DO YOU WANT TO CONTINUE ?')	
		}else{
			msg.push('FOLLOWING UNIT HAS NO EMAIL. DO YOU WANT TO CONTINUE ?')		
		}
		if($scope.selectedTowers && $scope.selectedTowers.length>0){
			angular.forEach($scope.selectedTowers,function(tower){
				angular.forEach($scope.globalCons.users,function(val){
							if(val.flat_no.includes(tower.name)){
								if($location.$$url=='/sms'){
									if(val.id ){
										numbers[val.flat_no]=val.phone_no 
									}else{
										msg.push(val.name +' : No Phone/Mobile Number Found !')
									}
								}
								if($location.$$url=='/email'){
									if(val.email){
										emailIds[val.id] =val.email
									}else{
										msg.push(val.name +' : Email Not Found !')
									}
								}
							}
						})
			})
			
		}
		if($scope.reply.groupId){
			angular.forEach($scope.globalCons.users,function(val){
				if(val.flat_no.includes($scope.reply.groupId)){
					if($location.$$url=='/sms'){
						if(val.phone_no){
							numbers[val.id] = val.phone_no
						}else{
							msg.push(val.name +' : No Phone/Mobile Number Found !')
						}
					}
					if($location.$$url=='/email'){
						if(val.email){
							emailIds[val.id] =val.email
						}else{
							msg.push(val.name +' : Email Not Found !')
						}
					}
				}
			})
		}
		if(unit){
			angular.forEach(unit,function(val){
				if($location.$$url=='/sms'){
					if(val.phone_no){
						msg=[]
						numbers[val.id] = val.phone_no
					}else{
						msg.push(val.name +' : No Phone/Mobile Number Found !')
					}
				}
				
				if($location.$$url=='/email'){
					if(val.email ){
						msg=[]
						emailIds[val.id] =val.email
					}else{
						msg.push(val.name +' : Email Not Found !')
					}
				}
				
			})
		}
		
		$scope.reply.isset_user_id = true
		if($scope.reply.others){
			msg=[]
			$scope.reply.isset_user_id = false
					if($location.$$url=='/sms'){
							nums.push($scope.reply.others)
					}
		}
		
		
		$scope.reply.customer_id=$scope.loggedinUser.societyId
		$scope.showingReply = false;
		$rootScope.loading = true;
		
		$scope.msgObject={}
		$scope.msgObject=angular.copy($scope.reply,$scope.msgObject)
		
		
		var url
		if($location.$$url=='/sms'){
			if(nums.length>0){
				$scope.msgObject.numbers=nums
			}else{
				$scope.msgObject.numbers=numbers
			}
			
			url='v1/sendsms'
		}
		
		if($location.$$url=='/email'){
			$scope.msgObject.email_ids=emailIds
			url='v1/sendemail'
		}			
		if(msg.length>1){
			$scope.loading=false
			var modalInstance = DataService.openConfirm($scope, CONSTANTS.TITLE_WAR, msg);
			modalInstance.result.then(function(item) {
				$scope.sendSMS(url,$scope.msgObject)
			}, function() {
				 console.log('Modal dismissed at:');
			});
		}else{
			$scope.sendSMS(url,$scope.msgObject)
		}
		
	}
	
//	 $scope.canLoad = true;
	$scope.service=''
	$scope.keyword=''
	$scope.perPage=20
	$scope.pageNo=0
	$scope.getSMSEmails = function(status,pageNo,service){
		$scope.curstatus={}
		$scope.service=service
		$scope.clearMsg()
		if($scope.loading){
			return
		}
		$scope.loading=true
		if(pageNo){
			$scope.pageNo=pageNo
		}else{
			$scope.pageNo=1
		}
		var url
		if($location.$$url=='/sms'){
			if(status && status!=''){
				url='v1/getsmss?customer_id='+$scope.loggedinUser.societyId+'&status='+status+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}else if(service){
				url='v1/getsmss?customer_id='+$scope.loggedinUser.societyId+'&tag_like='+service+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}else{
				url='v1/getsmss?customer_id='+$scope.loggedinUser.societyId+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}
			
		}
		if($location.$$url=='/email'){
			if(status && status!=''){
				url='v1/getemails?customer_id='+$scope.loggedinUser.societyId+'&status='+status+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}else if(service){
				url='v1/getemails?customer_id='+$scope.loggedinUser.societyId+'&tag_like='+service+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}else{
				url='v1/getemails?customer_id='+$scope.loggedinUser.societyId+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}
		}
		var send = DataService.getMSGRequest(url) 
		send.success(function(result) {
			$rootScope.loading = false;
				$scope.loading=false
			if(result.status == CONSTANTS.STATUS_OK) {
				$scope.emails=result.data
//				angular.forEach(result.data,function(val){
//					$scope.emails.push(val)	
//				})
					$scope.message.count=result.metadata.count
//					if ($scope.emails.length >= $scope.message.count) {
//	                    $scope.canLoad = false;
//	                    return;
//	                }
//					$scope.pageNo++
					return
				}
			$scope.display.error = result.message	
			MsgSrvc.popupMsg($scope.display)
		}).error(function(error){
			$scope.loading=false
		})				
		
	}
	
	$scope.getSMSEmailsByKeyword = function(keyword,pageNo){
		$scope.emails=[]
		$scope.curstatus={}
		$scope.keyword=keyword
		$scope.clearMsg()
		if($scope.loading){
			return
		}
		$scope.loading=true
		if(pageNo){
			$scope.pageNo=pageNo
		}else{
			$scope.pageNo=1
		}
		var url
		if(keyword){
			if($location.$$url=='/sms'){
				url='v1/sms/keyword/'+keyword+'?customer_id='+$scope.loggedinUser.societyId+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
				
			}
			if($location.$$url=='/email'){
				url='v1/email/keyword/'+keyword+'?customer_id='+$scope.loggedinUser.societyId+'&per_page='+$scope.perPage+'&page_no='+$scope.pageNo
			}
			if(url){
				var send = DataService.getMSGRequest(url) 
				send.success(function(result) {
					$rootScope.loading = false;
						$scope.loading=false
						if(result && result.objects.length>0){
							$scope.emails=result.objects
							$scope.message.count=result.count
							return
						}else{
							$scope.message.count=0
						}
				}).error(function(error){
					$scope.loading=false
				})	
			}else{
				//no url
			}
		}else{
			$scope.getSMSEmails('',1)
		}
	}
	
	
	$scope.getSMSEmails()
	
//		$(window).on('scroll', function(){
//			 if($(window).height() > 650 ){
//				 $scope.pageNo++
//				$scope.getSMSEmails('',$scope.pageNo)
////				$(window).off('scroll');
//            } else{
//            	
//            }
//		});
	
	$scope.nextPage = function(){
		$scope.pageNo++
		if($scope.service){
			$scope.getSMSEmails('',$scope.pageNo,$scope.service)
		}else if($scope.keyword){
			$scope.getSMSEmailsByKeyword($scope.keyword,$scope.pageNo)
		}else{
			if($scope.page.view=='sent'){
				$scope.getSMSEmails('',$scope.pageNo)
			}
			if($scope.page.view=='delivered'){
				$scope.getSMSEmails('DELIVERED',$scope.pageNo)
			}
			if($scope.page.view=='failed'){
				$scope.getSMSEmails('FAILED',$scope.pageNo)
			}
			if($scope.page.view=='in_progress'){
				$scope.getSMSEmails('INIT',$scope.pageNo)
			}
		}
		
	}
	$scope.previousPage = function(service,keyword){
		$scope.pageNo--
		if($scope.service){
			$scope.getSMSEmails('',$scope.pageNo,$scope.service)
		}else if($scope.keyword){
			$scope.getSMSEmailsByKeyword($scope.keyword,$scope.pageNo)
		}else{
			if($scope.page.view=='sent'){
				$scope.getSMSEmails('',$scope.pageNo)
			}
			if($scope.page.view=='delivered'){
				$scope.getSMSEmails('DELIVERED',$scope.pageNo)
			}
			if($scope.page.view=='failed'){
				$scope.getSMSEmails('FAILED',$scope.pageNo)
			}
			if($scope.page.view=='in_progress'){
				$scope.getSMSEmails('INIT',$scope.pageNo)
			}
		}
	}
	
	$scope.toggleCompose = function(value) {
		$scope.view = value;
// mailService.loadEmails($scope,
// value,$scope.typeValue[$scope.message.type],$scope.message);
		if(value=='sent'){
			$scope.emails=[]
			$scope.getSMSEmails()
		}
		if(value=='delivered'){
			$scope.emails=[]
			$scope.getSMSEmails('DELIVERED',1)
		}
		if(value=='failed'){
			$scope.emails=[]
			$scope.getSMSEmails('FAILED',1)
		}
		if(value=='in_progress'){
			$scope.emails=[]
			$scope.getSMSEmails('INIT',1)
		}
		
	};
	
	$scope.notifyDetails={}
	$scope.getSMSLimits = function(status,pageNo){
		$scope.clearMsg()
		$scope.loading=true
		var get = DataService.getMSGRequest('v1/getcustomerconfiguration/'+$scope.loggedinUser.societyId) 
		get.success(function(result) {
			$scope.loading=false
			if(result.status == CONSTANTS.STATUS_OK) {
				result.data.max_conf=angular.fromJson(result.data.max_conf)
				if(result.data && result.data.max_conf && result.data.max_conf.SMS)
				result.data.max_conf.SMS=parseInt(result.data.max_conf.SMS)
				result.data.sms_count=parseInt(result.data.sms_count)
				$scope.notifyDetails=result.data
				if(result.data && result.data.max_conf && result.data.max_conf.SMS)
				$scope.notifyDetails.diffTotal=result.data.max_conf.SMS - result.data.sms_count
				return
			}
			$scope.display.error = result.message	
			MsgSrvc.popupMsg($scope.display)
		}).error(function(error){
			$scope.loading=false
		})				
		
	}
	$scope.getSMSLimits()
	
	$scope.allStatus={}
	$scope.getAllStatus = function(status,pageNo){
		$scope.clearMsg()
		$scope.loading=true
		var url
		if($location.$$url=='/sms'){
			url='v1/sms/servicestatus?customer_id='+$scope.loggedinUser.societyId
		}else if($location.$$url=='/email'){
			url='v1/email/servicestatus?customer_id='+$scope.loggedinUser.societyId
		}
		var get = DataService.getMSGRequest(url) 
		get.success(function(result) {
			
			$scope.loading=false
			if(result.status == CONSTANTS.STATUS_OK) {
				angular.forEach(result.data,function(val,key){
					if(val.status== "DELIVERED"){
						$scope.allStatus.delivered=val.count?val.count:0
					}
					if(val.status== "INIT"){
						$scope.allStatus.init=val.count?val.count:0
					}
					if(val.status== "SENT"){
						$scope.allStatus.sent=val.count?val.count:0
					}
				})
			}
		}).error(function(error){
			$scope.loading=false
		})				
		
	}
//	$scope.getAllStatus()
	
	
		$scope.msgCount
		$scope.msgLength
		
	$scope.getSMSCharCount=function(input){
		var length=input.length
		var regex =  /^[a-zA-Z0-9<;,(){}[\]\-_+=!@#$%\^&*|' ]*$/
			if(regex.test(input)){
				$scope.msgCount=Math.ceil(length / 160)
				$scope.msgLength = $scope.msgCount * 160 - (length % ($scope.msgCount * 160) || $scope.msgCount * 160);
			}else{
				$scope.msgCount=Math.ceil(length / 65)
				$scope.msgLength = $scope.msgCount * 65 - (length % ($scope.msgCount * 65) || $scope.msgCount * 65);
			}
	}
	
	
	
	$scope.checkSMSLimit=function(){
		$scope.clearMsg()
		if($location.$$url=='/sms'){
			if($scope.notifyDetails && $scope.notifyDetails.max_conf && $scope.notifyDetails.max_conf.SMS && $scope.notifyDetails.max_conf.SMS<=$scope.notifyDetails.sms_count){
				$scope.display.error = 'You have insufficient balance to send message !!'	
				MsgSrvc.popupMsg($scope.display)
			}
		}
	}
	
	$scope.composeForwardAndReply = function(composeType){
		$scope.selectedItems = [];
		if(composeType != 'Compose' ){
		$scope.reply.message = "\n\n\n---------------------------------------------------------------------\n"
			+"@ "+$scope.selectedMail.updated_at+" :\n---------------------------------------------------------------------\n"
			+$scope.selectedMail.message;
		}
	
		if(composeType == 'Forward' ){
			$scope.reply.subject = "FW : "+$scope.selectedMail.subject;
		}else if(composeType == 'Reply'){
			$scope.reply.subject = "RE : "+$scope.selectedMail.subject;
			$scope.selectedItems.push($scope.selectedMail);
		}else if(composeType == 'Compose'){
			$scope.reply = {};
		}
		$scope.composeType= composeType;
	};
	
	$scope.refresh = function(){
		mailService.loadEmails($scope, $scope.view,$scope.typeValue[$scope.message.type],$scope.message);
	}
	
	$scope.selection =[];
	$scope.toggleSelection = function toggleSelection(item) {
		var idx = $scope.selection.indexOf(item);
		// is currently selected
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		}
		// is newly selected
		else {
			$scope.selection.push(item);
		}
		
	};
	$scope.checkAll = function(){
		if($scope.selection.length== $scope.emails.length){
			$scope.selection=[]
		}else{
			$scope.selection=[]
			angular.forEach($scope.emails,function(email){
				$scope.selection.push(email)
			});
		}
	}
	
	
$scope.openRemoveConfirm = function(func, email,index) {
	var modalInstance = DataService.openConfirm($scope, CONSTANTS.TITLE_WAR, [ 'Do you want to delete the message(s) ?']);
	modalInstance.result.then(function(item) {
		func(email,index)
	}, function() {
	});

};
	$scope.removeChangeView = function(email){
		if(email)
			$scope.remove(email)
		$scope.selectedMail = {}
		var tgCompose = 'inbox'
		if($scope.view == 'sent'){
			tgCompose = 'sent'
		}
		$scope.changeView(tgCompose)
	};
	
	$scope.moveMessage = function(move){
		var index=-1
		for(var i=0;i<$scope.emails.length; i++){
			if($scope.selectedMail.msg_id == $scope.emails[i].msg_id){
				index = i
				break;
			}
		}
		if(index != -1){
			index += move
			if(index >= 0 && index <$scope.emails.length){
				$scope.selectedMail = $scope.emails[index]
			}
		}
	}
	// SMS Service END
}]);
				
myApp.controller('AdminHomeController',['$scope','mailService','$rootScope','CONSTANTS','DataService','$http','MsgSrvc','$controller', function($scope, mailService, $rootScope,CONSTANTS, DataService, $http, MsgSrvc,$controller) {
		
		$controller('HomeController',{$scope:$scope})
// $scope.changeModIcon()
		}]);