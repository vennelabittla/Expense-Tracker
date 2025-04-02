<?php
function getDatabaseConnection() {
    $host = 'localhost';
    $dbname = 'expense'; // Update with your database name
    $username = 'root';
    $password = '';

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        // Log error in production
        error_log("Database Connection Error: " . $e->getMessage());
        
        // Return generic error to client
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'error' => 'Database connection failed'
        ]);
        exit();
    }
}