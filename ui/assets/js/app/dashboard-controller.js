'use strict';

// Payment Controller Start

myApp.controller('IndexController', function($scope) {	
	
});


	
// --------------------------------------------------------------
var dashCtrl = myApp.controller('AdminDashboardController', function($scope, $rootScope,$http, $filter, ngTableParams, CONSTANTS, $timeout, $modal,$location,
		DataService, MsgSrvc, UtilSrvc, mailService,$controller,$localStorage, appCache) {
//	$scope.changeModIcon()
	$scope.manageStoreObj ={}
	$scope.msMessage=''

	$scope.dataLoad = function() {
		var users = DataService.getRequest('getstorebyuserid/'+$scope.loggedinUser.id);
		users.success(function(result) {
			if( result && result.status == CONSTANTS.STATUS_ERR){
				$scope.msMessage='Please update manage store information to view data !'
			}else{
				$scope.manageStoreObj.obj = result.data
				
				$scope.barChart = function(){
					var width = $(window).width()
					var xaxis
					if(width>375){
						xaxis=600
					}else{
						xaxis=380
					}
					
					
					google.charts.load('current', {packages: ['corechart', 'bar']});
					google.charts.setOnLoadCallback(drawAnnotations);

					function drawAnnotations() {
					      var data = google.visualization.arrayToDataTable([
					    	  ["Periods", "Sent Emails" ],
						        ["7 Days", $scope.emailCounts[0].count?$scope.emailCounts[0].count:0],
						        ["30 Days", $scope.emailCounts[1].count?$scope.emailCounts[1].count:0],
						        ["90 Days", $scope.emailCounts[2].count?$scope.emailCounts[2].count:0],
						        ["1 Year", $scope.emailCounts[3].count?$scope.emailCounts[3].count:0],
						        ["Lifetime", $scope.emailCounts[4].count?$scope.emailCounts[4].count:0]
					      ]);
					      var data = google.visualization.arrayToDataTable([
					          	['Periods', 'Sent Emails', {type: 'string', role: 'annotation'}],
					          	["7 Days", $scope.emailCounts[0].count?$scope.emailCounts[0].count:0,$scope.emailCounts[0].count?$scope.emailCounts[0].count:0],
						        ["30 Days", $scope.emailCounts[1].count?$scope.emailCounts[1].count:0,$scope.emailCounts[1].count?$scope.emailCounts[1].count:0],
						        ["90 Days", $scope.emailCounts[2].count?$scope.emailCounts[2].count:0,$scope.emailCounts[2].count?$scope.emailCounts[2].count:0],
						        ["1 Year", $scope.emailCounts[3].count?$scope.emailCounts[3].count:0,$scope.emailCounts[3].count?$scope.emailCounts[3].count:0],
						        ["Lifetime", $scope.emailCounts[4].count?$scope.emailCounts[4].count:0,$scope.emailCounts[4].count?$scope.emailCounts[4].count:0]
					        ]);

					      var options = {
					        title: 'Sent Email Statistics',
					        chartArea: {width: '70%'},
					        colors: ['#dd4b39'],
					        hAxis: {
					          title: 'Sent Emails',
					          minValue: 0,
					        }
//					        vAxis: {
//					          title: 'Periods'
//					        }
					      };
					      var chart = new google.visualization.BarChart(document.getElementById('email-chart'));
					      chart.draw(data, options);
					    }
					
					
					google.charts.load("current", {packages:["corechart"]});
				      google.charts.setOnLoadCallback(drawChart);
				      function drawChart() {
				        var data = google.visualization.arrayToDataTable([
				          ['Periods', 'Sent Emails'],
				          ['7 Days',     $scope.emailCounts[0].count?$scope.emailCounts[0].count:0],
				          ['30 Days',    $scope.emailCounts[1].count?$scope.emailCounts[1].count:0],
				          ['90 Days',    $scope.emailCounts[2].count?$scope.emailCounts[2].count:0],
				          ['1 Year',     $scope.emailCounts[3].count?$scope.emailCounts[3].count:0],
				          ['Lifetime',   $scope.emailCounts[4].count?$scope.emailCounts[4].count:0]
				        ]);

				        var options = {
				          title: 'Sent Emails',
				          is3D: true,
				        };

				        var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
				        chart.draw(data, options);
				      }
					
				}
				
				
				$scope.emailCounts =[]
				$scope.getEmailCounts = function(){
					$scope.loading=true
					var ord = DataService.getRequest('getEmailCountByDays');
					ord.success(function(result) {
						$scope.loading=false
						if(result && result.status==CONSTANTS.STATUS_OK){
							$scope.emailCounts = result.data
							if($scope.emailCounts.length>0){
								$scope.barChart()
							}
						}
					})	 
				}
				$scope.getEmailCounts()
			$scope.messageObj=''
				$scope.emailCountsWithParams =[]
				$scope.columnChart = function(){
					var width = $(window).width()
					var xaxis
					if(width>375){
						xaxis=600
					}else{
						xaxis=380
					}
					
					$scope.messageObj={}
					if($scope.emailCountsWithParams.length>1){
					google.charts.load("current", {packages:['corechart']});
				    google.charts.setOnLoadCallback(drawChart);
				    function drawChart() {
				    		 var data = new google.visualization.arrayToDataTable(angular.fromJson($scope.emailCountsWithParams));
				   	      var view = new google.visualization.DataView(data);
				   	      view.setColumns([0, 1,
				   	                       { calc: "stringify",
				   	                         sourceColumn: 1,
				   	                         type: "string",
				   	                         role: "annotation" },
				   	                       2]);

				   	      var options = {
				   	        title: "Sent Email Comparison Chart",
				   	        colors: ['#00a65a'],
				   		        vAxis: {
				   		          title: 'Sent Emails'
				   		        },
				   		        hAxis: {
				   			          title: 'Periods'
				   			        }
				   	      };
				   	      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
				   	      chart.draw(view, options);
				    	
				    }
					}else{
			    		$scope.messageObj.msg='Daily Records Not Found'
			    			$scope.emailCountsWithParams =[]
			    		$("#columnchart_values").empty();
			    	}
					
				}
				
				
				$scope.getEmailCountsWithParams = function(flag){
					$scope.emailCountsWithParams=[]
					$scope.loading=true
					var url=''
					if(flag=='daily'){
						url='getdailyemails'
					}if(flag=='week'){
						url='getweeklyemails'
					}else if(flag=='month'){
						url='getmonthlyemails'
					}else if(flag=='quarter'){
						url='getemailcountquarterly'
					}
					$scope.emailCountsWithParams.push(["Element", "Sent Email", { role: "style" } ])
					var ord = DataService.getRequest(url);
					ord.success(function(result) {
						$scope.loading=false
						if(result && result.status==CONSTANTS.STATUS_OK){
							if(result && result.data && result.data.length>0){
								if(flag=='daily'){
									angular.forEach(result.data,function(val,key){
										if(key<=6){
											$scope.emailCountsWithParams.push([val.DateRange,val.count?val.count:0,"#00a65a"])
										}
									})
									}
								if(flag=='week'){
									angular.forEach(result.data,function(val,key){
										if(key<=6){
											key++
											$scope.emailCountsWithParams.push(['Week '+key,val.count?val.count:0,"#00a65a"])
										}
									})
								}
								if(flag=='month'){
									angular.forEach(result.data,function(val,key){
										if(key<=6){
											$scope.emailCountsWithParams.push([$filter('fullmonthyear')(val.DateRange),val.count?val.count:0,"#00a65a"])
										}
									})
								}
							}
							$scope.columnChart()
							
						}
					})	 
				}
				
				$scope.getEmailCountsWithParams('daily')
			}
				
		})	 
	} 
	if($scope.loggedinUser && $scope.loggedinUser.id){
		$scope.dataLoad()
	}
	
    	
    	
    	
}); // End Admin Dashboard Controller




myApp.controller('BlankController', function($scope, $rootScope) {
	$scope.changeModIcon()
	if($scope.loggedinUser && $scope.loggedinUser.role == 'resident'){
		$scope.changeMod('user-dashboard');
	}else if($scope.loggedinUser && $scope.loggedinUser.role == 'admin'){
		$scope.changeMod('dashboard');
	}
});

myApp.controller('AdmDsbController', function($scope, $rootScope) {
	$scope.changeModIcon()
});
