# 🏗️ Architecture Overview | Vue d'Ensemble de l'Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                                  │
│  ┌──────────────────┐  ┌─────────��────────┐  ┌──────────────────┐
│  │  Web Browser     │  │  Mobile App      │  │  Admin Panel     │
│  │  (React 18)      │  │  (React Native)  │  │  (React 18)      │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
└───────────┼──────────────────────┼──────────────────────┼──────────┘
            │                      │                      │
┌───────────┼──────────────────────┼──────────────────────┼──────────┐
│           ▼                      ▼                      ▼           │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           API GATEWAY & LOAD BALANCER                        │  │
│  │  (Express.js Middleware, CORS, Auth, Rate Limiting)         │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                       │
│  ┌──────────────────────────┼───────────────────────────────────┐  │
│  │                          ▼                                    │  │
│  │        EXPRESS.JS REST API SERVER (Port 5000)               │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │  ROUTES & CONTROLLERS                                  │  │  │
│  │  │  • Auth Controller (Login, Register, 2FA)            │  │  │
│  │  │  • Users Controller (Profile, Settings)             │  │  │
│  │  │  • Courses Controller (CRUD, Enrollment)            │  │  │
│  │  │  • Simulations Controller (Business Engine)         │  │  │
│  │  │  • Finance Controller (Loans, Transactions)         │  │  │
│  │  │  • Grades & Reports Controller                      │  │  │
│  │  │  • Admin Controller (System Management)             │  │  │
│  │  │  • AI Integration Controller (ChatGPT, Claude)      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │  SERVICES & BUSINESS LOGIC                             │  │  │
│  │  │  • AuthService (JWT, OAuth2, Sessions)              │  │  │
│  │  │  • UserService (CRUD, Roles)                        │  │  │
│  │  │  • CourseService (Content Management)               │  │  │
│  │  │  • SimulationEngine (Business Logic)                │  │  │
│  │  │  • FinanceService (Capital, Loans, Transactions)    │  │  │
│  │  │  • GamificationService (Badges, Points, Leaderboards) │  │  │
│  │  │  • NotificationService (Email, In-app)             │  │  │
│  │  │  • DocumentService (PDF Generation)                 │  │  │
│  │  │  • AIService (Integration with LLMs)                │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                       │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────────┐
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  MIDDLEWARE LAYER                                            │  │
│  │  • Authentication (JWT Verification)                        │  │
│  │  • Authorization (RBAC)                                     │  │
│  │  • Error Handling                                           │  │
│  │  • Logging & Monitoring                                     │  │
│  │  • Request Validation                                       │  │
│  │  • Rate Limiting                                            │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │
┌─────────────────┼──────────────────────────────────────────────────┐
│                 ▼                                                   │
│  ┌─────────────────────────┐  ┌────────────────────────────────┐  │
│  │   DATABASE LAYER        │  │  CACHE LAYER (Redis)          │  │
│  │   ┌──────────────────┐  │  │  • Sessions                   │  │
│  │   │   PostgreSQL     │  │  │  • Cached Queries             │  │
│  │   │   (Port 5432)    │  │  │  • Rate Limiting              │  │
│  │   │                  │  │  │  • Notifications Queue        │  │
│  │   │ Tables:          │  │  │  (Port 6379)                  │  │
│  │   │ • users          │  │  └────────────────────────────────┘  │
│  │   │ • courses        │  │                                       │
│  │   │ • enrollments    │  │  ┌────────────────────────────────┐  │
│  │   │ • simulations    │  │  │  EXTERNAL SERVICES            │  │
│  │   │ • transactions   │  │  │  • OpenAI (ChatGPT)           │  │
│  │   │ • gamification   │  │  │  • Anthropic (Claude)         │  │
│  │   │ • documents      │  │  │  • Google (Gemini)            │  │
│  │   │ • grades         │  │  │  • Stripe (Payments)          │  │
│  │   └──────────────────┘  │  │  • Email Service (SMTP)       │  │
│  └─────────────────────────┘  └────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Authorization Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. Login Request (email, password)
       ▼
┌──────────────────────┐
│  Auth Controller     │
│  • Validate Input    │
│  • Hash Password     │
└──────┬───────────────┘
       │ 2. Check Credentials
       ▼
┌──────────────────────┐
│  User Database       │
└──────┬───────────────┘
       │ 3. Return User
       ▼
┌──────────────────────┐
│  Auth Service        │
│  • Generate JWT      │
│  • Generate Refresh  │
└──────┬───────────────┘
       │ 4. Return Tokens
       ▼
┌──────────────────────┐
│  Client              │
│  • Store JWT         │
│  • Store Refresh     │
└──────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SUBSEQUENT REQUESTS (Protected Routes)                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Client sends request with Authorization header     │
│     Authorization: Bearer {JWT_TOKEN}                  │
│                                                          │
│  2. Express Middleware verifies JWT                    │
│     • Decode token                                     │
│     • Check expiry                                     │
│     • Extract user ID                                  │
│                                                          │
│  3. RBAC Middleware checks permissions                 │
│     • Load user roles                                  │
│     • Check resource access                            │
│     • Allow or Deny                                    │
│                                                          │
│  4. Route Handler executes                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema (Core Tables)

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role ENUM('student', 'teacher', 'admin') NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  avatar_url VARCHAR,
  phone VARCHAR,
  birth_date DATE,
  institution VARCHAR,
  class_level INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR NOT NULL,
  level INTEGER,
  instructor_id UUID REFERENCES users(id),
  duration_hours DECIMAL,
  content_url VARCHAR,
  pdf_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enrollments Table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  progress_percentage DECIMAL DEFAULT 0,
  completed_at TIMESTAMP,
  status ENUM('active', 'completed', 'paused') DEFAULT 'active'
);

-- Business Simulations Table
CREATE TABLE simulations (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  business_type VARCHAR NOT NULL,
  business_name VARCHAR NOT NULL,
  capital DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  year_simulated INTEGER DEFAULT 1
);

-- Financial Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  simulation_id UUID REFERENCES simulations(id),
  transaction_type VARCHAR NOT NULL,
  amount DECIMAL NOT NULL,
  description VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gamification
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  badge_name VARCHAR NOT NULL,
  icon_url VARCHAR,
  earned_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE points (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  points_earned INTEGER,
  reason VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 API Response Structure

```json
{
  "success": true,
  "status": 200,
  "message": "Operation completed successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0.0"
  }
}
```

---

## 🔄 Data Flow: Student Course Enrollment

```
1. Student selects course from catalog
   └─> Frontend sends POST /api/enrollments

2. Backend receives request
   └─> Middleware: Verify JWT
   └─> Middleware: RBAC check (student role)
   └─> Validate enrollment data

3. EnrollmentService processes
   └─> Check if already enrolled
   └─> Create enrollment record in DB
   ��─> Update user progress
   └─> Send confirmation email
   └─> Award welcome badge (+10 points)

4. Response sent to client
   ├─> Enrollment ID
   ├─> Course details
   ├─> Updated user stats
   └─> Notification: "You enrolled in {course_name}"

5. Leaderboard updated
   └─> Cache updated with new user points
   └─> WebSocket broadcast to followers
```

---

## 📱 Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────┐
│                   CDN (CloudFlare)                      │
│              (Static assets, images, docs)             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────────┐
│         LOAD BALANCER (NGINX/HAProxy)                   │
│         • SSL/TLS Termination                           │
│         • Request Routing                               │
│         • Rate Limiting                                 │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Backend      │ │ Backend      │ │ Backend      │
│ Instance 1   │ │ Instance 2   │ │ Instance 3   │
│ (Docker)     │ │ (Docker)     │ │ (Docker)     │
└──────────────┘ └──────────────┘ └──────────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │PostgreSQL│  │  Redis   │  │  S3      │
  │Primary   │  │Cluster   │  │(Files)   │
  └──────────┘  └──────────┘  └──────────┘
        │              
        ▼
  ┌──────────┐
  │PostgreSQL│
  │Replica   │
  └──────────┘
```

---

## 📝 Key Design Principles

1. **Modularity**: Services are loosely coupled and independently deployable
2. **Scalability**: Stateless backend allows horizontal scaling
3. **Security**: Multi-layer authentication, RBAC, encryption
4. **Performance**: Redis caching, query optimization, CDN delivery
5. **Maintainability**: Clear separation of concerns, comprehensive logging
6. **User Experience**: Real-time updates, gamification, responsive design

---

**Document Version**: 0.1.0 | Last Updated: January 2024
