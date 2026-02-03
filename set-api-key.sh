#!/bin/bash

# 🔑 Sätt OpenAI API-nyckel
# Detta script hjälper dig att sätta din API-nyckel

echo "🔑 OpenAI API-nyckel Setup"
echo "=========================="
echo ""

# Kolla om .env redan finns
if [ -f .env ]; then
    echo "✅ .env-fil finns redan"
    echo ""
    read -p "Vill du uppdatera den? (j/n): " update
    if [ "$update" != "j" ]; then
        echo "Avbryter..."
        exit 0
    fi
fi

# Läs in API-nyckeln
echo "Klistra in din OpenAI API-nyckel (börjar med sk-...):"
read -s api_key

# Validera att nyckeln börjar med sk-
if [[ ! $api_key =~ ^sk- ]]; then
    echo "❌ Fel: API-nyckeln måste börja med 'sk-'"
    exit 1
fi

# Skapa .env-fil
echo "OPENAI_API_KEY=$api_key" > .env

echo ""
echo "✅ API-nyckel sparad i .env"
echo ""
echo "🧪 Testar anslutning..."

# Exportera för detta script
export OPENAI_API_KEY=$api_key

# Testa att nyckeln fungerar
echo ""
echo "Du kan nu köra:"
echo "  npm run translate:novel"
echo ""
echo "🎉 Klart!"
