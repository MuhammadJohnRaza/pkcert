@echo off
title Open Notebook - RAG System Launcher

set ROOT=%~dp0
set DATA_ROOT=%ROOT%notebook_data
set PYTHONPATH=%ROOT%

echo ================================================================
echo   Open Notebook - 100%% Local RAG System
echo   Powered by Ollama + SurrealDB
echo ================================================================
echo.

:: Create data directories if they don't exist
if not exist "%DATA_ROOT%\surrealdb" mkdir "%DATA_ROOT%\surrealdb"
if not exist "%DATA_ROOT%\uploads" mkdir "%DATA_ROOT%\uploads"

echo [1/4] Starting SurrealDB on port 8000...
start "SurrealDB" cmd /k "surreal start --user root --pass root --bind 127.0.0.1:8000 rocksdb:%DATA_ROOT%\surrealdb"

echo Waiting 4 seconds for SurrealDB to initialize...
timeout /t 4 /nobreak >nul

echo [2/4] Starting API Server on port 5055...
start "Open Notebook API" cmd /k "cd /d %ROOT% && uv run --env-file .env run_api.py"

echo Waiting 3 seconds for API to initialize...
timeout /t 3 /nobreak >nul

echo [3/4] Starting Background Worker...
start "Open Notebook Worker" cmd /k "cd /d %ROOT% && set PYTHONPATH=%ROOT% && uv run --env-file .env python -m surreal_commands.cli.worker --import-modules commands"

echo [4/4] Starting Next.js Frontend on port 3000...
start "Open Notebook Frontend" cmd /k "cd /d %ROOT%frontend && npm run dev"

echo.
echo ================================================================
echo   All services started! Waiting for frontend to be ready...
echo   Open your browser at: http://localhost:3000
echo ================================================================
echo.
echo Services running:
echo   - SurrealDB    : ws://127.0.0.1:8000
echo   - API          : http://127.0.0.1:5055
echo   - Frontend     : http://127.0.0.1:3000
echo.
echo NEXT STEP: After Ollama finishes installing, run:
echo   ollama pull llama3.1
echo   ollama pull nomic-embed-text
echo   Then configure Ollama in the UI: Settings -^> API Keys
echo ================================================================

timeout /t 8 /nobreak >nul
start http://localhost:3000
