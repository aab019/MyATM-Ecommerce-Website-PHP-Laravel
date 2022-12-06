var control_timeout, footerHeight;

$(document)
		.ready(
				function() {
					
					/*$('#menu').localScroll({
						hash : true,
						onAfterFirst : function() {
							$('html, body').scrollTo({
								top : '-=25px'
							}, 'fast');
						}
					});*/
					
					function move() {
						  var elem = document.getElementById("myBar");   
						  var width = 10;
						  var id = setInterval(frame, 10);
						  function frame() {
						    if (width >= 100) {
						      clearInterval(id);
						    } else {
						      width++; 
						      elem.style.width = width + '%'; 
						      elem.innerHTML = width * 1  + '%';
						    }
						  }
						}
					$('#heading').html('Login');
					
					$("#forgot").click(function() {
						$('#heading').html('Forgot Password');
						$("#login-form").hide();
						$("#forgot-form").show();
						$('#login-success').hide();
						$('#login_error').hide();
						$('#msg_reset').hide();
						$('#msg_id').hide();
						$('#msg_psw').hide();
						$('#first-login-form').hide();
						$('#send-password-form').hide();
						$('#first-login_suc').hide();
						$("#forgot").hide();
						$("#signin").show()
						return false; 
					});
					

					$("#signin, #signin-fs").click(function() {
						$('#heading').html('Login');
						$("#login-form").show();
						$("#forgot").show();
						$("#signin").hide()
						$("#forgot-form").hide();
						$('#login-success').hide();
						$('#login_error').hide();
						$('#reg-success').hide();
						$('#reg_error').hide();
						$('#msg_reset').hide();
						$('#msg_id').hide();
						$('#msg_psw').hide();
						$('#otp-form').hide();
						$('#otp-send').hide();
						$('#otp-error').hide();
						$('#changepasswordform').hide();
						$('#ch-error').hide();
						$('#change-ok').hide();
						$("#first-login-form").hide();
						$("#first-login_err").hide();
						$('#fs-login-ok').hide();
						$('#change-pwd-form').hide();
						$("#resend-otp").hide();
						$("#resend-otp").hide();
						$("#send-pswd-resend").hide();
						$('#send-password-form').hide();
						$('#first-login_suc').hide()
						return false; 
					});

					$("#identity").focus(function() {
						$('#msg_id').hide();
					});
					$("#password").focus(function() {
						$('#msg_psw').hide();
					});
					$("#email-reset").focus(function() {
						$('#msg_reset').hide();
					});

					$("#login-form").submit(function(event) {
						event.preventDefault();
					});

					$('#button-login')
							.click(
									function(event) {
										$('#myProgress').show();
										move()
										
										$('#login_error').hide();
										$('#initiation').show();
										var data = {
											'identity' : $('#identity').val(),
											'password' : $('#password').val()
										}
										$('#login_error').empty()
										if (data.identity) {
											$('#msg_id').hide();
										} else {
											$('#msg_id').show();
										}
										if (data.password) {
											$('#msg_psw').hide();
										} else {
											$('#msg_psw').show();
										}
										
										$
												.ajax({
													type : 'POST',
													url : SERVER_URL + 'login',
													data : data,

													success : function(result) {
														$('#myProgress').hide();
														$('#initiation').hide();
														if (data.identity
																&& data.password) {
															if (result.status == 'success') {
																var val = JSON
																		.stringify(result.data)
																localStorage
																		.setItem(
																				'loggedinUserIndex',
																				val);
																
																	window.location.href = 'home.html#/dashboard'

															}else {
																$('#login_error').show();
																$('#login_error').html(result.message);
																$('#login-success').empty();
																$('#login_info').empty();
															}
														}
													},
													error : function(error) {
														$('#initiation').hide();
														console.log(error)
													}
												});

									});
					
					
					
					
					$('#register_button')
					.click(
							function(event) {
								$('#myProgress').show();
								move()
								$('#cpmsg_id').hide();
								$('#reg_success').hide()
								$('#reg_error').hide()
								if($('#password-login').val()!=$('#cpassword-login').val()){
									$('#cpmsg_id').show();
								}else{
									$('#cpmsg_id').hide();
								}
								var data = {
									'name' : $('#name-login').val(),
									'email' : $('#email-login').val(),
									'phone_no' : $('#phone-login').val(),
									'password' : $('#password-login').val()
								}
								$.ajax({
											type : 'POST',
											url : SERVER_URL + 'register',
											data : data,

											success : function(result) {
												$('#myProgress').hide();
													if (result.status == 'success') {
														$('#reg-success').show();
														$('#reg-success').html(result.message);
														$('#reg_error').val('');
														$('#name-login').val('');
														$('#email-login').val('');
														$('#phone-login').val('');
														$('#password-login').val('');
														$('#cpassword-login').val('');
														
													}else {
														$('#reg_error').show();
														$('#reg_error').html(result.message);
														$('#reg-success').empty();
													}
											},
											error : function(error) {
												console.log(error)
												$('#myProgress').hide();
											}
										});
								return false; 
							});
					


    $('#forgot-password').click(function(event){
    	$('#myProgress').show();
		move()
    	var data = {
    			'email' : $('#fp-email').val()
    		}
    	if( (!data.email) ){
    		$('#fp_error').html('Please enter valid email!')
			$('#fp_error').show()
    	}
    	else{
    		$.ajax({
        		type : 'POST',
        		url : SERVER_URL + 'sendforgotpassword',
        		data : data,
        		success : function(result) {
        			$('#myProgress').hide();
        			if(result.status == 'error'){
        				$('#fp_error').html(result.message)
        				$('#fp_error').show()
        				}
        			else{
        				$('#fp-success').html(result.message)
        				$('#fp-success').show()
        				$('#fp-email').val('')
        				}
        			},async: false
        		});
    	}
		$('#myProgress').hide();
    	return false; 
    });			
    
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
					
    $('#button-reset-psw').click(function(event){
    	$('#myProgress').show();
		move()
    	var data = {
    			'password' : $('#password').val(),
    			'confirm_password' : $('#cpassword').val(),
    			'code':getUrlParameter('code')
    		}
    	console.log(data)
    	if( (!data.password) ){
    		$('#cp_error').html('Please enter password!')
			$('#cp_error').show()
			return
    	}
    	if( (!data.confirm_password) ){
    		$('#cp_error').html('Please enter confirm password!')
			$('#cp_error').show()
			return
    	}
    	if( (!data.code) ){
    		$('#cp_error').html('Request can not be completed!')
			$('#cp_error').show()
			return
    	}
    	else{
    		$.ajax({
        		type : 'POST',
        		url : SERVER_URL + 'resetpassword',
        		data : data,
        		success : function(result) {
        			$('#myProgress').hide();
        			if(result.status == 'error'){
        				$('#cp_error').html(result.message)
        				$('#cp_error').show()
        				return
        				}
        			else{
        				$('#cp-success').html(result.message)
        				$('#cp-success').show()
        				$('#password').val('');
            			$('#cpassword').val('');
        				}
        			},async: false
        		});
    	}
    	$('#myProgress').hide();
    	return false; 
    });			
			
    $('#button-activate').click(function(event){
    	$('#myProgress').show();
		move()
    	var data = {
    			'code' : getUrlParameter('code')
    		}
    	
    		$.ajax({
        		type : 'POST',
        		url : SERVER_URL + 'activate',
        		data : data,
        		success : function(result) {
        			$('#myProgress').hide();
        			if(result.status == 'error'){
        				$('#ac_error').html(result.message)
        				$('#ac_error').show()
        				$('#ac-success').hide()
        				return
        				}
        			else{
        				$('#button-activate').attr("disabled", "disabled")
        				$('#ac-success').html(result.message)
        				$('#ac-success').show()
        				$('#ac_error').hide()
        				}
        			},async: false
        		});
		$('#myProgress').hide();
    	return false; 
    });	
				

				});

function valemail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}



$('#login-ok, #login-again, #signin-cn').click(function(event){
	$("#login-form").show();
	$("#forgot-form").hide();
	$('#login-success').hide();
	$('#login_error').hide();
	$('#msg_reset').hide();
	$('#msg_id').hide();
	$('#msg_psw').hide();
	$('#otp-form').hide();
	$('#otp-send').hide();
	$('#otp-error').hide();
	$('#changepasswordform').hide();
	$('#ch-error').hide();
	$('#change-ok').hide();
	$("#first-login-form").hide();
	$("#first-login_err").hide();
	$('#fs-login-ok').hide();
	$('#change-pwd-form').hide();
	$("#resend-otp").hide();
	$("#send-pswd-resend").hide();
	$('#send-password-form').hide();
	$('#first-login_suc').hide()
});




//'#resend-otp' default ; $("#resend-otp").show();
function disableResend(idTag){
	var time = 1
	var i = time;
	$(idTag).show();
	var init = setInterval(function(){
		if(i > 0){
				$(idTag).html($(idTag).val() +" in "+ i +" sec");
				i--;
			}
		else{
			$(idTag).html($(idTag).val());
			i= time;
			}
		}, 1000);
	setTimeout(function(){
		$(idTag).html($(idTag).val());
		$(idTag).removeAttr('disabled');
		stopResend(init);
	},(time*1000)+1000);
}

function stopResend(stop) {
    clearInterval(stop);
}



/*$('#change-pwd').click(
		function(event){
			
			if( ($('#new-password').val() == $('#conf-password').val()) && $('#new-password').val().length > 5 ){
				$('#ch-error').hide();
				var data = {
						id: 2,
						password : $('#new-password').val(),
				}
				console.log("getting the data for change password");
				$.ajax({
					type:'POST',
					url: SERVER_URL + 'ch',
					data: data,
					success:function(result){
						console.log(result);
					},
				});
				console.log("completed ajax calll for change password");
			}//if same
			else{
				$('#ch-error').show();
				console.log($('#new-password').val());
				console.log($('#conf-password').val());
			}
		});
		
		
*/
