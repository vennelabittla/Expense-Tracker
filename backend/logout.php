<?php
session_start();
session_destroy();

$config = require 'auth0_config.php';

// Redirect to Auth0 logout
$logoutUrl = sprintf(
    'https://%s/v2/logout?client_id=%s&returnTo=%s',
    $config['domain'],
    $config['client_id'],
    // urlencode('http://localhost/login.php')
    urlencode($_SERVER['HTTP_HOST'] . '/login.php')

);

header("Location: $logoutUrl");
exit();