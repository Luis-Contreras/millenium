<?php

require_once("Conexion.php");

class form extends Conexion{

    //creacion de bd y tabla en caso de que no exista
    public function createEnvironment(){

        $thisClass = new form();
        $con = $thisClass->getConexion();
        $bdName = "millenium";

        $db_selected = $con -> select_db($bdName);
        if (!$db_selected) {
            $sql = "CREATE DATABASE $bdName";
            $con->query($sql);
            $con -> select_db($bdName);
        }

        $sql = "CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL)";

        $con->query($sql);


        echo true;
    }

    //guardar informacion
    public function saveData($data){
        $thisClass = new form();
        $con = $thisClass->getConexion();
        $bdName = "millenium";

        $name = $data["name"];
        $lastName = $data["lastName"];

        $sql = "INSERT INTO $bdName.users (name, lastname) VALUES ('$name', '$lastName')";

        $res = $con->query($sql);

        if ($res) {
            echo true;
        } else {
            echo false;
        }

    }
    

}


?>