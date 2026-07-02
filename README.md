# 🎓 US High Dynamic LMS

**Educational Learning Management System with Business Simulation**

*Système de Gestion de l'Apprentissage Éducatif avec Simulation d'Entreprise*

---

## 📌 Overview | Vue d'Ensemble

US High Dynamic LMS is a comprehensive **educational platform** designed for secondary students (grades 6-12) to:

- 📚 **Learn** through interactive courses and modules
- 🏢 **Simulate** real-world business management
- 💰 **Manage** virtual capital and financial decisions
- 🏆 **Compete** through gamification and leaderboards
- 📜 **Generate** official transcripts and certificates

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + OAuth2
- **AI Integration**: ChatGPT, Claude, Gemini
- **PDF Generation**: PDFKit

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **UI Components**: Shadcn/ui

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Package Manager**: npm/yarn
- **Local Development**: Docker Compose

---

## 📦 Project Structure

```
US-High-LMS/
├── packages/
│   ├── backend/           # Express API server
│   ├── frontend/          # React web application
│   ├── mobile/            # React Native app (future)
│   └── shared/            # Shared types & utilities
├── docker-compose.yml     # Local development setup
├── .github/
���   └── workflows/         # CI/CD pipelines
├── docs/                  # Architecture & setup docs
└── README.md
```

---

## 🚀 Quick Start | Démarrage Rapide

### Prerequisites | Prérequis
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Avir78/US-High-LMS.git
cd US-High-LMS

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development environment
docker-compose up -d

# Run migrations
npm run db:migrate

# Start backend server
cd packages/backend && npm run dev

# In another terminal, start frontend
cd packages/frontend && npm run dev
```

Access the application:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Database**: localhost:5432

---

## 📚 Key Features | Caractéristiques Principales

### 👨‍🎓 Student Portal
- Personal dashboard with progress tracking
- Course catalog and interactive learning
- Virtual business simulation
- Financial management (loans, capital allocation)
- Gamification rewards and badges
- Performance analytics

### 👨‍🏫 Teacher Interface
- Student management and monitoring
- Course creation and assignment
- Real-time class simulations
- Grading and performance tracking
- Message and document sharing

### 🛡️ Admin Dashboard
- System-wide user management
- Account provisioning and billing
- Content moderation
- Analytics and reporting
- Financial transactions management
- Security and compliance monitoring

---

## 🔐 Security

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: End-to-end encryption for sensitive data
- **Rate Limiting**: DDoS protection
- **CORS**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

---

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

## 👨‍💼 Admin Credentials

**Administrator**: SAFOU MOMBO Bwas Aristide

```
Username: admin1
Password: Admin@2024
```

⚠️ **IMPORTANT**: Change credentials immediately after first login in production.

---

## 🌐 Languages | Langues

- 🇫🇷 French (Français) - Primary
- 🇬🇧 English - Secondary
- Multi-language support ready

---

## 📞 Support & Contact

For issues, questions, or contributions:

- **Email**: support@ushighlms.com
- **GitHub Issues**: [Create an issue](https://github.com/Avir78/US-High-LMS/issues)
- **Documentation**: [Full Docs](./docs)

---

## 📄 License

This project is proprietary. All rights reserved © 2024 US High Dynamic LMS.

---

## 🎯 Roadmap

- [x] **Phase 1**: MVP Architecture & Backend API
- [ ] **Phase 2**: Frontend UI & Authentication
- [ ] **Phase 3**: Business Simulation Engine
- [ ] **Phase 4**: AI Integration & Gamification
- [ ] **Phase 5**: Mobile App (React Native)
- [ ] **Phase 6**: Production Deployment

---

**Last Updated**: January 2024 | Version: 0.1.0-MVP
