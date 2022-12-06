<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>MyATM</title>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">

  <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Montserrat:400,700'>
<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>

      <link rel="stylesheet" href="css/style-p.css">
 <link href="css/custom.css" rel="stylesheet">
  
</head>

<body>

  
<div class="container">
  <div class="info">
    <h1 id="heading" ></h1>
  </div>
</div>
<div class="form">
  <div class="thumbnail"><img src="images/login-icon.png"/></div>
  <form class="register-form">
    <input type="text" placeholder="name"/>
    <input type="password" placeholder="password"/>
    <input type="text" placeholder="email address"/>
    <button>create</button>
    <p class="message">Already registered? <a href="#">Sign In</a></p>
  </form>
  <form class="login-form" method="POST">
  <div id="myProgress" style="display:none">
								<div id="myBar"></div>
							</div>
  <div class="alert alert-success" id="login-success"  style="display: none;"></div>
	<p class="alert alert-danger" id="login_error" style="display: none;"></p>
    <input type="text" name="email" placeholder="Email" required/>
    <i id="msg_id" class="text-danger" style="font-size:12px;display: none;">Please enter your email</i>
    <input type="password" name="passwd" placeholder="Password" required/>
    <i id="msg_psw" class="text-danger" style="font-size:12px;display: none;">Please enter your password</i>
	  <p class="check-box"> <input type="checkbox" class="check"/>  Remember me</p>
    <button class="button3" type="submit" name="sub">Login</button> 
    
    <p class="message">Not registered? <a href="signup.php">Create an account</a> <a href id="forgot" style="float:right">Forgot Password?</a></p>
  </form>
  <form class="login-form"  style="display: none;">
							<div class="alert alert-success" id="fp-success"  style="display: none;"></div>
							<p class="alert alert-danger" id="fp_error" style="display: none;"></p>
                                    <input type="email" id="fp-email"  autofocus autocomplete="off" placeholder="Email">
									<i id="msg_id" class="text-danger" style="font-size:12px;display: none;">Please enter your email.</i>
                                    <button id="forgot-password" type="submit"  class="button3">Get Password</button>
                                <p class="message"><a href id="signin" style="display: none;float:right">Go to Login Page</a></p>
                            </form>
</div>
<!-- <video id="video" autoplay loop poster="polina.jpg">
  <source src="http://andytran.me/A%20peaceful%20nature%20timelapse%20video.mp4" type="video/mp4"/>
</video> -->
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

  

    <script  src="js/index.js"></script>
<script src="assets/js/app/config.js"></script>
 <script type="text/javascript" src="front/js/custom.js"></script>



</body>

</html>

<?php 
include("config.php");

if(isset($_POST['sub']))
    {
    $uname = $_POST['email'];
    $upassword = $_POST['passwd'];

    $res = mysqli_query($mysqli,"SELECT* FROM db WHERE email='$uname'and passwd='$upassword'");
    $result=mysqli_fetch_array($res);
    if($result)
    {
    //echo "You are login Successfully ";
    header("Location: dashboard.php");   // create my-account.php page for redirection 
        
    }
    else
    {
        echo "failed ";
    }
    }
?>