<?php
$host = getenv('localhost');
$user = getenv('root');
$password = getenv('DB_PASSWORD');
if ($password === 'none' || trim($password) === '') {
    $password = '';  // Convert 'none' or empty value back to an empty string
}
$dbname = getenv('expense');

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>