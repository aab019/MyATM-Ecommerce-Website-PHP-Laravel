"use strict";


myApp.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});
myApp.filter('float', function() {
    return function(input) {
      return parseFloat(input, 10);
    }
});

myApp.filter('monthyear', function() {
	return function(input) {
		if(input){input=""+input
		var out = input.slice(0, 4) + '-' + input.slice(4, 6) + '-01';
		return out;
		}
	};
});


myApp.filter('toSentence', function() {
	return function(key) {
		var keys = key.split('_');
		var resKey = '';
		for (var i = 0; i < keys.length; i++) {
			resKey += keys[i].charAt(0).toUpperCase() + keys[i].substring(1) + ' ';
		}
		return resKey;

		//		var out =  input.slice(0, 4) + '-' + input.slice(4, 6) + '-01';		
		//		return out;
	};
});
myApp.filter('shortSentence', function() {
	return function(key) {
		var keys = key.split(' ');
		var resKey = ' ';
		if(keys.length > 1){
			for (var i = 0; i < 2; i++) {
				resKey += keys[i].charAt(0).toUpperCase() + keys[i].substring(1) + ' ';
			}
		}
		else{
			resKey = keys[0];
		}
		return resKey;
	};
});
myApp.filter('removeBackSlash', function() {
	return function(key) {
		if(key){
			var keys = key.split('/');
			return keys[1];
		}
		else{
			return key;
		}

		//		var out =  input.slice(0, 4) + '-' + input.slice(4, 6) + '-01';		
		//		return out;
	};
});
myApp.filter('toCapitalize', function() {
	return function(key) {
		if(key){
			var keys = key.split('_');
			var resKey = '';
			for (var i = 0; i < keys.length; i++) {
				resKey += keys[i].charAt(0).toUpperCase() + keys[i].substring(1).toLowerCase() + ' ';
			}
			return resKey;
		}
		

		//		var out =  input.slice(0, 4) + '-' + input.slice(4, 6) + '-01';		
		//		return out;
	};
});


myApp.filter('convertTenantLabel', function() {
	return function(key) {
		 if (key.indexOf('Alt') >= 0)
				key =  key.replace('Alt','Tenant')
		return key
	};
	
});

myApp.filter('dateToISO', function() {
	return function(input) {
		if(typeof input == "undefined" ||  input == '0000-00-00 00:00:00'){
			return;
		}
		else if (input){
			input = input.replace(/-/g, "/");
			input = new Date(input).toISOString();
			//https://stackoverflow.com/questions/4310953/invalid-date-in-safari			
			/*if(input.length > 10){
				input = input.replace(' ','T')+'.000Z'
			}*/
			return input;
		}
	};
});


myApp.filter('dateToDay', function() {
	return function(input,name) {
		input = new Date(input)
		var now=new Date()
		if(input.getDate()==now.getDate() && input.getFullYear()==now.getFullYear() && input.getMonth() == now.getMonth())		
			return name;
	};
}); 


myApp.filter('formatTime', function ($filter) {
	return function (time) {
	    var parts = time.split(':');
	    var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
	    return $filter('date')(date, 'hh:mm a');
	};
	});

myApp.filter('yesNo', function() {
    return function(input) {
        return input ? 'Activation Already Sent' : 'Not Yet Sent';
    }
})
myApp.filter('trueFalse', function() {
    return function(input) {
        return input ? 'Sent' : 'Failed';
    }
})

myApp.filter('slice', function() {
	  return function(arr, start, end) {
	    return (arr || []).slice(start, end);
	  };
	});
//for bill summary 
myApp.filter('sumOfValue', function () {
    return function (data, key) {    	
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum = sum + parseInt(data[i][key]);
        }
        return sum;
    }
})

myApp.filter('containsRegex', function() {
  return function(input, regex) {
	if(input && regex){  
    var patt = new RegExp(regex);
    for (var i = 0; i < input.length; i++) {
      if (patt.test(input[i]))
        return true;
    }}
    return false;
  };
});

myApp.filter('startsWith', function() {
	  return function(input, block) {
		  var res = []
		  angular.forEach(input,function(val){
			  if (val.startsWith(block))
		          res.push(val)
		  })  
	    return res;
	  }
	})

myApp.filter('positive', function() {
        return function(input) {
            if (!input) {
                return 0;
            }

            return Math.abs(input);
        };
    })
    
myApp.filter('arrayOfObjectByKeyValue', function() {
    return function(input, key, value) {
		  var res = []
		  angular.forEach(input,function(val){
			  if (val[key] == value)
		          res.push(val)
		  })  
	    return res;
    }
});

myApp.filter('objectByKeyValue', function() {
    return function(input, key, value) {
    	var res = null
		  angular.forEach(input,function(val){
			  if (val[key] == value)
		          res = val
		  })  
	    return res;
    }
});
myApp.filter('stringToFloat', function() {
	 return function(input) {
	    return parseFloat(input);
	}
});

myApp.filter('nextMonthStartDate', function() {
	 return function(input) {
		 var date = new Date(input);
			var firstDay = new Date(date.getFullYear(), date.getMonth() + 1);
	    return new Date(firstDay);
	}
});

myApp.filter('nextMonthEndDate', function() {
	 return function(input) {
		 var date = new Date(input);
			var lastDay = new Date(date.getFullYear(), date.getMonth() + 2,0);
			
	    return new Date(lastDay);
	}
});

myApp.filter('fullmonthyear', function() {
	return function(input) {
		var arr=[{'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}]
		if(input){
		input=""+input
		var inp
		angular.forEach(arr,function(value){
			angular.forEach(value,function(val,key){
				if(input.slice(4, 6)==key){
					inp=val	
				}
			})
			
		})
		var out =inp + '-' + input.slice(0, 4)  ;
		return out;
		}
	};
});

myApp.filter('breakless', function () {
	  return function (input) {
		  if(!input) return;
	      return input.replace(/<br>/g, ' ');
	  };
	});

myApp.filter('breakWord', function () {
	return function ( value ) {
        if(!value || !value.length ) return;
        return value.split("_");

    }
	});


myApp.filter('breakSentence', function () {
	return function ( value ) {
        if(!value || !value.length ) return;
        var str = value ? value.split(/\s+/) : 0; 
        var length= str ? str.length : '';
//        if(length<10){
//        	return value
//        }else{
        	return value.match(/.{1,50}/g);
//        }

    }
	});