<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Sellers Galaxy</title>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">

  <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Montserrat:400,700'>
<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
 <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
      <link rel="stylesheet" href="css/style-p.css">
 <link href="css/custom.css" rel="stylesheet">
  
</head>

<body>

  
<div class="container">
  <div class="info">
	  <h1>Sign up</h1><!-- <span>Please fill in this form to create an account.</span> -->
  </div>
</div>
<div class="form">
  <div class="thumbnail"><img src="images/signup-icon.png"/></div>
  <form class="register-form">
	  
    <input type="text" placeholder="name" />
    <input type="password" placeholder="password" />
    <input type="text" placeholder="email address"/>
    <button>create</button>
    <p class="message">Already registered? <a href="#">Sign In</a></p>
  </form>
  <form class="login-form"  method="POST">
  <div id="myProgress" style="display:none">
								<div id="myBar"></div>
							</div><br>
 							<p class="alert alert-success" id="reg-success"  style="display: none;"></p>
							<p class="alert alert-danger" id="reg_error"   style="display: none;"></p>
  <!--  <p class="name"> Email</p> -->
  <input type="text" placeholder="Name *" name="name" autocomplete="off" required />
    <input type="text" placeholder="Email *" name="email" autocomplete="off" required/>
     <input type="text" placeholder="Phone No" name="phn" autocomplete="off" required/>
   <!--  <p class="name"> Password</p> -->
    <input type="password" placeholder="Password *" id="password-login" autocomplete="off" required/>
    
    
    <!-- <p class="name"> Repeat Password</p> -->
    <input type="password" placeholder="Repeat password *" name="passwd" required/>
     <i id="cpmsg_id" class="text-danger" style="font-size:12px;display: none;">Password and Confirm Password must be matched.</i>
    
    
	 <!--  <p class="check-box"> <input type="checkbox" class="check"/>  Remember me</p> -->
<input type="button" class="button2" onclick="window.location.href='index.html';" value="Cancel"> 
<button type="submit" name="sub">Sign Up</button>
   <!--  <p class="message">By creating an account you agree to our <a href="#">Terms & Privacy.</a></p> -->
  </form>
</div>
<video id="video" autoplay loop poster="polina.jpg">
  <source src="http://andytran.me/A%20peaceful%20nature%20timelapse%20video.mp4" type="video/mp4"/>
</video>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

  

    <script  src="js/index.js"></script>
<script src="assets/js/app/config.js"></script>
 <script type="text/javascript" src="front/js/custom.js"></script>


</body>

</html>

<?php
    if(isset ($_POST["sub"])){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "sellers_galaxy";

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phn = $_POST["phn"];
        $passwd = $_POST["passwd"];


        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO db VALUES ('$name', '$email',$phn, '$passwd')";

        if ($conn->query($sql) === TRUE) {
            //echo "New record created successfully";
            header("Location:dashboard.php");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    $conn->close();

}
?>