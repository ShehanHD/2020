<?php

function __autoload($class_name): bool
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

function controlOrigin($ORIGIN): bool
{
    $whiteList = array("https://www.wecode.best", "https://wecode.best", "http://localhost:3000", null);
    $verified = false;

    foreach ($whiteList as $value) {
        if($value === $ORIGIN){
            $verified = true;
        }
    }

    return $verified;
}