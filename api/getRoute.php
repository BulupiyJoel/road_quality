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

// Prepare the SQL query to retrieve all data from the route_data table
$sql = "SELECT vibration FROM `route_data` WHERE `trajet` = '30 Juin' "; // You can modify this query as needed (e.g., by adding limits)

try {
    // Execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Fetch all the data
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If data exists, return it as a JSON response
    if ($data) {
        echo json_encode($data);
    } else {
        // If no data is found, return a message
        echo json_encode(['status' => 'error', 'message' => 'No data found']);
    }

} catch (PDOException $e) {
    // If there's an error in the query, return error response
    echo json_encode(['status' => 'error', 'message' => 'Error fetching data: ' . $e->getMessage()]);
}

// Close the PDO connection
$pdo = null;
?>
