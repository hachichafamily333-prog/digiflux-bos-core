# 🔐 DigiFlux Secrets & API Mapping Guide

Ce document décrit le rôle, la portée et l'emplacement sécurisé de chaque clé et accès configuré dans l'écosystème DigiFlux Agentic OS.

## 1. Moteur Cognitif (LLM)
* **Variable :** `LLM_API_KEY`
* **Rôle :** Permet aux agents de raisonner, rédiger les diagnostics, analyser les données CRM et générer du code.

## 2. Passerelles Telegram (Canaux de Dialogue)
* **Variables :** `TELEGRAM_BOT_TOKEN_DG`, `TELEGRAM_BOT_TOKEN_COMMERCIAL`, `TELEGRAM_BOT_TOKEN_DEV`
* **Rôle :** Permet à l'utilisateur de communiquer directement avec chaque profil d'agent sur Telegram de manière cloisonnée.

## 3. Google Workspace (Source de Vérité Data)
* **Variables :** `GOOGLE_CREDENTIALS_JSON`, `GOOGLE_DRIVE_ROOT_ID`, `GOOGLE_CRM_SHEET_ID`, `GOOGLE_FINANCE_SHEET_ID`
* **Rôle :** Permet aux agents d'interagir en temps réel avec le Google Drive central, de lire/écrire dans le CRM (Sheets) et de gérer le calendrier.

## 4. GitHub Automation
* **Variable :** `GITHUB_PAT_TOKEN`
* **Rôle :** Permet à l'agent DevOps et à l'Orchestrateur de créer des branches, commits, pull requests et de déclencher les CI/CD workflows.
