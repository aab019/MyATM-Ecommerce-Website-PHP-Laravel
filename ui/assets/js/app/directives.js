"use strict";

myApp.directive('searchPanel', function() {
	return {
		restrict : 'E',
		scope : {
			options : '=',
			searchItems : '&onSearch',
			data : '=',
			status : '=',
			staff : '=',
			type:'=',
			users : '=',
			common : '=',
			charge : '=',
			setPage:'&onPage'
		},
		controller : function($scope) {
			
			$scope.changeOptions =function(){	
				$scope.options.keyValue=[]
				for(var i=0; i<$scope.options.key.length; i++){
					$scope.options.keyValue.push({key:$scope.options.key[i],value:$scope.options.value[i]})
				}
			}
			$scope.changeOptions()
			
			$scope.opened = [ false, false, false ];
			$scope.onSelectPart = function(item, model, label){				
			if($scope.users && $scope.users.length > 0){
				if ($scope.searchBy == 'Flat' && $scope.selectedItem.flat_no)
					$scope.inputData[0] = $scope.selectedItem.flat_no
				else if($scope.searchBy == 'Name' && $scope.selectedItem.name)
					$scope.inputData[0] = $scope.selectedItem.name
				}
				$scope.$parent.searchItems($scope.searchBy,$scope.inputData)
				$scope.$parent.setPage(1)
				//$scope.inputData[0]=''
			}
			$scope.change = function() {
				$scope.inputData=[]
				if($scope.$parent.$parent.role == 'resident' && $scope.searchBy=='Flat')
					$scope.inputData[0] = 'Flat'
				if($scope.searchBy=='Date'  || $scope.searchBy=='ChequeBounce'){
					$scope.inputData[0] = new Date()
					$scope.inputData[1] = new Date()
				}
				if( $scope.searchBy=='Dates' ){
					$scope.inputData[0] = 'Flat'
					$scope.inputData[1] = new Date()
					$scope.inputData[2] = new Date()
			}
				}
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
		},
		link : function(scope, element, attrs) {
			scope.searchBy = attrs.init;
		},
		
	};
});










myApp.directive('linkActiveOnClick', ['$location', function ($location) {
    return {
        //restrict: 'A',
        //replace: false,
        link: function ($scope, loc) {
            $scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(), '#' + $location.path(), $location.path()]
                angular.forEach(loc.find('a'), function (a) {
                    a = angular.element(a)
                    if (1 == hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active')
                    } else {
                        a.parent().removeClass('active')   
                    };
                });     
            });
        }
    }
}]);
myApp.directive("ngFileSelect",function(){

	  return {
	    link: function($scope,el){
	      
	      el.bind("change", function(e){
	      
	        $scope.file = (e.srcElement || e.target).files[0];
	        $scope.getFile();
	      })
	      
	    }
	    
	  }
	  
	  
	});


myApp.directive('starRating',
		function() {
	return {
		restrict : 'A',
		template : '<ul class="rating">'
				 + '	<li ng-repeat="star in stars"  ng-class="star" ng-click="toggle($index)">'
				 + '\u2605'
				 + '</li>'
				 + '</ul>',
		scope : {
			ratingValue : '=',
			max : '=',
			onRatingSelected : '&'
		},
		link : function(scope, elem, attrs) {
			var updateStars = function() {
				scope.stars = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
			};
			
			scope.toggle = function(index) {
				scope.ratingValue = index + 1;
				scope.onRatingSelected({
					rating : index + 1
				});
			};
			
			scope.$watch('ratingValue',
				function(newVal,oldVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};
}
);


myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);


myApp.directive('indexTable', function() {
    function parseProps(str) {
        var i, props = str.split(",");
        for( i=0; i < props.length; i++ ) {
            props[i] = trim(props[i]);
        }
        return props;
    }
    
    function trim(s) {
        return s.replace(/^\s*(\w*)\s*$/,"$1");
    }
    
    return {
        restrict: 'A',
        template:
            '<tr ng-repeat="component in components">' +
                '<td ng-repeat="name in props">' +
                    '{{ component[name] }}' + 
                '</td>' + 
            '</tr>',
        scope: {
            components: '='
        },
        link: function (scope, elem, attrs) {
            scope.props = parseProps(attrs.columns);
        }
    };
});


myApp.directive('ngDebounce', function($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 99,
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            
            elm.unbind('input');
            
            var debounce;
            elm.bind('input', function() {
                $timeout.cancel(debounce);
                debounce = $timeout( function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                }, attr.ngDebounce || 1000);
            });
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
                     
    }
});



myApp.directive('wysiwyg', function($document) {
    return {
      restrict: "A",
      require: "ngModel",
      template: "<textarea style='width: 100%;height:100%' placeholder='Enter your text ...'></textarea>",
      replace: true,
      link: function (scope, element, attrs, controller) {
        var styleSheets,
            synchronize, editor,
            wysihtml5ParserRules = {
              tags: {
                strong: {}, b: {}, i: {}, em: {}, br: {}, p: {},
                div: {}, span: {}, ul: {}, ol: {}, li: {},
                h1: {}, h2: {}, 
                a: {
                  set_attributes: {
                    target: "_blank",
                    rel:    "nofollow"
                  },
                  check_attributes: {
                    href:   "url" // important to avoid XSS
                  }
                }
              }
            };


        editor = new wysihtml5.Editor(element[0], {
          toolbar: attrs.wysiwygToolbar, // id of toolbar element
          parserRules: wysihtml5ParserRules, // defined in parser rules set
          useLineBreaks: false,
          stylesheets: styleSheets
        });

        synchronize = function() {
          controller.$setViewValue(editor.getValue());
          scope.$apply();
        };

        editor.on('redo:composer', synchronize);
        editor.on('undo:composer', synchronize);
        editor.on('paste', synchronize);
        editor.on('aftercommand:composer', synchronize);
        editor.on('change', synchronize);

        // the secret sauce to update every keystroke, may be cheating but it works
        editor.on('load', function() {
          wysihtml5.dom.observe(
            editor.currentView.iframe.contentDocument.body, 
            ['keyup'], synchronize);
        });

        // handle changes to model from outside the editor
        scope.$watch(attrs.ngModel, function(newValue) {
                // necessary to prevent thrashing
                if (newValue && (newValue !== editor.getValue())) {
                  element.html(newValue);
                  editor.setValue(newValue);
                }
            });
      }
    };
  });