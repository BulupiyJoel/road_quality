<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etat_route";

// Créer la connexion
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(array("status" => "error", "message" => "Connection failed: " . $e->getMessage()));
    die();
}

// Requête pour récupérer les données agrégées par trajet
$query = "
    SELECT 
        id,
        trajet,
        ROUND(AVG(vibration),1) AS avg_vibration,
        CASE 
            WHEN AVG(vibration) > 15.0 THEN 'CRITIQUE'
            WHEN AVG(vibration) > 10.0 THEN 'MAUVAISE'
            WHEN AVG(vibration) > 5.0  THEN 'MOYENNE'
            ELSE 'BONNE'
        END AS etat
    FROM route_data
    GROUP BY trajet
";
$stmt = $conn->prepare($query);
$stmt->execute();

// Récupérer les résultats sous forme de tableau
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Vérifier si des données ont été récupérées
if (count($data) > 0) {
    echo json_encode($data);
} else {
    echo json_encode(array(
        "status" => "error",
        "message" => "No data found"
    ));
}

$conn = null;
?>
