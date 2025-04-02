<?php
session_start();

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:5177");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure only POST requests are processed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit();
}

// Include database connection
require_once 'db_connection.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email and password are required']);
    exit();
}

try {
    // Get database connection
    $conn = getDatabaseConnection();

    // Prepare SQL to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password
    if ($user && password_verify($data['password'], $user['password'])) {
        // Successful login
        // Regenerate session ID for security
        session_regenerate_id(true);
        
        // Store user info in session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];

        // Generate a simple token (in a real app, use JWT or more secure method)
        $token = bin2hex(random_bytes(16));

        // Prepare response
        $response = [
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'name' => $user['full_name'],
                'email' => $user['email']
            ],
            'token' => $token
        ];

        echo json_encode($response);
    } else {
        // Failed login
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
    }
} catch (Exception $e) {
    // Server error
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
}