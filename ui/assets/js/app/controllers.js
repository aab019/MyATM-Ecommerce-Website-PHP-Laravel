'use strict';
myApp.controller('ModalInstanceCtrl', function($scope,$location, $modalInstance, item,$localStorage,UtilSrvc) {
//		$scope.loggedinUser = angular.fromJson($localStorage.loggedinUser)
	$scope.display = $scope.item = item;
	if($scope.item.date){
		$scope.item.transfer_date=new Date($scope.item.date)
	}else{
		$scope.item.transfer_date=new Date()
	}
	/* */
	
	$scope.item.remarks=$scope.item.remarks
	$scope.selection = [];
	$scope.ok = function() {
		// console.log($scope.selection);
		item.data = $scope.selection;
		$modalInstance.close(item);

	};
	$scope.cancel = function() {
		// console.log('cancel');
		$modalInstance.dismiss('cancel');
	};
	// toggle selection for a given employee by name
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
		// console.log($scope.selection);
	};
	
	$scope.toggleSelectionAll = function() {		
		angular.forEach($scope.item.data, function(value){
			$scope.toggleSelection(value)
		});		
	}
	$scope.close = function() {
        $modalInstance.close();
    }
	
	$scope.opened = [ false, false, false ];
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
	
	
});

/* newPaymentRequest */
myApp.controller('RequestPaymentModalInstanceCtrl', function($scope,$location, $modalInstance, newPayment,$localStorage,UtilSrvc) {
	$scope.display = $scope.newPayment = newPayment;

	$scope.ok = function() {
		$modalInstance.close(newPayment);
	
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.close = function() {
	    $modalInstance.close();
	}

	$scope.opened = [ false, false, false ];
	$scope.open = function($event, index) {
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

});

myApp.controller('DetailModalCtrl', function($scope, $modalInstance, item) {

	$scope.page = {
		view : item.section,
		heading : item.heading
	}
	$scope.itemData = item.data;
	$scope.LABEL = item.label
	$scope.ok = function() {
		$modalInstance.close()
	}

	$scope.unSorted = function(obj) {
		if (!obj) {
			return [];
		}		
		return Object.keys(obj);
	}
});


myApp.run(function($http) {
	$http.defaults.headers.post['Content-Type'] = 'application/json'
});
		
myApp.constant('CONSTANTS', {
	'BASE_URL' : SERVER_URL,
	'THIRD_PARTY_URL' : THIRD_PARTY_URL,
	'MSG_URL':MSG_URL,
	'TITLE_SUC' : 'SUCCESS ',
	'TITLE_ERR' : 'ERROR ',
	'TITLE_MSG' : 'MESSAGE',
	'TITLE_WAR' : 'WARNING',
	'TITLE_INF' : 'INFO',
	'SUCCESS_MESSAGE' : 'Success Message',
	'ERROR_MESSAGE' : 'Error Message',
	'ENTER_TOWER_FLAT' : 'Enter tower or flat no',
	'MESSAGE' : 'Message',
	'STATUS_OK' : 'success',
	'STATUS_ERR' : 'error',
	'STATUS_WARN' : 'warning',
	'STATUS_INFO' : 'info',
	'AUTH_KEY' : 'auth',
	'USER_KEY' : 'user',
	'MSG_NO_DATA' : 'No Record found for given inputs !!',
	'MSG_NO_CNG' : 'No changes found !!',
	'MSG_NO_INPUT' : 'Please select your inputs !!',
	'MSG_ADD_SUC' : 'Record Added Successfully !!',
	'MTR_CHD_SUC' : 'Meter Changed Successfully !!',
	'MSG_TRANSACTION_FAIL' : 'Record not added, Contact to Admin !!',
	'MSG_DATA_EXIST' : 'Record already exist for given input !!',
	'MSG_INPUT_INVALID' : 'Please verify, inputs are not valid !!',
	'MSG_EMAIL_SENT' : 'An Email has been sent, please check !!',
	'MSG_UPD_SUC' : 'Record Updated Successfully !!',
	'MSG_KEY' : 'message',
	'ROLE_KEY' : 'role',
	'SOCIETY_KEY' : 'societyId',
	'ID_KEY' : 'id',
	'INFO' : 'info!',
	'MSG_BILL' : 'Bill-Report!',
	'MSG_PAY' : 'Payment-Report!',
	'MSG_HOUSE_STATMNT' : 'House-Statement!',
	'FILE_EXT_ERR' : 'Please select excel file only!',
	'FILE_PDF_ERR' : 'Please select pdf file only!',
	'SMS_SENT_SUCC' : 'SMS sent successfully!!',
	'STATUS' : 'status',
	'DATA_KEY' : 'data',
	'ENTER_AMOUNT' : 'Enter amount!!',
	'INVALID_IMAGE' : 'Please select the valid image file',
	// /validation defined
	'EMAIL' : /^[A-z0-9_.\-]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z.]{1,4}$/,
	'PHONE' : /^[7-9]{1}[0-9]{9}$/,
	'NAME' : /^[a-zA-Z][a-zA-Z ]{1,256}[a-zA-Z]$/,
	'USERNAME' : /^[a-zA-Z ][a-zA-Z ][a-zA-Z_.&\-()@#!*%$ ]{1,256}$/,
	'OTNAME' : /^[a-zA-Z& ]{1,256}$/,
	'NUMBER' : /^[0-9]{1,1000}$/,
	'ALPHANUM':/^[a-zA-Z0-9 ]{1,100}$/,
	'GSTIN':/^[a-zA-Z0-9]{15}$/,
	'CONSNAME' : /^[a-zA-Z0-9-]{1,256}$/,
	// UI LABEL
	'COM_LABEL' : {
		"flat_no" : "Flat No",
		"com_no" : "Complaint No",
		"complaint_type" : "Complaint Type",
		"status" : "Complaint Status",
		"description" : "Description",
		"staff_name" : "Staff Name",
		"sla" : "Service Level Agreement",
		"amount" : "Complaint Charges",
		"spent_time" : "Spent Time (In Hours)",
		"staff_remarks" : "Resident Feedback",
		"created_at" : "Creation Date",
		"updated_at" : "Last Update",
		"created_by" : "Created By",
		"updated_by" : "Last Update By",
		"rating" : "Rating",
		"remarks" : "Remarks",
		"image" : "Photo"
	},
	'EVT_LABEL' : {
		"title" : "Event Name",
		"venue" : "Event Venue",
		"from_date" : "From Date",
		"end_date" : "End Date",
		"desciption" : "Description",
		"remarks" : "Remarks"
	},
'GRND_STF': 'groundstaff',
'ADMIN':'admin',
'RESIDENT':'resident',
'CLUSTER':'cluster',
'FLAT_CAT':'fc',
'SLAB':'slab',
'OTHER_CHARGE':'oc',
'ALL':'ALL',
'DEBIT':'DEBIT',
'CREDIT':'CREDIT',
'ADVANCE':'ADVANCE',
'PAYMENT':'PAYMENT',
'CHARGE':'CHARGE',
'DISCOUNT':'DISCOUNT',
'RECHARGE':'RECHARGE'
});

myApp.controller('AdminModalInstanceCtrl', function($scope, $modalInstance, item, $controller) {
	$controller('ModalInstanceCtrl', {
		$scope : $scope
	});
});
