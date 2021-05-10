<?php

function __autoload($class_name)
{
    $folders = array(
        "Esercizio1",
        "SiteManagement",
        "Student",
        "Todo",
        "Tracer",
        "User",
        "Shared",
        "Configuration",
        "Api"
    );

    $filename = $class_name . '.php';

    $file = $filename;

    foreach ($folders as $folder) {
        if (file_exists("./src/$folder/$file")) {
            require_once("./src/$folder/$file");
            return true;
        }
    }
    return FALSE;
}
