import requests

# Funzione per la registrazione
def register():
    lat1 = input("Inserisci la prima latitudine ")
    lon1 = input("Inserisci la prima longitudine ")
    lat2 = input("Inserisci la seconda latitudine ")
    lon2 = input("Inserisci la seconda longitudine ")

    data = {
        "lat1": lat1,
        "lon1": lon1,
        "lat2": lat2,
        "lon2": lon2
    }

    response = requests.get("http://localhost:3000/calcolo", json=data)

    if response.status_code == 200:
        print("distanza calcolata con successo!")
        print("metri: " + str(response.json()))
        # Ottieni il token dalla risposta
    else:
        print("Errore durante il calcolo")


register();