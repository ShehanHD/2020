<?php

class Env
{
    public function __construct()
    {
        putenv("DB_HOST=192.168.1.100");
        putenv("DB_USER=client");
        putenv("DB_PASSWORD=user123");
        putenv("DB_PORT=3307");
        putenv("JWT_KEY=mysecretkeyinsecretkey");
    }
}
