<?php
session_start();
session_regenerate_id(true);

require_once 'auth0_config.php';
require_once 'auth_helpers.php';
require_once 'db_connection.php';

$config = require 'auth0_config.php';

try {
    // Validate state to prevent CSRF
    if (!isset($_GET['state']) || !isset($_SESSION['state']) || 
        $_GET['state'] !== $_SESSION['state']) {
        throw new Exception('Invalid state');
    }

    // Exchange authorization code for tokens
    $tokens = exchangeCodeForTokens($config, $_GET['code']);

    // Validate tokens
    $tokenValidation = validateToken($config, $tokens['access_token']);

    if (!$tokenValidation['active']) {
        throw new Exception('Invalid token');
    }

    // Get user information
    $userInfo = getUserInfo($config, $tokens['access_token']);

    // Database connection
    $conn = getDatabaseConnection();

    // Prepare user data
    $auth0Id = $userInfo['sub'];
    $email = $userInfo['email'] ?? '';
    $name = $userInfo['name'] ?? '';
    $picture = $userInfo['picture'] ?? '';
    $provider = explode('|', $auth0Id)[0];

    // Upsert user in database
    $stmt = $conn->prepare("
        INSERT INTO users 
        (auth0_id, email, name, picture, provider, last_login) 
        VALUES (?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
        name = ?, 
        picture = ?, 
        last_login = NOW()
    ");

    $stmt->execute([
        $auth0Id, $email, $name, $picture, $provider,
        $name, $picture
    ]);

    // Start session
    $_SESSION['user_id'] = $conn->lastInsertId();
    $_SESSION['email'] = $email;

    // Redirect to dashboard
    header('Location: dashboard.php');
    exit();

} catch (Exception $e) {
    // Handle errors
    error_log($e->getMessage());
    header('Location: login.php?error=authentication_failed');
    exit();
}