<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost"; // Your database host (localhost for local development)
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "etat_route"; // Your database name

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // If there's an error in connection, return error response
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Query to select the last inserted record from the coordinates table
$sql = "SELECT * 
        FROM coordinates
        ORDER BY id DESC LIMIT 1";

// Prepare and execute the query
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the last inserted record

    if ($result) {
        // Return the last inserted data as a response
        echo json_encode($result);
    } else {
        // No data found
        echo json_encode(['status' => 'error', 'message' => 'No data found']);
    }
} catch (PDOException $e) {
    // If there's an error in the query execution
    echo json_encode(['status' => 'error', 'message' => 'Error retrieving data: ' . $e->getMessage()]);
}

// Close the PDO connection
$pdo = null;
?>
