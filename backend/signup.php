<?php
// CORS Headers
$allowedOrigins = ['http://localhost:5177', 'http://localhost'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
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
$requiredFields = ['name', 'email', 'password'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => ucfirst($field) . ' is required']);
        exit();
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit();
}

// Validate password strength (example: min 8 characters)
if (strlen($data['password']) < 8) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Password must be at least 8 characters long']);
    exit();
}

try {
    // Get database connection
    $conn = getDatabaseConnection();

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $checkStmt->execute([$data['email']]);
    if ($checkStmt->fetchColumn() > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Email already exists']);
        exit();
    }

    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

    // Prepare SQL to insert new user
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([
        $data['name'], 
        $data['email'], 
        $hashedPassword
    ]);

    // Successful registration
    echo json_encode([
        'success' => true, 
        'message' => 'User registered successfully!'
    ]);

} catch (Exception $e) {
    // Server error
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Registration failed: ' . $e->getMessage()
    ]);
}