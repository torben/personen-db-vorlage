import { persons as personsData } from "../data/person_data.js" // Lädt "Datenbank". "as" ist ein Alias mit dem wir den Namen der Variabel bestimmen können
import { v4 as uuid } from "uuid" // Lädt UUID Lib (https://wiki.ubuntuusers.de/UUID/). Kommt aus der "package.json"
import db from "../database.js" // Importiert unsere Datei, die die Verbindung zu unserer Datenbank aufbaut (SQLite)

// Klasse um Personen zu laden und anzuzeigen. Hat eine Verbindung zu unserer "Datenbank"
export default class Person {
  // Nimmt id und name entgegen und speichert diese in die Instanz
  constructor(id, name) {
    this.id = id
    this.name = name
  }

  // Erstellt für jeden Datenbankeintrag eine Instanz der Klasse. Das Ergebniss wird an die übergebene Funktion "callback" übergeben und aufgerufen
  static all(callback) {
    db.all("SELECT * FROM person", function(error, rows) { // db.all erwartet ein SQL und eine Funktion mit "error" und der Ergniss Recods als Array
      const persons = rows.map(function (personData) { // Map durchläuft alle Einträge und erstellt für jeden Eintrag eine Instanz
        return new Person(personData.id, personData.name)
      })

      callback(persons) // Wir rufen die übergebene Funktion mit den gefundenen Personen auf
    })
  }

  // Legt einen neuen Eintrag in der Datenbank an.
  static create(name) {
    // db.prepare bereitet eine SQL Abfrage vor. Es wird Hauptsächlich genutzt um eine SQL-Injection zu verhindern (weil Daten vom User kommen)
    // die ?, ? sind Platzhalter für unsere Werte
    const sql = db.prepare("INSERT INTO person (id, name) VALUES (?, ?);")
    sql.run([uuid(), name]) // Wir ersetzen die "?"" durch unsere Werte (Liste von Parametern)
    sql.finalize()
  }

  static find(id) {
    const foundData = personsData.find(function (personData) {
      if (personData.id === id) {
        return true
      } else {
        return false
      }
    })
    if (foundData) {
      return new Person(foundData.id, foundData.name)
    }
  }

  static delete(id) {
    const index = personsData.findIndex(element => element.id === id)

    if (index !== -1) {
      personsData.splice(index, 1)
    }
  }

  // Nutzen wir für eine einheitliche Darstellung unserer Person
  output() {
    // `this.` damit wir die aktuelle Werte der Instanz laden
    return `- ${this.id}: ${this.name}`
  }
}
