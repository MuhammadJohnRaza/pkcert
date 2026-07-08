<h1 align="center">
  <img src="https://img.shields.io/badge/CYBER-SHIELD-00f0ff?style=for-the-badge&logo=shield&logoColor=white"/>
  <br/>
  Cyber Shield CTF — Internship Project
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/PKCERT-Internship-blueviolet?style=flat-square"/>
  <img src="https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-00f0ff?style=flat-square"/>
  <img src="https://img.shields.io/badge/RAG-Open%20Notebook-ff6b6b?style=flat-square"/>
  <img src="https://img.shields.io/badge/AI-Ollama%20%7C%20LangGraph-8b5cf6?style=flat-square"/>
  <img src="https://img.shields.io/badge/DB-SurrealDB-orange?style=flat-square"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p>

<p align="center">
  A full-featured <strong>Capture The Flag (CTF) event platform</strong> with an integrated <strong>AI-powered RAG Intelligence Assistant</strong> — built as part of the <a href="https://pkcert.org">PKCERT</a> AI & Software Development Internship.
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo Features](#-live-demo-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Frontend (CTF Dashboard)](#1-frontend-ctf-dashboard)
  - [RAG Backend (Open Notebook)](#2-rag-backend-open-notebook)
- [RAG System Deep Dive](#-rag-system-deep-dive)
- [Configuration](#-configuration)
- [Internship Tasks Covered](#-internship-tasks-covered)
- [Author](#-author)

---

## 🔍 Overview

**Cyber Shield CTF** is a premium, dark-themed Capture The Flag competition platform built entirely from scratch using vanilla HTML, CSS, and JavaScript. It simulates a real-world cybersecurity event arena featuring:

- A live **challenge board** with category filtering (Web, Crypto, Reverse, Pwn, Forensics)
- A real-time **scoreboard** with score progression charts
- A **team registration system** with modal-driven UX
- An embedded **AI RAG Intel Assistant** powered by a local LLM pipeline

The project also includes a locally deployable **Open Notebook** RAG (Retrieval-Augmented Generation) system — a private, fully offline AI document analysis engine that backs the dashboard's Intel Assistant tab.

---

## ✨ Live Demo Features

| Feature | Description |
|---|---|
| 🏠 **Hero Dashboard** | Live countdown timer, animated stats grid (teams, solves, prize pool), and live feed announcements |
| 🚩 **Challenge Board** | Category-filtered challenge cards with difficulty indicators, point values, and solve counts |
| 📊 **Scoreboard** | Dynamic leaderboard table + Chart.js score progression graph for top 5 teams |
| 🧠 **RAG Intel Assistant** | Notebook selector, session management, source indexing HUD, and AI chat interface backed by local Ollama LLM |
| 📜 **Rules & FAQ** | Structured rules of engagement with an animated accordion FAQ section |
| 🔐 **Modals** | Challenge submission modal with hint reveal system, team registration modal |
| 🌐 **Responsive Design** | Mobile-first design with a glowing grid animated background and glassmorphism UI |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Cyber Shield CTF Frontend                        │
│           (index.html + style.css + app.js — Pure Vanilla)          │
│                                                                      │
│  ┌──────────┐  ┌───────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │  Home    │  │ Challenges│  │ Scoreboard │  │  RAG Assistant  │  │
│  │  Tab     │  │   Tab     │  │    Tab     │  │      Tab        │  │
│  └──────────┘  └───────────┘  └────────────┘  └────────┬────────┘  │
│                                                          │           │
│                                        HTTP API calls (localhost)    │
└──────────────────────────────────────────────────────────┼──────────┘
                                                           │
                        ┌──────────────────────────────────▼──────────┐
                        │           Open Notebook RAG Backend          │
                        │              (FastAPI + LangGraph)            │
                        │                                               │
                        │  ┌─────────────┐    ┌──────────────────────┐ │
                        │  │  SurrealDB  │◄──►│  Ollama (Local LLM)  │ │
                        │  │  (Vector DB)│    │  Embeddings + Chat    │ │
                        │  └─────────────┘    └──────────────────────┘ │
                        └───────────────────────────────────────────────┘
```

### Data Flow — RAG Pipeline

```
User Query (CTF Dashboard)
        │
        ▼
FastAPI /api/chat endpoint
        │
        ▼
LangGraph "ask" graph
        │
   ┌────┴──────┐
   │  Embed    │  →  SurrealDB Vector Search  →  Retrieve top-K chunks
   │  Query    │
   └───────────┘
        │
   Retrieved context passed to Ollama LLM
        │
        ▼
Streamed / returned response → Frontend chat panel
```

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Markup | HTML5 (Semantic) |
| Styling | Vanilla CSS3 (Glassmorphism, CSS Grid, Animations) |
| Logic | Vanilla JavaScript (ES6+, Fetch API, async/await) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Outfit, Space Grotesk |
| Charts | Chart.js (Score Progression) |

### RAG Backend (`open-notebook/`)
| Layer | Technology |
|---|---|
| API Server | Python + FastAPI |
| AI Orchestration | LangGraph (state machine graphs) |
| LLM Inference | Ollama (local, private) |
| Vector Embeddings | Ollama embedding models |
| Database | SurrealDB (multi-model: relational + vector) |
| Task Runner | Supervisor (multi-process management) |
| Package Manager | `uv` (ultra-fast Python package manager) |
| Containerization | Docker Compose |

---

## 📁 Project Structure

```
pkcert/
│
├── index.html              # Main CTF platform — all tabs in a single SPA
├── style.css               # Full design system: tokens, components, animations
├── app.js                  # All JS logic: tab routing, RAG API, modals, charts
│
└── open-notebook/          # Local RAG backend (private AI document analysis)
    ├── docker-compose.yml  # SurrealDB + Speaches service orchestration
    ├── start.bat           # Windows one-click startup script
    ├── run_api.py          # FastAPI entrypoint
    ├── pyproject.toml      # Python project metadata + dependencies
    ├── supervisord.conf    # Process manager config (API + worker)
    │
    ├── open_notebook/
    │   ├── api/            # REST API route handlers (notebooks, sources, chat, etc.)
    │   ├── graphs/         # LangGraph AI graphs (ask, chat, source, transformation)
    │   ├── domain/         # Core domain models (Notebook, Source, Transformation)
    │   ├── database/       # SurrealDB repository + async migrations (1–18)
    │   ├── utils/          # Chunking, embeddings, encryption, token utils
    │   └── podcasts/       # Podcast generation pipeline
    │
    ├── prompts/            # Jinja2 prompt templates for LLM chains
    │   ├── ask/            # RAG question-answering prompts
    │   ├── chat/           # Chat system prompts
    │   └── source_chat/    # Per-source chat prompts
    │
    ├── scripts/            # Utility scripts (export, wait-for-api)
    └── tests/              # Full test suite (pytest)
```

---

## 🚀 Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- A modern browser (Chrome, Firefox, Edge)
- [Python 3.11+](https://www.python.org/) — for RAG backend
- [Ollama](https://ollama.com/) — for local LLM inference
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — for SurrealDB

---

### 1. Frontend (CTF Dashboard)

No build step required. This is a pure static web app.

```bash
# Clone the repository
git clone https://github.com/MuhammadJohnRaza/pkcert.git
cd pkcert

# Open directly in browser (recommended: use a local server)
# Option A — Python built-in server
python -m http.server 8080

# Option B — VS Code Live Server extension (just open index.html)
```

Navigate to `http://localhost:8080` in your browser.

---

### 2. RAG Backend (Open Notebook)

#### Step 1 — Pull required Ollama models

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

#### Step 2 — Start SurrealDB via Docker

```bash
cd open-notebook
docker compose up -d surrealdb
```

#### Step 3 — Configure environment

```bash
cp .env.example .env
# Edit .env — set SURREALDB_URL, OLLAMA_BASE_URL, and model names
```

#### Step 4 — Install Python dependencies

```bash
pip install uv
uv sync
```

#### Step 5 — Start the API server

```bash
# Windows
start.bat

# Or manually
python run_api.py
```

The API will be available at `http://localhost:8000`.

The RAG Assistant tab in the CTF dashboard will automatically connect and load your notebooks.

---

## 🧠 RAG System Deep Dive

The Open Notebook backend implements a full **private RAG pipeline**:

### Core Graphs (LangGraph)

| Graph | Purpose |
|---|---|
| `ask.py` | Entry → Query processing → Vector retrieval → Final answer |
| `chat.py` | Stateful multi-turn conversation over a notebook's sources |
| `source.py` | Document ingestion → chunking → embedding → SurrealDB storage |
| `transformation.py` | AI-driven transformations on ingested source content |

### Database Schema (SurrealDB — 18 Migrations)

- `notebook` — top-level knowledge containers
- `source` — ingested documents (text, URLs, files)
- `chunk` — vector-indexed text segments
- `note` — user-created notes within notebooks
- `chat_session` / `chat_message` — persistent conversation history
- `transformation` — stored AI-generated content transformations
- `credential` / `provider_config` — encrypted API key management

### Security

- All API keys and credentials are **AES-encrypted** at rest (`utils/encryption.py`)
- The system runs **100% locally** — no data leaves your machine
- SurrealDB access is scoped and requires namespace/database auth tokens

---

## ⚙️ Configuration

The RAG backend is configured via `open-notebook/.env`:

```env
# SurrealDB
SURREALDB_URL=ws://localhost:8000/rpc
SURREALDB_USERNAME=root
SURREALDB_PASSWORD=root
SURREALDB_NAMESPACE=open_notebook
SURREALDB_DATABASE=open_notebook

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
DEFAULT_CHAT_MODEL=ollama/llama3.2
DEFAULT_EMBEDDING_MODEL=ollama/nomic-embed-text

# API
API_HOST=0.0.0.0
API_PORT=8000
```

---

## 📚 Internship Tasks Covered

This repository is part of the **PKCERT AI & Software Development Internship** program. Tasks completed:

| Task | Description | Status |
|---|---|---|
| **Task 01** | Dev environment setup, GitHub repo, Git operations, Python welcome script | ✅ Done |
| **Task 02** | CTF Platform Frontend — HTML/CSS/JS single-page application | ✅ Done |
| **Task 03** | Local RAG system integration — Open Notebook + Ollama + SurrealDB | ✅ Done |
| **Task 04** | NumPy & Pandas analysis — data manipulation + Titanic EDA | ✅ Done |

---

## 👤 Author

<table>
  <tr>
    <td align="center">
      <strong>Muhammad John Raza</strong><br/>
      <a href="https://github.com/MuhammadJohnRaza">@MuhammadJohnRaza</a><br/>
      <sub>PKCERT AI & Software Development Intern</sub>
    </td>
  </tr>
</table>

---

<p align="center">
  Built with 🛡️ for <strong>PKCERT</strong> — Pakistan Computer Emergency Response Team<br/>
  <sub>© 2026 Cyber Shield CTF Arena. For educational and training purposes only.</sub>
</p>
