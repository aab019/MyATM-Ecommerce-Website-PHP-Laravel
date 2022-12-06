"use strict";


myApp.factory('Login',
		function($http, ngTableParams, $filter, CONSTANTS) {
			return {
				auth : function(credentials) {
					// console.log(credentials);
					var authUser = $http.post(CONSTANTS.BASE_URL + 'login',
							credentials);
					// console.log('Inside login ---')
					return authUser;
				},
				logout : function() {
					var msg = $http.get(CONSTANTS.BASE_URL + 'logout');
					return msg;
				},
				reset : function(data) {
					// console.log(data);
					var reset = $http.post(CONSTANTS.BASE_URL
							+ 'retpwd', data);
					return reset;
				},
				isLogin : function() {
					var login = $http.get(CONSTANTS.BASE_URL + 'loginUser');
					return login;
				}
			}
		});

myApp.factory('SessionService', function($filter, CONSTANTS) {
	// return {
	// get : function(key) {
	// return sessionStorage.getItem(key);
	// },
	// set : function(key, val) {
	// return sessionStorage.setItem(key, val);
	// },
	// unset : function(key) {
	// return sessionStorage.removeItem(key);
	// },
	// isAuthorize : function(roles) {
	// var authorize = false;
	// if (this.get(CONSTANTS.ROLE_KEY)) {
	// var userRole = this.get(CONSTANTS.ROLE_KEY);
	// angular.forEach(roles, function(role) {
	// if (userRole == role)
	// authorize = true;
	// });
	// }
	// return authorize;
	// }
	// }
});

myApp.factory('UtilSrvc', function($filter) {
	
	return {
		getSprtr : function(sprtr) {
			if (!sprtr && sprtr != '')
				sprtr = '-';
			return sprtr;
		},
		getYM : function(date, sprtr) {
			sprtr = this.getSprtr(sprtr);
			var m = date.getMonth() + 1;
			var ym = date.getFullYear() + sprtr + (m < 10 ? '0' + m : m);
			return ym;
		},
		getYMD : function(date, sprtr) {
			sprtr = this.getSprtr(sprtr);
			var d =date.getDate();
			var m = date.getMonth() + 1;
			var ym = date.getFullYear() + sprtr + (m < 10 ? '0' + m : m) + sprtr + (d < 10 ? '0' + d : d);
			return ym;
		},
		getCurrYM : function(sprtr) {
			return this.getYM(new Date(), sprtr);
		},
		getCurrYMDR : function(sprtr) {
			var ym = this.getYM(new Date(), sprtr);
			sprtr = this.getSprtr(sprtr);
			var ymdr = ym + sprtr + '01/' + ym + sprtr + '31';
			return ymdr;
		},
		changeView : function(scope, view) {
			scope.page.view = view;
			scope.page.heading = scope.page[view];
		},
		setFilter : function(scope, value) {
			scope.tableParams.count(scope.data.length);
			if (value == '') {
				scope.tableParams.count(10);
			}
		},
		toCamel : function(key) {
			var keys = key.split('_');
			var resKey = keys[0];
			for (var i = 1; i < keys.length; i++) {
				resKey += keys[i].charAt(0).toUpperCase()
						+ keys[i].substring(1);
			}
			return resKey;
		},
		queryString : function(searchBy, inputData) {
			var inputLength = 1;
			var params = '';
			
			if (searchBy == 'Date' || searchBy == 'ChequeBounce') {
				inputLength = 2;
			}
			if (searchBy == 'Dates' ) {
				inputLength = 3;
			}
			if (inputData.length < inputLength) {
				return {
					message : 'Please enter valid inputs !'
				};
			}
			if (inputData[0]==null) {
				return {
					message : 'Please enter valid inputs !'
				};
			}
			if (inputData[0].length ==0) {
				return {
					message : 'Please enter valid inputs !'
				};
			}
			for (var i = 0; i < inputData.length; i++) {
				if (searchBy == 'Date' || searchBy == 'ChequeBounce') {
					params = params + '/'
							+ $filter('date')(inputData[i], 'yyyy-MM-dd');
				}else if (searchBy == 'Dates' ) {
					params = params + '/'
					+ $filter('date')(inputData[i], 'yyyy-MM-dd');
				} else if (searchBy == 'YearMonth') {
					if (i == 0) {
						params = params + '/' + this.getYM(inputData[i], '');
					} else {
						if (i == 1 && inputData[1] != '') {
							params = params + '/' + inputData[i];
						}
					}
				} else {
					params = params + '/' + inputData[i];
				}
			}
			return {
				query : params
			};
		},
		arrayToJson : function(result) {
			var stat = "{";
			angular.forEach(result, function(val) {
				stat += "\"" + val.id + "\":\"" + val.name + "\",";
			});
			stat = stat.slice(0, stat.length - 1) + "}";
			var constant = angular.fromJson(stat);
			return constant;
		},
		arrayToJsonByCode : function(result) {
			var stat = "{";
			angular.forEach(result, function(val) {
				stat += "\"" + val.code + "\":\"" + val.name + "\",";
			});
			stat = stat.slice(0, stat.length - 1) + "}";
			var constant = angular.fromJson(stat);
			return constant;
		},
		arrayToJsonByAttr : function(result,attr) {
			var stat = "{";
			angular.forEach(result, function(val) {
				stat += "\"" + val.id + "\":\"" + val[attr] + "\",";
			});
			stat = stat.slice(0, stat.length - 1) + "}";
			var constant = angular.fromJson(stat);
			return constant;
		},
		hasRight : function(permissions, RIGHT) {
			if($filter('containsRegex')(permissions, RIGHT)){
				return true
			} return false
		},
		endsWith : function(string, endString) {
			var str = string.substring(string.length-(endString.length),string.length);
			if(str == endString){
				return true;
			}
			return false;
		},
		compareDate : function(firstDate, secondDate) {
			var firstDate = new Date(firstDate);
			var secondDate = new Date(secondDate);
			if(firstDate > secondDate){
				return +1;
			}else if(firstDate < secondDate){
				return -1;
			}
			return 0;
		}
	}
});

myApp.factory('DataService', function($http, ngTableParams, $filter, $modal,
		CONSTANTS ) {
	
	return {
		table : function(scope) {
			var table = new ngTableParams({
				page : 1,
				count : 10
			}, {
				groupBy : scope.groupBy,
				total : scope.data.length,
				getData : function($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')(
							scope.data, params.orderBy()) : scope.data;
					orderedData = params.filter() ? $filter('filter')(
							orderedData, params.filter()) : orderedData;
					$defer.resolve(orderedData.slice((params.page() - 1)
							* params.count(), params.page() * params.count()));
				}
			});
			return table;
		},
		getRequest : function(url) {
		var get = $http.get(CONSTANTS.BASE_URL + url);
			return get;
		},
		postRequest : function(url, data) {
			var post = $http.post(CONSTANTS.BASE_URL + url, data);
			return post;
		},
		putRequest : function(url, data) {
			var put = $http.put(CONSTANTS.BASE_URL + url, data);
			return put;
		},
		deleteRequest : function(url) {
			var del = $http.delete(CONSTANTS.BASE_URL + url);
				return del;
		},
		
		postMSGRequest : function(url, data) {
			var req = $http({
				method : 'POST',
				url :  CONSTANTS.MSG_URL+url,
				data : data,	
				headers : {
					'Content-Type' : 'application/json',
					'Authorization':'Basic MTExMToxMTEx'
				}
			})
			return req;
		},
		
		getMSGRequest : function(url) {
			var req = $http({
				method : 'GET',
				url :  CONSTANTS.MSG_URL+url,
				headers : {
					'Content-Type' : 'application/json',
					'Authorization':'Basic MTExMToxMTEx'
				}
			})
			return req;
		},
		getThirdPartyRequest : function(url) {
			var get = $http.get(CONSTANTS.THIRD_PARTY_URL + url);
				return get;
		}

	}
});

myApp.factory('MsgSrvc', function($modal,$timeout) {
	return {

		viewDetail : function( view,  data, label) {
			var item = {
				
				data : data,
				label : label
			}
			var modalInstance = $modal.open({
				templateUrl : view,
				controller : 'DetailModalCtrl',
				size : 'sm',
				resolve : {
					item : function() {
						return item;
					}
				}
			});
			return modalInstance;
		},
		showDetail : function(scope, title, data, size) {
			scope.item = {
				heading : title,
				data : data
			};
			var modalInstance = $modal.open({
				templateUrl : 'static/shared/view/item-detail-view.html',
				controller : 'ModalInstanceCtrl',
				size : size,
				resolve : {
					item : function() {
						return scope.item;
					}
				}
			});
			return modalInstance;
		},
		showTableDetail : function(scope, title, data, size) {
			scope.item = {
				heading : title,
				data : data
			};
			var modalInstance = $modal.open({
				templateUrl : 'static/shared/view/item-table-view.html',
				controller : 'ModalInstanceCtrl',
				size : 'lg',
				resolve : {
					item : function() {
						return scope.item;
					}
				}
			});
			return modalInstance;
		},
		showLoading : function() {
			var modalInstance = $modal.open({
				templateUrl : 'static/shared/view/loading-view.html',
				size : 'md',
				backdrop : 'static'
			})
			return modalInstance;
		},

		showMessage : function(scope, title, data, size) {
			scope.item = {
				heading : title,
				data : data
			};
			$modal.open({
				templateUrl : 'static/shared/view/message-view.html',
				controller : 'ModalInstanceCtrl',
				size : size,
				resolve : {
					item : function() {
						return scope.item;
					}
				}
			});
		},
		
		popupMsg : function(display, size) {

			var modalInstance = $modal.open({
				templateUrl : 'static/shared/view/message-panel2.html',
				controller : 'ModalInstanceCtrl',
				size : size,
				resolve : {
					item : function() {
						return display;
					}
				}
			});
			if(display.success || display.info){
				 $timeout(function() {
					 modalInstance.close();
				}, 2000)
			}
			//return modalInstance;
		}
		
	}
});

myApp.factory('UserSrvc', function(CONSTANTS, DataService, MsgSrvc, UtilSrvc,$modal,$rootScope) {
	return {

		dataLoad : function(scope, url) {
			scope.loading=true
			var users = DataService.getRequest(url);
			users.success(function(result) {
				scope.loading=false
				scope.display.info=false
				scope.data = result;
				scope.tableParams.total(result.length);
				scope.tableParams.reload();
				if (result.length == 0) {
					scope.display.info= CONSTANTS.MSG_NO_DATA
					MsgSrvc.popupMsg(scope.display)
					return
				}
			});
		}

	}
});

myApp.factory('appCache', function($cacheFactory) {
	 return $cacheFactory('default');
});



myApp.factory('httpRequestInterceptor', function ($localStorage, UtilSrvc,CONSTANTS) {
	  return {
	    request: function (config) {
	    	if($localStorage.loggedinUser){
	    		var api_token = $localStorage.loggedinUser.api_token;
		    	var user_id = $localStorage.loggedinUser.id
	    	}
	    	
	    	//console.log(config)
	      if (api_token) {
	    	  //if(!config.url.endsWith(".html")){
				  var temp = UtilSrvc.endsWith(config.url, '.html');
				  //console.log(temp)
				if(! temp){
				if(config.url.indexOf("?")!= -1){
					config.url = config.url+'&api-token='+api_token+'&user-id='+user_id	
				}else{
					config.url = config.url+'?api-token='+api_token+'&user-id='+user_id
				}
	    		 	  
	    	  	}
	      	}
	    	
	      return config;
	    }
	  };
	});

