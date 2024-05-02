#include <WiFi.h>
#include <ArduinoHttpClient.h>

const char* ssid = "Galaxy Note10a8fa";
const char* password = "u6SzbAQD";
const char* serverAddress = "192.168.128.9"; // Dirección IP de tu servidor local
const int serverPort = 80; // Puerto del servidor web

WiFiClient client;

void setup() {
    Serial.begin(9600);
    while (!Serial) {}

    // Conexión a la red WiFi
    WiFi.begin(ssid, password);
    Serial.print("Conectando a la red ");
    Serial.println(ssid);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("Conexión WiFi establecida");
    Serial.println("Dirección IP: ");
    Serial.println(WiFi.localIP());
}

void loop() {
    if (client.connect(serverAddress, serverPort)) {
        Serial.println("Conexión exitosa");

        // Envía la solicitud HTTP
        client.println("GET /tuscript.php HTTP/1.1");
        client.println("Host: " + String(serverAddress));
        client.println("Connection: close");
        client.println();

        // Lee la respuesta
        while (client.available()) {
            char c = client.read();
            Serial.print(c);
        }
        client.stop();
    } else {
        Serial.println("Error de conexión");
    }

    delay(5000); // Espera 5 segundos antes de realizar la próxima solicitud
}

