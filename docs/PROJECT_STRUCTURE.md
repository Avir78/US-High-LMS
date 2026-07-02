# 📁 Project Structure | Structure du Projet

## Complete Directory Layout

```
US-High-LMS/
│
├── 📦 packages/
│   ├── backend/                          # Node.js Express API
│   │   ├── src/
│   │   │   ├── app.ts                   # Express app configuration
│   │   │   ├── server.ts                # Server entry point
│   │   │   ├── config/                  # Configuration files
│   │   │   │   ├── database.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── email.ts
│   │   │   │   └── ai-services.ts
│   │   │   ├── database/                # Database setup & migrations
│   │   │   │   ├── connection.ts
│   │   │   │   ├── migrations/
│   │   │   │   ├── seeders/
│   │   │   │   └── schema.sql
│   │   │   ├── middleware/              # Express middleware
│   │   │   │   ├── auth.ts              # JWT verification
│   │   │   │   ├── rbac.ts              # Role-based access control
│   │   │   │   ├── errorHandler.ts      # Global error handling
│   │   │   │   ├── validators.ts        # Input validation
│   │   │   │   └── logging.ts           # Request logging
│   │   │   ├── routes/                  # API route definitions
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── users.routes.ts
│   │   │   │   ├── courses.routes.ts
│   │   │   │   ├── simulations.routes.ts
│   │   │   │   ├── finance.routes.ts
│   │   │   │   ├── grades.routes.ts
│   │   │   │   ├── admin.routes.ts
│   │   │   │   └── index.ts
│   │   │   ├── controllers/             # Request handlers
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── course.controller.ts
│   │   │   │   ├── simulation.controller.ts
│   │   │   │   ├── finance.controller.ts
│   │   │   │   ├── grade.controller.ts
│   │   │   │   └── admin.controller.ts
│   │   │   ├── services/                # Business logic
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── course.service.ts
│   │   │   │   ├── simulation.service.ts
│   │   │   │   ├── finance.service.ts
│   │   │   │   ├── gamification.service.ts
│   │   │   │   ├── notification.service.ts
│   │   │   │   ├── document.service.ts
│   │   │   │   ├── ai.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── models/                  # Data models & interfaces
│   │   │   │   ├── User.ts
│   │   │   │   ├── Course.ts
│   │   │   │   ├── Simulation.ts
│   │   │   │   ├── Transaction.ts
│   │   │   │   └── types.ts
│   │   │   ├── utils/                   # Utility functions
│   │   │   │   ├── validators.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── helpers.ts
│   │   │   │   ├── pdf-generator.ts
│   │   │   │   └── logger.ts
│   │   │   ├── exceptions/              # Custom exceptions
│   │   │   │   ├── AppError.ts
│   │   │   │   ├── ValidationError.ts
│   │   │   │   ├── NotFoundError.ts
│   │   │   │   └── UnauthorizedError.ts
│   │   │   └── constants/               # App constants
│   │   │       ├── http-codes.ts
│   │   │       ├── messages.ts
│   │   │       ├── roles.ts
│   │   │       └── business-types.ts
│   │   ├── tests/                       # Unit & integration tests
│   │   │   ├── auth.test.ts
│   │   │   ├── users.test.ts
│   │   │   └── integration/
│   │   ├── .env.example                 # Environment template
│   │   ├── Dockerfile                   # Docker image for production
│   │   ├── Dockerfile.dev               # Docker image for development
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── frontend/                         # React Web Application
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── favicon.ico
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── index.tsx
│   │   │   ├── App.tsx
│   │   │   ├── api/                     # API client & hooks
│   │   │   │   ├── client.ts            # Axios/Fetch configuration
│   │   │   │   ├── auth.api.ts
│   │   │   │   ├── users.api.ts
│   │   │   │   ├── courses.api.ts
│   │   │   │   ├── simulations.api.ts
│   │   │   │   └── hooks.ts
│   │   │   ├── components/              # Reusable React components
│   │   │   │   ├── common/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   └── Loading.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   └── AuthLayout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── StudentDashboard.tsx
│   │   │   │   │   ├── TeacherDashboard.tsx
│   │   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   │   └── widgets/
│   │   │   │   ├── courses/
│   │   │   │   │   ├── CourseCard.tsx
│   │   │   │   │   ├── CourseCatalog.tsx
│   │   │   │   │   ├── CourseDetails.tsx
│   │   │   │   │   └── CourseLearning.tsx
│   │   │   │   ├── simulations/
│   │   │   │   │   ├── BusinessSetup.tsx
│   │   │   │   │   ├── SimulationDashboard.tsx
│   │   │   │   │   ├── FinancialOverview.tsx
│   │   │   │   │   └── DecisionMaking.tsx
│   │   │   │   └── admin/
│   │   │   │       ├── UserManagement.tsx
│   │   │   │       ├── SystemSettings.tsx
│   │   │   │       └── Analytics.tsx
│   │   │   ├── pages/                   # Full-page components (routing)
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Courses.tsx
│   │   │   │   ├── SimulationSetup.tsx
│   │   │   │   ├── SimulationGame.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   ├── Certificates.tsx
│   │   │   │   ├── NotFound.tsx
│   │   │   │   └── ServerError.tsx
│   │   │   ├── store/                   # Redux state management
│   │   │   │   ├── slices/
│   │   │   │   │   ├── authSlice.ts
│   │   │   │   │   ├��─ userSlice.ts
│   │   │   │   │   ├── coursesSlice.ts
│   │   │   │   │   └── simulationSlice.ts
│   │   │   │   ├── hooks.ts
│   │   │   │   └── store.ts
│   │   │   ├── styles/                  # Global styles
│   │   │   │   ├── globals.css
│   │   │   │   ├── variables.css
│   │   │   │   └── animations.css
│   │   │   ├── hooks/                   # Custom React hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useFetch.ts
│   │   │   │   ├── useForm.ts
│   │   │   │   └── useLocalStorage.ts
│   │   │   ├── utils/                   # Utility functions
│   │   │   │   ├── auth.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── validators.ts
│   │   │   │   └── constants.ts
│   │   │   ├── types/                   # TypeScript interfaces
│   │   │   │   ├── index.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── api.ts
│   │   │   └── config/
│   │   │       ├── i18n.ts              # Internationalization
│   │   │       └── theme.ts             # Theme configuration
│   │   ├── public/
│   │   ├── .env.example
│   │   ├── Dockerfile.dev
│   │   ├── tailwind.config.js
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── shared/                           # Shared code between packages
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── index.ts
│   │   │   │   ├── api.ts               # Shared API types
│   │   │   │   ├── models.ts            # Shared data models
│   │   │   │   └── auth.ts              # Shared auth types
│   │   │   ├── constants/
│   │   │   │   ├── http-status.ts
│   │   │   │   ├── messages.ts
│   │   │   │   └── roles.ts
│   │   │   └── utils/
│   │   │       ├── validators.ts
│   │   │       └── formatters.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mobile/                          # React Native App (Future)
│       ├── src/
│       ├── app.json
│       └── package.json
│
├── 📚 docs/
│   ├── ARCHITECTURE.md                  # System architecture
│   ├── API.md                           # API documentation
│   ├── DATABASE.md                      # Database schema & queries
│   ├── SETUP.md                         # Local setup guide
│   ├── DEPLOYMENT.md                    # Production deployment
│   ├── PROJECT_STRUCTURE.md             # This file
│   ├── SECURITY.md                      # Security best practices
│   ├── CONTRIBUTING.md                  # Contribution guidelines
│   └── ROADMAP.md                       # Project roadmap
│
├── 📊 .github/
│   └── workflows/
│       ├── tests.yml                    # Unit & integration tests
│       ├── lint.yml                     # Code quality checks
│       ├── build.yml                    # Build pipeline
│       └── deploy.yml                   # Deployment pipeline
│
├── 🔧 Configuration Files
│   ├── .env.example                     # Environment variables template
│   ├── .gitignore                       # Git ignore rules
│   ├── .prettierrc                      # Code formatter config
│   ├── .eslintrc.json                   # Linter config
│   ├── docker-compose.yml               # Docker Compose for local dev
│   ├── package.json                     # Root package config
│   ├── tsconfig.json                    # TypeScript config
│   └── turbo.json                       # Monorepo build config (optional)
│
├── 📄 Documentation
│   ├── README.md                        # Main project README
│   ├── CHANGELOG.md                     # Version history
│   ├── LICENSE                          # Proprietary license
│   └── SECURITY.md                      # Security policy
│
└── 📦 Dependencies & Scripts
    ├── node_modules/                    # Installed dependencies
    ├── package-lock.json                # Lock file for npm
    └── .npmrc                           # NPM configuration
```

---

## 🎯 Key Directories Explained

### `/packages/backend`
Node.js Express server with all API logic, database queries, and business logic.

### `/packages/frontend`
React web application for student dashboard, course learning, and simulations.

### `/packages/shared`
Shared TypeScript types, constants, and utilities used by both backend and frontend.

### `/docs`
Comprehensive documentation covering architecture, API, setup, and deployment.

### `/.github/workflows`
Automated CI/CD pipelines for testing, linting, building, and deployment.

---

## 📋 File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `UserDashboard.tsx`)
- **Services/Utils**: `camelCase.ts` (e.g., `userService.ts`)
- **Types/Interfaces**: `PascalCase.ts` (e.g., `User.ts`)
- **Constants**: `UPPER_SNAKE_CASE` inside files
- **Tests**: `*.test.ts` or `*.spec.ts`

---

**Document Version**: 0.1.0 | Last Updated: January 2024
