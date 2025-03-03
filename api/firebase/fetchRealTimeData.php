<?php

$projectId = "route-1af57"; // Remplacez par l'ID de votre projet Firebase
$authToken = "<YOUR_AUTH_TOKEN>"; // Le token d'accès généré par Firebase Authentication ou le Service Account
$collectionPath = "routes"; // Le chemin vers la collection Firestore

// URL de l'API REST de Firestore
$url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/{$collectionPath}";

// Initialiser cURL
$ch = curl_init($url);

// Ajouter le token d'accès dans les en-têtes de la requête
$headers = [
    "Authorization: Bearer {$authToken}"
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Exécuter la requête
$response = curl_exec($ch);

// Vérifier les erreurs de cURL
if (curl_errno($ch)) {
    echo 'Erreur cURL: ' . curl_error($ch);
}

// Fermer la session cURL
curl_close($ch);

// Afficher la réponse JSON
echo $response;
?>
