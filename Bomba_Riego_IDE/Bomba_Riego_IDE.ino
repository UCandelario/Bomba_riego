#include <WiFi.h>
#include <time.h>

const char* ssid = "Galaxy Note10a8fa";
const char* password = "07121998";
const char* serverAddress = "192.168.128.9"; // Dirección IP del servidor PHP
const int serverPort = 80; // Puerto del servidor web

WiFiClient client;

void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

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

    // Configura la zona horaria (ejemplo para GMT-5)
    configTime(-5 * 3600, 0, "pool.ntp.org", "time.nist.gov");
    printLocalTime(); // Imprime la hora actual obtenida del NTP server
}

void loop() {
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        Serial.println("Failed to obtain time");
        return;
    }

    // Formatear la fecha y hora
    char dateBuffer[11], timeBuffer[9];
    strftime(dateBuffer, sizeof(dateBuffer), "%Y-%m-%d", &timeinfo);
    strftime(timeBuffer, sizeof(timeBuffer), "%H:%M:%S", &timeinfo);

    // Datos a enviar
    int fk_planta = 1; // Simula el ID de la planta que se riega

    // Construir el cuerpo del mensaje HTTP POST
    String postData = "fk_planta=" + String(fk_planta) + "&fecha_riego=" + dateBuffer + "&hora_riego=" + timeBuffer;

    if (client.connect(serverAddress, serverPort)) {
        Serial.println("Conexión exitosa");

        // Envía la solicitud HTTP POST
        client.println("POST /server/guardar.php HTTP/1.1");
        client.println("Host: " + String(serverAddress));
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(postData.length());
        client.println();
        client.println(postData);

        // Lee la respuesta del servidor
        while (client.available()) {
            char c = client.read();
            Serial.print(c);
        }
        client.stop();
    } else {
        Serial.println("Error de conexión");
    }

    delay(1000); // Espera 5 segundos antes de realizar la próxima solicitud
}

