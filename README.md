<div align="center">

# ⚡ FitForge AI — Frontend

**Next-Generation Agentic Fitness & Nutrition Planning Platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fitforge--frontend--ten.vercel.app-orange?style=for-the-badge&logo=vercel)](https://fitforge-frontend-ten.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/habib-web-dev1/fitforge-frontend)

</div>

---

## 📌 Overview

FitForge AI is a full-stack SaaS fitness and nutrition planning platform powered by Google Gemini AI. This repository contains the **Next.js 16 frontend** that delivers a modern, responsive athlete workspace — from AI-generated workout blueprints and macro calibration, to biometric tracking dashboards and an interactive AI coach chat sidebar.

The frontend communicates with the Express.js backend through a **same-origin proxy** (Next.js Route Handler at `/api/backend/*`), eliminating all CORS issues and ensuring secure server-to-server communication.

---

## 🔗 Links

| Resource               | URL                                                 |
| ---------------------- | --------------------------------------------------- |
| 🌐 Live Application    | https://fitforge-frontend-ten.vercel.app            |
| 📦 Frontend Repository | https://github.com/habib-web-dev1/fitforge-frontend |
| 🔧 Backend Repository  | https://github.com/habib-web-dev1/fitforge-backend  |

---

## 🚀 Tech Stack

| Technology                | Version | Purpose                                              |
| ------------------------- | ------- | ---------------------------------------------------- |
| **Next.js**               | 16.2.7  | React framework with App Router, SSR, Route Handlers |
| **React**                 | 19.2.4  | UI component library                                 |
| **TypeScript**            | 5.x     | Type-safe development                                |
| **Tailwind CSS**          | 4.x     | Utility-first styling                                |
| **NextAuth.js**           | 4.24.x  | Authentication with JWT sessions                     |
| **Recharts**              | 3.x     | Analytics charts and data visualization              |
| **Lucide React**          | 1.17.x  | Icon library                                         |
| **clsx + tailwind-merge** | latest  | Conditional class merging                            |

---

## ✨ Features

### 🏠 Public Pages

- **Landing Page** — Hero with typing animation, features grid, how-it-works, pricing plans, testimonials, and FAQ
- **Explore Blueprints** — Paginated blueprint grid with search, category filter, rating filter, and sort
- **Blueprint Detail** — Full program overview, day-split preview, community reviews, and plan activation
- **Fitness Blog** — 8 science-based articles with search, category filter pills, newsletter signup, and topic grid
- **About Us** — Team profiles, company milestones timeline, core values, and stats band
- **Contact** — Contact form with validation, FAQ accordion, response time by tier, and office info

### 🔐 Authentication

- Email/password registration and login via NextAuth.js Credentials Provider
- JWT-based session management with access and refresh tokens
- Role-based routing (USER / ADMIN)
- Demo quick-login buttons for testing

### 👤 User Dashboard

- **Athlete Profile** — Biometric calibration (weight, height, target macros), live calorie calculator
- **My Blueprints** — Saved/active/completed/archived bookings with AI plan editor modal
- **AI Gen History** — Sortable audit trail of all AI agent invocations and token consumption

### 🛡️ Admin Dashboard

- **Analytics** — Real-time stats cards, line/bar/pie charts via Recharts
- **Manage Athletes** — User table with role toggle and ban functionality
- **Blueprint Manager** — CRUD operations on fitness blueprints
- **Review Curator** — Moderation of community reviews

### 🤖 AI Coach Chat

- Floating chat sidebar powered by Google Gemini 2.5
- Context-aware fitness and nutrition responses
- Persisted message history per session

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth route handler
│   │   └── backend/[...path]/      # Proxy route handler → Express backend
│   ├── auth/
│   │   ├── login/                  # Login page
│   │   ├── register/               # Registration page
│   │   └── forgot/                 # Password recovery page
│   ├── blog/                       # Fitness blog page
│   ├── about/                      # About us page
│   ├── contact/                    # Contact page
│   ├── explore/
│   │   ├── page.tsx                # Blueprint listing page
│   │   └── [id]/                   # Blueprint detail page
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell with sidebar
│   │   ├── page.tsx                # Dashboard redirect
│   │   ├── user/
│   │   │   ├── profile/            # Athlete biometrics
│   │   │   ├── saved/              # My blueprints
│   │   │   └── history/            # AI generation history
│   │   └── admin/
│   │       ├── analytics/          # Admin analytics charts
│   │       ├── users/              # User management
│   │       ├── blueprints/         # Blueprint management
│   │       ├── reviews/            # Review moderation
│   │       └── settings/           # Admin settings
│   ├── globals.css                 # Global styles
│   └── layout.tsx                  # Root layout with providers
├── components/
│   ├── Navbar.tsx                  # Sticky navigation with mobile menu
│   ├── Footer.tsx                  # Site footer
│   ├── AiCoachChat.tsx             # Floating AI chat sidebar
│   ├── ToneScaleModal.tsx          # AI plan modifier modal
│   └── Providers.tsx               # NextAuth + Theme context providers
└── services/
    └── api.ts                      # Centralized API client (FitForgeApi)
```

---

## 🔌 API Architecture

All browser requests go through a **same-origin proxy** to avoid CORS:

```
Browser
  └─► POST /api/backend/auth/register       (same origin)
        └─► Next.js Route Handler
              └─► POST https://backend.vercel.app/api/auth/register
                    └─► Express → MongoDB
```

The proxy at `src/app/api/backend/[...path]/route.ts`:

- Forwards all HTTP methods
- Injects `x-vercel-protection-bypass` header when `VERCEL_AUTOMATION_BYPASS_SECRET` is set
- Preserves `Authorization` and `Content-Type` headers
- Returns backend responses as-is

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
# Browser API calls go through the Next.js proxy (same-origin, no CORS)
NEXT_PUBLIC_API_URL=/api/backend

# Real backend URL — server-side only (proxy + NextAuth)
BACKEND_URL=http://localhost:5000

# NextAuth — must match your deployed frontend URL
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Only needed if backend Vercel project has Deployment Protection enabled
VERCEL_AUTOMATION_BYPASS_SECRET=your_bypass_secret_here
```

**Vercel Production Environment Variables:**

| Variable                          | Value                                      |
| --------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_API_URL`             | `/api/backend`                             |
| `BACKEND_URL`                     | `https://your-backend.vercel.app`          |
| `NEXTAUTH_URL`                    | `https://fitforge-frontend-ten.vercel.app` |
| `NEXTAUTH_SECRET`                 | Your secret string                         |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | From backend Vercel project settings       |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Running instance of the [FitForge Backend](https://github.com/habib-web-dev1/fitforge-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/habib-web-dev1/fitforge-frontend.git
cd fitforge-frontend

# Install dependencies
npm install

# Copy environment file and fill in values
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Build production bundle                  |
| `npm run start` | Start production server                  |
| `npm run lint`  | Run ESLint                               |

---

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Set all environment variables in Project Settings → Environment Variables
4. Deploy — Vercel auto-detects Next.js and configures the build

> **Note:** The backend must be deployed separately. See the [backend README](https://github.com/habib-web-dev1/fitforge-backend) for backend deployment instructions.

---

## 🎨 Pages at a Glance

| Route                         | Description        | Auth Required              |
| ----------------------------- | ------------------ | -------------------------- |
| `/`                           | Landing page       | No                         |
| `/explore`                    | Blueprint library  | No                         |
| `/explore/[id]`               | Blueprint detail   | No (booking requires auth) |
| `/blog`                       | Fitness articles   | No                         |
| `/about`                      | About the team     | No                         |
| `/contact`                    | Contact form       | No                         |
| `/auth/login`                 | Sign in            | No                         |
| `/auth/register`              | Create account     | No                         |
| `/dashboard`                  | User dashboard     | Yes                        |
| `/dashboard/user/profile`     | Biometric settings | Yes                        |
| `/dashboard/user/saved`       | Saved blueprints   | Yes                        |
| `/dashboard/user/history`     | AI usage logs      | Yes                        |
| `/dashboard/admin/analytics`  | Admin charts       | Admin only                 |
| `/dashboard/admin/users`      | User management    | Admin only                 |
| `/dashboard/admin/blueprints` | Blueprint CRUD     | Admin only                 |
| `/dashboard/admin/reviews`    | Review moderation  | Admin only                 |

---

## 📄 License

This project is for portfolio and demonstration purposes.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/habib-web-dev1">habib-web-dev1</a>
</div>
