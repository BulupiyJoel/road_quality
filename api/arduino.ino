#include <Adafruit_MPU6050.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

Adafruit_MPU6050 mpu;

// Configuration Wi-Fi
const char* ssid = "WI-FI";
const char* password = "bulupiy#71";
const char* server = "http://192.168.103.94/road_quality/api/store.php";

// Configuration capteur
const float VITESSE_MOYENNE = 1.39;   // 5 km/h en m/s
const float INTERVALLE_ENVOI = 100;   // 1 km en mètres

// Variables
float distanceParcourue = 0;
unsigned long dernierCalcul = 0;
float sommeVibrations = 0;
int nombreMesures = 0;

void setup() {
  Serial.begin(115200);

  // Initialisation MPU6050
  if (!mpu.begin()) {
    Serial.println("Échec de détection du MPU6050 !");
    while(1);
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

  // Connexion Wi-Fi
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connecté");
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Affichage des valeurs brutes
  Serial.print("Accel (m/s²) - X:");
  Serial.print(a.acceleration.x);
  Serial.print(" Y:");
  Serial.print(a.acceleration.y);
  Serial.print(" Z:");
  Serial.print(a.acceleration.z);

  Serial.print(" | Gyro (deg/s) - X:");
  Serial.print(g.gyro.x);
  Serial.print(" Y:");
  Serial.print(g.gyro.y);
  Serial.print(" Z:");
  Serial.print(g.gyro.z);

  Serial.print(" | Temp: ");
  Serial.print(temp.temperature);
  Serial.println(" °C");

  // Calcul distance
  unsigned long maintenant = millis();
  float tempsEcoule = (maintenant - dernierCalcul) / 1000.0;
  distanceParcourue += VITESSE_MOYENNE * tempsEcoule;
  dernierCalcul = maintenant;

  // Accumuler les vibrations
  float vibration = abs(a.acceleration.z);
  sommeVibrations += vibration;
  nombreMesures++;

  // Affichage distance cumulée
  Serial.print("Distance parcourue: ");
  Serial.print(distanceParcourue);
  Serial.println(" m");

  // Envoi et réinitialisation
  if(distanceParcourue >= INTERVALLE_ENVOI) {
    float moyenneVibration = sommeVibrations / nombreMesures;
    String etatRoute = determinerEtatRoute(moyenneVibration);

    Serial.print("\n📡 Envoi données - Vibration moyenne: ");
    Serial.print(moyenneVibration);
    Serial.print(" m/s² | Intervalle: ");
    Serial.print(INTERVALLE_ENVOI);
    Serial.println(" m");

    if(WiFi.status() == WL_CONNECTED) {
      envoyerDonnees(etatRoute, moyenneVibration);
    }

    distanceParcourue = 0;
    sommeVibrations = 0;
    nombreMesures = 0;
    Serial.println("----------------------------------");
  }

  delay(50); // Délai ajusté pour lisibilité
}

String determinerEtatRoute(float vibration) {
  String etat = vibration > 15.0 ? "CRITIQUE" :
                vibration > 10.0 ? "MAUVAISE" :
                vibration > 5.0  ? "MOYENNE" : "BONNE";

  Serial.print("État route: ");
  Serial.println(etat);
  return etat;
}

void envoyerDonnees(String etat, float vibration) {
  HTTPClient http;
  WiFiClient client;

  String postData = "etat=" + etat
                  + "&vibration=" + String(vibration,1)
                  + "&distance=" + String(INTERVALLE_ENVOI,1);

  http.begin(client, server);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int code = http.POST(postData);

  Serial.print("Code réponse HTTP: ");
  Serial.println(code);
  http.end();
}