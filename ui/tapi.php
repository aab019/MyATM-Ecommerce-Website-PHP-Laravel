<?php
    $con = mysqli_connect("localhost", "root", "", "sellers_galaxy");

    $res = array();

    if($con){
        $sql = "SELECT * FROM db";
        $result = mysqli_query($con,$sql);
        if($result){
            header("Content-type: JSON");
            $i = 0;
            while($row = mysqli_fetch_array($result)){
                $res[$i]['name'] = $row['name'];
                $res[$i]['email'] = $row['email'];
                $res[$i]['phno'] = $row['phno'];
                $res[$i]['passwd'] = $row['passwd'];
                //echo $row['name'];
                //echo $row['email'];
                //echo $row['phno'];
                //echo $row['passwd'];
            }
            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    }
    else{
        "f";
    }
?>