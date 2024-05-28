#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <time.h>

#define SoilMS 34
#define relay 27
#define humedadMax 4095
#define humedadMin 30

const char* ssid = "Galaxy Note10a8fa";
const char* password = "07121998";
const char* serverAddress = "192.168.128.9";
const int serverPort = 80;

WiFiClient client;
LiquidCrystal_I2C lcd(0x27, 16, 2);

byte gota[] = {
  B00000, B00100, B00100, B01110,
  B11111, B11111, B11111, B01110
};

byte rayo[] = {
  B00000, B00010, B00100, B01000,
  B01110, B00010, B00100, B01000
};

uint8_t getSoilmoisture() {
    int sensorValue = analogRead(SoilMS);
    return map(sensorValue, humedadMax, 0, 0, 100);
}

void setup() {
    Serial.begin(9600);
    lcd.init();
    lcd.backlight();
    lcd.createChar(0, rayo);
    lcd.createChar(1, gota);
    pinMode(relay, OUTPUT);
    digitalWrite(relay, HIGH);

    WiFi.begin(ssid, password);
    Serial.print("Conectando a la red ");
    Serial.println(ssid);
    lcd.setCursor(0, 0);
    lcd.print("Conectando a WiFi");

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        lcd.setCursor(attempts % 16, 1);
        lcd.print(".");
        attempts++;
        if (attempts > 60) {
            Serial.println("No se pudo conectar a WiFi. Reiniciando...");
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Reiniciando...");
            delay(2000);
            ESP.restart();
        }
    }
    Serial.println("");
    Serial.println("Conexión WiFi establecida");
    Serial.println("Dirección IP: ");
    Serial.println(WiFi.localIP());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi conectado");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP());

    configTime(-5 * 3600, 0, "pool.ntp.org", "time.nist.gov");
}

void subirHumedad(uint8_t humedad) {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }

    char dateBuffer[11], timeBuffer[9];
    strftime(dateBuffer, sizeof(dateBuffer), "%Y-%m-%d", &timeinfo);
    strftime(timeBuffer, sizeof(timeBuffer), "%H:%M:%S", &timeinfo);

    String postData = "fk_planta=1&humedad=" + String(humedad) + "&fecha=" + String(dateBuffer) + "&hora=" + String(timeBuffer);

    if (client.connect(serverAddress, serverPort)) {
        Serial.println("Conexión exitosa para subir humedad");
        client.println("POST /server/guardar_humedad.php HTTP/1.1");
        client.println("Host: " + String(serverAddress));
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(postData.length());
        client.println();
        client.println(postData);

        while (client.connected() && !client.available()) delay(1);

        while (client.available()) {
            char c = client.read();
            Serial.print(c);
        }
        client.stop();
    } else {
        Serial.println("Error de conexión");
    }
}

void loop() {
    static bool dataUploaded = false;
    static unsigned long lastUploadTime = 0;
    const unsigned long uploadInterval = 30000;

    uint8_t humidityPercentage = getSoilmoisture();

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Humedad: ");
    lcd.print(humidityPercentage);
    lcd.print("%");
    lcd.write(0);

    lcd.setCursor(0, 1);
    lcd.print("Valor: ");
    lcd.print(analogRead(SoilMS));
    lcd.write(1);

    if (humidityPercentage < humedadMin && !dataUploaded) {
        digitalWrite(relay, LOW);

        struct tm timeinfo;
        if (!getLocalTime(&timeinfo)) {
            Serial.println("Failed to obtain time");
            return;
        }

        char dateBuffer[11], timeBuffer[9];
        strftime(dateBuffer, sizeof(dateBuffer), "%Y-%m-%d", &timeinfo);
        strftime(timeBuffer, sizeof(timeBuffer), "%H:%M:%S", &timeinfo);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Fecha: ");
        lcd.print(dateBuffer);
        lcd.setCursor(0, 1);
        lcd.print("Hora: ");
        lcd.print(timeBuffer);

        String postData = "fk_planta=1&fecha_riego=" + String(dateBuffer) + "&hora_riego=" + String(timeBuffer);

        Serial.println("Subiendo datos de riego...");
        Serial.print("Fecha: ");
        Serial.println(dateBuffer);
        Serial.print("Hora: ");
        Serial.println(timeBuffer);

        if (client.connect(serverAddress, serverPort)) {
            Serial.println("Conexión exitosa para subir riego");
            client.println("POST /server/guardar.php HTTP/1.1");
            client.println("Host: " + String(serverAddress));
            client.println("Content-Type: application/x-www-form-urlencoded");
            client.print("Content-Length: ");
            client.println(postData.length());
            client.println();
            client.println(postData);

            while (client.connected() && !client.available()) delay(1);

            while (client.available()) {
                char c = client.read();
                Serial.print(c);
            }
            client.stop();
            dataUploaded = true;
        } else {
            Serial.println("Error de conexión");
        }

        delay(5000);
    } else {
        digitalWrite(relay, HIGH);
        delay(1000);
        dataUploaded = false;
    }

    if (millis() - lastUploadTime >= uploadInterval) {
        subirHumedad(humidityPercentage);
        lastUploadTime = millis();
    }
}
