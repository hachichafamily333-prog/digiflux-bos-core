import os
import sys

required_vars = [
    "GOOGLE_DRIVE_ROOT_ID",
    "GOOGLE_CRM_SHEET_ID"
]

print("🔍 Vérification de la configuration de l'environnement DigiFlux BOS...")
missing = [v for v in required_vars if not os.environ.get(v)]

if missing:
    print(f"⚠️ Variables manquantes dans l'environnement local : {missing}")
    print("ℹ️ Copiez .env.example vers .env et remplissez les valeurs requises.")
else:
    print("✅ Configuration de base validée avec succès !")
