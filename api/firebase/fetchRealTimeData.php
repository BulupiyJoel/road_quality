<?php
// Start the session
session_start();

function setCoordsInSession($projectId, $authToken, $collectionPath) {
    // URL of the Firestore REST API
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/{$collectionPath}";

    // Initialize cURL
    $ch = curl_init($url);

    // Set the authorization header
    $headers = [
        "Authorization: Bearer {$authToken}"
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request
    $response = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        echo 'cURL Error: ' . curl_error($ch);
        return false; // Return false if there's an error
    }

    // Close the cURL session
    curl_close($ch);

    // Decode the JSON response
    $data = json_decode($response, true);

    // Check if documents exist
    if (isset($data["documents"]) && count($data["documents"]) > 0) {
        // Access the first document
        $document = $data["documents"][0]["fields"];

        // Ensure 'lat' and 'lon' are present and convert them to float
        if (isset($document["lat"]["stringValue"]) && isset($document["lon"]["stringValue"])) {
            $lat = (float)$document["lat"]["stringValue"];
            $lon = (float)$document["lon"]["stringValue"];

            // Set the coordinates in the session
            $_SESSION['latitude'] = $lat;
            $_SESSION['longitude'] = $lon;

            echo "Coordinates set in session: Latitude = {$lat}, Longitude = {$lon}\n";
            return true; // Return true if coordinates are successfully set
        } else {
            echo "Latitude or Longitude not found.\n";
            return false; // Return false if lat or lon are missing
        }
    } else {
        echo "No documents found or error in response.\n";
        return false; // Return false if no documents found
    }
}

// Example usage
$projectId = "hospit-4a420"; // Replace with your Firebase project ID
$authToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjNjI2MmYzZTk3NzIzOWMwMDUzY2ViODY0Yjc3NDBmZjMxZmNkY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9zcGl0LTRhNDIwIiwiYXVkIjoiaG9zcGl0LTRhNDIwIiwiYXV0aF90aW1lIjoxNzQxMDY3NTEzLCJ1c2VyX2lkIjoiR3hYdnNQYWlzTmJETmtZZ0VIOGpHcjd3azlnMSIsInN1YiI6Ikd4WHZzUGFpc05iRE5rWWdFSDhqR3I3d2s5ZzEiLCJpYXQiOjE3NDEwNjc1MTMsImV4cCI6MTc0MTA3MTExMywiZW1haWwiOiJidWx1cGl5QGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJidWx1cGl5QGVtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ksdnggouxASGydljZbK3ynTYDmVpi06iNBuEkEcNmrdK9szpNiKuKbQRH0ik5BWQ7bjt8OKp-Pv5Ani8w3wTeJuX5dBUibqkMDsQv8bkkNOBy5Pt5wBBeCjn-bg5R-sI4vJj-1dtoa_600fL06vab5bc3-l0lbSXBoHR0cT7WD--kNl8LKukSa2pc1Pcss12v6sNsyhLI5IelPhDfK-8I6apIaKzry8QhljYIIi2UUOFOERZW2U7mdp09kIkbnuVGh8uD6RFAa7gVq5HJ4dI_tkzr9flyABKFeKcY5e8SBKevFr8n6MOAkCRFbriXaBDP3qkaziJBA56HxuxtQ84FQ"; // The Firebase Authentication or Service Account token
$collectionPath = "route"; // The Firestore collection path

// Call the function to set coordinates in session
setCoordsInSession($projectId, $authToken, $collectionPath);
?>
