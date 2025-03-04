<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Configuration de la base de données
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'etat_route';

// Créer la connexion
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(array('status' => 'error', 'message' => 'Connection failed: ' . $e->getMessage()));
    die();
}

// Vérifier les paramètres requis
$required = ['etat', 'vibration', 'distance'];
foreach ($required as $param) {
    if (!isset($_POST[$param])) {
        echo json_encode(array('status' => 'error', 'message' => "Missing parameter: $param"));
        die();
    }
}

// Nettoyer et valider les données
$etat = filter_input(INPUT_POST, 'etat', FILTER_SANITIZE_STRING);
$vibration = filter_input(INPUT_POST, 'vibration', FILTER_VALIDATE_FLOAT);
$distance = filter_input(INPUT_POST, 'distance', FILTER_VALIDATE_FLOAT);

try {
    // Retrieve the most recent coordinates from the coordinates table
    $lastRoute = $conn->prepare("SELECT * FROM coordinates ORDER BY id DESC LIMIT 1");
    $lastRoute->execute();
    $data = $lastRoute->fetch(PDO::FETCH_ASSOC);

    if (!$data) {
        echo json_encode(array('status' => 'error', 'message' => 'No data found in coordinates table.'));
        die();
    }

    // Préparation de la requête SQL pour insérer dans la table route_data
    $stmt = $conn->prepare("INSERT INTO route_data
        (trajet, etat, vibration, distance, date_mesure, lon, lat)
        VALUES (:trajet, :etat, :vibration, :distance, NOW(), :lon, :lat)");

    // Bind parameters with appropriate types
    $stmt->bindParam(':trajet', $data["trajet"], PDO::PARAM_STR);
    $stmt->bindParam(':etat', $etat, PDO::PARAM_STR);
    $stmt->bindParam(':vibration', $vibration, PDO::PARAM_STR); // or PDO::PARAM_INT if vibration is stored as int
    $stmt->bindParam(':distance', $distance, PDO::PARAM_STR);   // or PDO::PARAM_INT if distance is stored as int
    $stmt->bindParam(':lon', $data["lon"], PDO::PARAM_STR);  // Treating lon as FLOAT
    $stmt->bindParam(':lat', $data["lat"], PDO::PARAM_STR);  // Treating lat as FLOAT

    // Exécution de la requête
    $stmt->execute();

    // Return success response
    echo json_encode(array(
        'status' => 'success',
        'message' => 'Data saved successfully',
        'id' => $conn->lastInsertId()
    ));

} catch (PDOException $e) {
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Error saving data: ' . $e->getMessage()
    ));
}

$conn = null;
?>
