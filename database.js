import sqlite3 from "sqlite3" // Importiert unser SQLite package 

// Stellt eine Verbindung zu unserer Datenbank (PersonDB.db) bereit.
// Öffnet die Datei mit Lese/Schreib- Rechten.
// Wenn die Verbindung bereit ist wird die Funktion aufgerufen. Wenn die Verbindung nicht erfolgreich war, ist die Variabel "err" vorhanden.
export default new sqlite3.Database('./data/PersonDB.db', sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    console.log(err.message) // Wir loggen den Fehler, wenn einer existiert
    return
  }

  console.log("Verbindung wurde erfolgreich aufgebaut!") // Information für uns über den Erfolg.
})
