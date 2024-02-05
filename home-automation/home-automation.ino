#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Arduino_JSON.h>

const char* ssid = "JD SETH KA WIFI _Ext";
const char* password = "Chotiaunty";

//Your IP address or domain name with URL path
const char* serverName = "https://smart-homie.onrender.com/api/v1/device/allOutputStates?board=board1";

// Update interval time set to 5 seconds
const long interval = 5000;
unsigned long previousMillis = 0;

String outputsState;

void setup() {
  Serial.begin(115200);
pinMode(4, OUTPUT);
  WiFi.begin(ssid, password);
  Serial.println("Darshan");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(">");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {


  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      outputsState = httpGETRequest(serverName);


      Serial.println("darshan jain");

      JSONVar myObject = JSON.parse(outputsState);
      if (JSON.typeof(myObject) == "undefined") {
        Serial.println("Parsing input failed!");
        return;
      }



      Serial.print("JSON object = ");


      JSONVar rows = myObject["rows"];


      // can be used to get an array of all the keys in the object
      JSONVar keys = rows.keys();
      Serial.print(keys);
      for (int i = 0; i < keys.length(); i++) {
        JSONVar value = rows[keys[i]];
        Serial.print("GPIO: ");
        Serial.print(atoi(keys[i]));
        Serial.print(" - SET to: ");
        Serial.println(value);

        int outputValue = (bool)value ? HIGH : LOW;
        pinMode(atoi(keys[i]), OUTPUT);
        digitalWrite(atoi(keys[i]),  outputValue);
      }

     
     
      // save the last HTTP GET Request
      // previousMillis = currentMillis;
    } else {
      Serial.println("WiFi Disconnected");
    }
  }
}

String httpGETRequest(const char* serverName) {

  WiFiClientSecure* client = new WiFiClientSecure;

  // set secure client without certificate
  client->setInsecure();
  HTTPClient https;



  // Your IP address with path or Domain name with URL path
  https.begin(*client, serverName);

  // Send HTTP POST request
  int httpResponseCode = https.GET();

  String payload = "{}";

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = https.getString();
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  https.end();

  return payload;
}
