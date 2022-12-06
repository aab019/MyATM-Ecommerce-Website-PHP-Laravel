<!DOCTYPE html>
<html lang="en">
<head>

  <title>Dashboard | MyATM</title>

  <link rel="canonical" href="https://blog.appseed.us/bootstrap-for-beginners-with-examples/" />

    <meta charset="UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- Bootstrap CSS End -->
    <!-- Main CSS -->
    <link rel="stylesheet" href="/css/style.css">
    <!-- Main CSS End -->
    <!-- Bootstrap Icons Start -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <!-- Bootstrap Icons End -->
    <link rel="stylesheet" href="/css/dark-mode.css">


    <style>
            html,
            body
            {
                width:  100%;
                margin: 0;
                padding: 0;
                background: #fff;
                color:  #000;
            }

            /* variables */
            :root
            {
                --offcanvas-width: 300px;
                --topNavbarHeight: 56px;
                --transition-collapse: ease 0.5s;
            }

            /* sidebar width */
            .side-bar
            {
                width: var(--offcanvas-width);
            }

            /* sidebar links */
            .sidebar-link
            {
                display: flex;
                align-items: center;
            }

            .sidebar-link .right-icon
            {
                display: inline-flex;
                transition: all ease 0.5s;
            }

            /* collapse menu */
            .collapsing
            {
                transition: var(--transition-collapse);
            }

            /* chevron rotate on expand */
            .sidebar-link[aria-expanded="true"] .right-icon
            {
                transform: rotate(180deg);
            }

            /* sidebar visibility and navbar height */
            @media (min-width: 990px)
            {
                body
                {
                    overflow: auto !important;
                }

                main
                {
                    margin-left: var(--offcanvas-width);
                }

                .side-bar
                {
                    transform: none;
                    visibility: visible !important;
                    top: var(--topNavbarHeight);
                    height: calc(100% - var(--topNavbarHeight));
                }
            }

            /* table styling */
            .card,
            .card-chart,
            .card-table
            {
                border-radius: 10px;
            }

            .card-chart
            {
                background: rgb(240, 240, 240);
            }

            .chart
            {
                background: rgb(230, 230, 230);
                border-radius: 5px;
            }

            .card-table
            {
                background: rgb(240, 240, 240);
            }

            /* striped table effect */
            tr:nth-child(even)
            {
                background-color: rgb(250, 250, 250);
            }

            /* checkbox */
            input[type=checkbox]
            {
                height: 0px;
                width: 0px;
                visibility: hidden;
            }

            label
            {
                cursor: pointer;
            }

            .navbar-custom{
                background-color: orange;
            }

           #i:hover{
            cursor: pointer;
            background-color: #b3ffe0;
           }
           
           /*.tp{
            display: inline; 
            border: 1px solid red; 
    border-radius: 30px; 
    padding: 2px 1px 0 0; 
    
           } */
           
    </style>

    <script>
            const charts = document.querySelectorAll(".chart");

            charts.forEach(function (chart) {
            var ctx = chart.getContext("2d");
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                    },
                ],
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true,
                    },
                },
                },
            });
            });
    </script>

</head>
<body>

<!-- Navbar Start -->
<nav id ="nv" class="navbar navbar-expand-lg navbar-light  fixed-top" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <!-- Sidebar Trigger Start -->
    <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas"><span class="navbar-toggler-icon"></span></button>
    <!-- Sidebar Trigger End -->
    <a class="navbar-brand fw-bold me-auto" href="#">MyATM</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul style="margin: 0 auto; padding-left: 200px; font-size: 20px;">
          <a href="#" style="text-decoration: none; margin: 10px;">Home</a>
          <a href="#" style="text-decoration: none; margin: 10px;" >About</a>
          <a href="#" style="text-decoration: none; margin: 10px;">Services</a>
          <a href="#" style="text-decoration: none; margin: 10px;">Contact</a>
        </ul>
        <!-- <ul>
          <a href="#">Sevices</a>
        </ul> 
        <ul>
          <a href="#">Contact</a>
        </ul>  -->
    </div>    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <form class="d-flex ms-auto">
          <div class="input-group my-3 my-lg-0">
              <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2">
              <button class="btn btn-primary" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
            </div>
      </form>
      <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-square"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="index.html">Logout</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <!--<li><hr class="dropdown-divider"></li>
              <! <li><a class="dropdown-item" href="#">Something else here</a></li> -->
            </ul>
          </li>
        </ul>
    </div>
  </div>
</nav>             
<!-- Navbar End -->

<!-- Sidebar Start -->
<div class="offcanvas offcanvas-start  text-white side-bar" data-bs-scroll="true" tabindex="-1" id="offcanvas" aria-labelledby="offcanvas" style="background-color: #ffad33">
  <div class="offcanvas-body p-0">
    <nav class="navbar-dark">
      <ul class="navbar-nav">
        <li>
          <!-- <div class="text-muted small fw-bold text-uppercase px-3">Core</div> -->
        </li>
        <li>
           <a href="#" class="nav-link px-3 active"> 
            <span class="me-2">
              <!-- <i class="bi bi-wrench-adjustable-circle"></i> -->
            </span>
            <!-- <span class="fw-bold">Dashboard</span> -->
          </a>
        </li>
        <li class="my-4">
          <hr class="dropdown-divider">
        </li>
        <li>
          <div class="text-muted small fw-bold text-uppercase px-3"><h4 style="text-weight: bold;">Select Options</h4></div>
        </li>
        <li>
          <a class="nav-link px-3 sidebar-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="fw-bold" style="font-size: 23px; color: black;">Manage Orders</span>
            <span class="right-icon ms-auto">
               <i class="bi bi-chevron-down" style="color:black;"></i> 
          </span>
          </a>
          <div class="collapse" id="collapseExample">
            <div>
              <ul class="navbar-nav ps-3">
                <li>
                  <!-- <a href="#" class="nav-link px-3"> -->
                    <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                      <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Create Order</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Order  List</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Create FBA Order</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">FBA Order List</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Order-details</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Inventory</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Product List</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Sales</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Manage-Store</span><br></a>
                  <!-- </a>       -->           
                </li>
              </ul>
            </div>
          </div>

          <hr style="color: black;">
          <a class="nav-link px-3 sidebar-link" data-bs-toggle="collapse" href="#pickupmanager" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="fw-bold" style="font-size: 23px; color: black;">Pick Up Manager</span>
            <span class="right-icon ms-auto">
               <i class="bi bi-chevron-down" style="color:black;"></i> 
          </span>
          </a>  
          <div class="collapse" id="pickupmanager">
            <div>
              <ul class="navbar-nav ps-3">
                <li>
                  <!-- <a href="#" class="nav-link px-3"> -->
                    <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                     <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Schedule Pickup</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Pickup List</span><br></a>
                        
                  <!-- </a>      -->            
                </li>
              </ul>
            </div>
          </div>  


          <hr style="color: black;">
          <a class="nav-link px-3 sidebar-link" data-bs-toggle="collapse" href="#address" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="fw-bold" style="font-size: 23px; color: black;">Addresses</span>
            <span class="right-icon ms-auto">
               <i class="bi bi-chevron-down" style="color:black;"></i> 
          </span>
          </a>  
          <div class="collapse" id="address">
            <div>
              <ul class="navbar-nav ps-3">
                <li>
                  <!-- <a href="#" class="nav-link px-3"> -->
                    <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                     <a href="srv.html" style="text-decoration: none;"><span class="fw-bold" style="font-size: 18px; color: black;">Sender Address</span><br></a>
                        <span class="me-2"><i class="bi bi-layout-text-window-reverse"></i></span>
                        <a href="srv.html" style="text-decoration: none;"> <span class="fw-bold" style="font-size: 18px; color: black;">Recipent Address</span><br></a>
                        
                 <!-- </a>   -->               
                </li>
              </ul>
            </div>
          </div>  
          <hr style="color: black;">











        <li class="my-4">
          <hr class="dropdown-divider">
        </li>
        <li>
          <div class="text-muted small fw-bold text-uppercase px-3" style="font-size: 19px; color: black;">More</div>
        </li>
        <li>
          <a href="#" class="nav-link px-3">
            <span class="me-2">
              <i class="bi bi-activity"></i>
            </span>
            <span class="fw-bold" style="font-size: 15px; color: black;">Activity</span>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link px-3">
            <span class="me-2">
              <i class="bi bi-clipboard2-data"></i>
            </span>
            <span class="fw-bold" style="font-size: 15px; color: black;">Data Report</span>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link px-3">
            <span class="me-2">
              <i class="bi bi-clipboard2-data"></i>
            </span>
            <span class="fw-bold" style="font-size: 15px; color: black;">Package Tracking</span>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link px-3">
            <span class="me-2">
              <i class="bi bi-clipboard2-data"></i>
            </span>
            <span class="fw-bold" style="font-size: 15px; color: black;">Customer Complains</span>
          </a>
        </li>
        <li class="my-4">
          <hr class="dropdown-divider">
        </li>
       <!-- <div class="custom-control custom-switch px-3">
          <label class="custom-control-label" for="darkSwitch">
          <span class="fw-bold">
             <i class="bi bi-moon me-2"></i>
            Dark Mode</span> ->
          </label>
          <input type="checkbox" class="custom-control-input checkbox ms-auto" id="darkSwitch">
        </div>-->
        <li class="my-4">
          <hr class="dropdown-divider">
        </li>
        <li>
          <a href="#" class="nav-link px-3">
            <span class="me-2">
              <!-- <i class="bi bi-info-circle"></i> -->
            </span>
            <!-- Provided by 
            <span class="fw-bold">AppSeed</span> -->
          </a>
        </li>
      </li>
        </li>
      </ul>
    </nav>
  </div>
</div> <br>
<!-- Sidebar End -->

<!-- Main Content Start -->
<!-- <main class="mt-5 pt-3">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 fw-bold fs-3 col d-flex justify-content-center">Main Dashboard</div>
    </div>
    <div class="row mt-2 col d-flex justify-content-center">
      <div class="col-md-3 mb-3">
        <div class="card text-white bg-primary h-100">
          <div class="card-header fw-bold">Amazon Seller Central</div>
          <div class="card-body">
            <h5 class="card-title">Access Amazon Seller central api</h5>
            <p class="card-text">Authenticate API now <a href="tapi.php" target="_blank" style="color: white;">API link</a></p>
          </div>
        </div>
      </div> -->
      
<!-- Main Content End -->




  <div id="amz" style="border: solid 1px; width: 500px; height: 100%;  padding-top: 20px; margin: 0 auto; margin-top: 100px;  border-radius: 20px;">
        <p><img src="amz.png" width="490"/> 
        <h3>Connect To Amazon Seller central</h3>
        <h5 class="card-title">Access Amazon Seller central api</h5>
            <p class="card-text">Authenticate API now <a href="tapi.php" target="_blank">API link</a></p>
        <div id="frm" style="width: 490px; margin: 0 auto; border: 1px solid; border-radius: 10px; padding: 10px 10px; margin-bottom: 10px;" >      
            <form action="" method="POST">
              <label>Marketplace ID</label>
                <input id="i" type="text" name="seller_id" required class="form-control" placeholder="Enter Marketplace ID">
              <label>Seller ID</label>
                <input type="text"  id="i" name="seller_id" required class="form-control" placeholder="Enter Seller ID">
              <label>AWS Access Key ID</label>
                <input type="text" id="i" name="seller_id" required class="form-control" placeholder="Enter AWS Access Key ID">
              <label>Secret Key</label>
                <input type="text" id="i" name="seller_id" required class="form-control" placeholder="Enter Secret Key"><br>
              
              <label>Transport Option Using Amazon Shipping Services:</label><br>
              <div class="tp">   
                <input type="radio" name="options" id="option1" style="" class="tp" checked>Standard<br> 
                <input type="radio" name="options" id="option2">Free Economy<br>
                <input type="radio" name="options" id="options3">Expedited
              </div><br>

              <label>Declared Value</label>
                <input type="text" id="i" name="seller_id" required class="form-control" placeholder="Declared Value">
              <label>Declared Weight</label>
                <input type="text" id="i" name="seller_id" required class="form-control" placeholder="Declared Weight"> <br>
              <label >Select Warehouse</label>
              <select name="warehouse" id="war">
                <option value="javascript" checked>WareHouse1</option>
                <option value="javascript">WareHouse2</option><br>
                <option value="javascript">WareHouse3</option>
              </select><br>


                <div id="sc" style="display: block;margin: 0 auto;">
                  <input type="submit"  value="submit" style="line-height: 1.9; margin-left: 100px;margin-top: 10px;  background-color: #ff9900; border-radius: 9px; width: 90px; transition: " formaction="https://sellercentral.amazon.com"> <input type="reset" value="cancel" style="line-height: 1.9; margin-top: 10px;  background-color: #E0E0E0; border-radius: 9px; width: 90px;"></span>
                </div>
        </div>
        <div>
        <h3>Display Amazon Seller Inventory Data</h3>
       <p><a href="tabledata.html">Access Link</a></p> 
  </div>
  </div> 
    
  


<!-- Scripts Start -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.2/dist/chart.min.js"></script>
<script src="/js/script.js"></script>
<script src="/js/dark-mode-switch.min.js"></script>
<!-- Scripts End -->

</body>
</html>
