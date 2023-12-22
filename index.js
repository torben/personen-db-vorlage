import Person from "./classes/Person.js" // Importiert unsere Personenklasse
import readlineLib from "readline" // Modul "readline" von node importieren (https://nodejs.org/api/readline.html). Kommt aus der "package.json"

// Readline init. Wir wird die Eingabe und Ausgabe von unserem Node-Prozess an die readline Lib weitergegeben
const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Zeigt das "Hauptmenü"
function showMenu() {
  const question = `
  Was möchtest machen?
  1: Personen auflisten
  2: Person anlegen
  3: Person suchen
  4: Person löschen
  `
  readline.question(question, function(answer) {
    if (answer === "1") { // Wenn eingabe 1 ist (ist immer ein String, deswegen "1" nicht nur 1)
      listPersons() // ruft Funktion "listPersons" auf
    } else if (answer === "2") { // Wenn eingabe 2 ist (ist immer ein String, deswegen "2" nicht nur 2)
      createPerson() // ruft Funktion "createPerson" auf
    } else if (answer === "3") {
      searchPerson()
    } else if (answer === "4") {
      deletePerson()
    } else {
      showMenu() // bei einer anderen Eingabe zeigen wir wieder das Menü. Ansonsten würde das Programm hängen bleiben
    }
  })
}

// Zeigt alle Personen in unserer Datenbank
function listPersons() {
  // Da die Abfrage zur Datenbank asynchron ist, haben wir hier kein direktes "return" mehr. Also übergeben wir eine Funktion an "Person.all", die aufgerufen wird, wenn Ergebnisse gefunden wurden.
  Person.all(function(persons) {
    persons.forEach(function(person) { // forEach durchläuft alle Personen aus "Person.all"
      console.log(person.output()) // loggt die Ausgabe von "person.output()"
    })
    showMenu() // Nach der Ausgabe zeigen wir wieder das Menü
  })
}

// Erstellt eine neue Person
function createPerson() {
  const question = "Wie soll die Person heißen?"
  readline.question(question, function(name) { // Fragt nach dem Name des Users
    Person.create(name) // Erstellt eine neue Person
    showMenu() // Nach dem Anlegen wird das Menü wieder gezeigt
  })
}

function searchPerson() {
  const question = "Wie lautet die ID?"
  readline.question(question, function(id) {
    const person = Person.find(id)
    if (person) {
      console.log(person.output())
    } else {
      console.log("Person nicht gefunden")
    }
    showMenu()
  })
}

function deletePerson() {
  const question = "Wie lautet die ID?"
  readline.question(question, function(id) {
    Person.delete(id)
    showMenu()
  })
}

showMenu() // Ruft das Menü zum ersten mal auf. Ansonsten würde einfach nichts passieren
