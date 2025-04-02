<?php
$host = getenv('localhost');
$user = getenv('root');
$password = getenv('');
$dbname = getenv('expense');

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>