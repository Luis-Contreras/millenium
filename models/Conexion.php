<?php 

 class Conexion 
{

    //Conexion a base de datos donde se valida si la bd existe, si no la crea

    public function getConexion()
    {
    
      require_once("../utils/headers.php");

      $server = "localhost";
      $user = "root";
      $pwd = "";
      $db = "";

      $conn = new mysqli($server, $user, $pwd);


      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }


        return $conn;

        
    
    }

     
}


?>