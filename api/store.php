<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8" );

// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etat_route";

// Créer la connexion
try {
    $conn = new PDO( "mysql:host=$servername;dbname=$dbname", $username, $password );
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch( PDOException $e ) {
    echo json_encode( array( "status" => "error", "message" => "Connection failed: " . $e->getMessage() ) );
    die();
}

// Vérifier les paramètres requis
$required = ["etat", "vibration", "distance" ];
foreach ( $required as $param ) {
    if ( !isset( $_POST[ $param ] ) ) {
        echo json_encode( array( "status" => "error", "message" => "Missing parameter: $param" ) );
        die();
    }
}

// Nettoyer et valider les données
$trajet = "ISIRO";
$etat = filter_input( INPUT_POST, "etat", FILTER_SANITIZE_STRING );
$vibration = filter_input( INPUT_POST, "vibration", FILTER_VALIDATE_FLOAT );
$distance = filter_input( INPUT_POST, "distance", FILTER_VALIDATE_FLOAT );

Try {
    // Préparation de la requête SQL
    $stmt = $conn->prepare("INSERT INTO route_data
        (trajet,etat, vibration, distance, date_mesure)
        VALUES (:trajet, :etat, :vibration, :distance, NOW())");

    // Exécution avec les paramètres
    $stmt->execute( [
        ":trajet" => $trajet,
        ":etat" => $etat,
        ":vibration" => $vibration,
        ":distance" => $distance,
    ] );

    echo json_encode( array(
        "status" => "success",
        "message" => "Data saved successfully",
        "id" => $conn->lastInsertId()
    ) );

} catch( PDOException $e ) {
    echo json_encode( array(
        "status" => "error",
        "message" => "Error saving data: " . $e->getMessage()
    ) );
}

$conn = null;
?>

