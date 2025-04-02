<?php
session_start();

// Check authentication
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

require_once 'db_connection.php';

// Fetch user details
$conn = getDatabaseConnection();
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$user) {
    die('User not found.');
}

?>

<!DOCTYPE html>
<html>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($user['name']); ?></h1>
    <img src="<?php echo htmlspecialchars($user['picture']); ?>" alt="Profile">
    <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>
    <a href="logout.php">Logout</a>
</body>
</html>