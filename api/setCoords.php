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

// Retrieve the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is valid
if ($data && isset($data['coordinates'])) {
    // Prepare SQL query for inserting data into the coordinates table
    $sql = "INSERT INTO coordinates (lat, lon, timestamp, trajet) VALUES (:lat, :lon, :timestamp, :trajet)";

    // Prepare the statement
    $stmt = $pdo->prepare($sql);

    // Loop through each coordinate and insert into the database
    foreach ($data['coordinates'] as $coordinate) {
        // Bind the parameters to the prepared statement
        $stmt->bindParam(':lat', $coordinate['lat'], PDO::PARAM_STR);
        $stmt->bindParam(':lon', $coordinate['lon'], PDO::PARAM_STR);
        $stmt->bindParam(':timestamp', $coordinate['timestamp'], PDO::PARAM_INT);
        $stmt->bindParam(':trajet', $coordinate['trajet'], PDO::PARAM_STR);

        // Execute the query
        try {
            $stmt->execute();
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error inserting data: ' . $e->getMessage()]);
            exit();
        }
    }

    echo json_encode(['status' => 'success', 'message' => 'Coordinates saved successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data.']);
}

// Close the PDO connection
$pdo = null;
?>
