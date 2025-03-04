<?php
// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etat_route";

// Créer la connexion PDO
try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Fonction pour générer une vibration aléatoire dans l'intervalle [15.0, 20.0] pour tomber dans CRITIQUE
function generateCriticalVibration() {
    return round(mt_rand(150, 200) / 10, 1); // Génère une valeur entre 15.0 et 20.0
}

try {
    // Préparer la requête d'update pour les vibrations
    $stmt = $pdo->prepare("UPDATE route_data SET vibration = :vibration WHERE trajet = 'Nyangwe'");

    // Générer une vibration aléatoire dans la plage "CRITIQUE"
    $vibration = generateCriticalVibration();

    // Lier la vibration générée à la requête
    $stmt->bindParam(':vibration', $vibration, PDO::PARAM_STR);

    // Exécution de la requête pour mettre à jour les valeurs
    $stmt->execute();

    echo json_encode(['status' => 'success', 'message' => 'Data updated successfully.']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error updating data: ' . $e->getMessage()]);
}

// Fermer la connexion PDO
$pdo = null;
?>
