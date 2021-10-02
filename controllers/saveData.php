<?php

    require_once("../models/form.php");

    $data = $_POST;

    $form = new form();

    $form->saveData($data);
?>