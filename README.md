# LearnPath AI 🎓🤖

> An AI-Powered Personalized Learning & Career Mentor Platform for Students.

LearnPath AI blends a YouTube-style learning discovery feed, an interactive AI mentor chat, game-style progression, and a professional career dashboard to help students master skills, build real-world projects, track placement readiness, and become career-ready.

---

## ✨ Key Features

### 🎓 1. Student Dashboard & Discovery Feed
- **Personalized Home**: Welcome banner with live streak, level, and XP progression.
- **Today's Tasks**: Daily checklist with XP rewards and real-time progress tracking.
- **Skill Overview**: Interactive radar chart visualizing competency across Python, ML, DSA, Web Dev, SQL, and Communication.
- **AI Recommendation Feed**: YouTube-style course and project recommendations tailored to career goals.

### 🤖 2. Interactive AI Mentor (`/ai-mentor`)
- **Real-Time Chat**: Friendly AI assistant to explain concepts, review code, and provide career advice.
- **Student Context Panel**: Displays current skills, career target, and streak alongside conversation.
- **Smart Quick Prompts**: One-click prompts for common student questions.

### 🎯 3. Interactive Skill Assessment (`/assessment`)
- **Multiple Categories**: Python & OOP, Machine Learning, Data Structures & Algorithms, SQL, and Web Dev.
- **Instant Visual Feedback**: Green success states for correct answers, red warning states with detailed explanations for incorrect ones.
- **Comprehensive Skill Report**: Final score breakdown with retry functionality.

### 🗺️ 4. Interactive Learning Roadmap (`/roadmap`)
- **Game Progression Timeline**: Visual stages from Beginner → Intermediate → Advanced → Industry Ready.
- **Topic-Level Tracking**: Concept lectures, hands-on projects, assessments, and certifications.
- **Milestones & Badges**: Earn badges as you complete stages.

### 📚 5. Courses & Resources (`/courses`)
- **YouTube-Style Grid**: Course cards with thumbnails, provider badges, ratings, and difficulty levels.
- **Career Relevance**: Highlighted career paths and skills gained per course.

### 💻 6. Coding Practice (`/coding`)
- **Problem Bank**: LeetCode-style problem list sorted by difficulty (Easy, Medium, Hard).
- **Company Tags**: Problems tagged with top hiring companies (Google, Amazon, Meta, Microsoft).

### 🛠️ 7. Project Recommendations (`/projects`)
- **Career Value Rating**: Projects scored by industry relevance and portfolio impact.
- **Roadmap Integration**: 1-click button to add projects directly to your learning roadmap.

### 🏆 8. Certifications & Hackathons (`/certifications` & `/hackathons`)
- **Certifications**: Industry credentials from Google, IBM, AWS, and Coursera.
- **Hackathons**: Live and upcoming competitive events with countdowns, team sizes, and prize pools.

### 💼 9. Career Dashboard (`/career`)
- **Placement Readiness Score**: Radial progress indicator of overall job readiness.
- **Skill Gap Analysis**: Visual comparison of current skill levels vs. industry target requirements.
- **Resume Score & Action Items**: Prioritized steps to boost employability.

### 📄 10. AI Resume Builder (`/resume`)
- **ATS Compatibility Score**: Automated resume evaluator.
- **Section Analysis**: Breakdown of summary, experience, skills, and project sections.
- **Live Resume Preview**: Real-time markdown preview.

### 👤 11. Profile System & Achievements (`/profile`)
- **Student Stats**: Rank titles (e.g. *AI Explorer*), level progress, and learning history.
- **Achievement Showcase**: Unlocked vs. locked badges with criteria descriptions.

### 🛡️ 12. Admin Dashboard (`/admin`) *(Admin Only)*
- **Protected Access**: Accessible only by administrator accounts (`admin@learnpath.ai`).
- **Student Analytics**: Active user charts, progress distribution, and system monitoring.
- **At-Risk Detection**: AI insights pointing out inactive or struggling students.

### 🔐 13. Authentication & Access Control
- **Student & Admin Roles**: Strict separation of student and administrator views.
- **Route Guarding**: Automatic redirects for protected pages.
- **Quick Demo Login**: 1-click login buttons for instant demo testing.

---

## 🎨 Design System & Color Palette

| Token | Color | Hex | Purpose |
|---|---|---|---|
| **Background** | Slate 900 | `#0f172a` | Clean, solid dark background |
| **Cards** | Slate 800 | `#1e293b` | Smooth elevated surfaces |
| **Primary Green** | Emerald 500 | `#22c55e` | Growth, progress, completed tasks, success |
| **Primary Blue** | Blue 500 | `#3b82f6` | Trust, technology, AI features |
| **Warning Red** | Red 500 | `#ef4444` | Wrong answers, error states, at-risk warnings |
| **Typography** | Inter | Google Fonts | Modern, clean tech typography |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide-react.dev/)

---

## 📁 Project Architecture

```
learnpath-ai/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider & AppShell
│   ├── globals.css             # Design tokens & utility classes
│   ├── page.tsx                # Dashboard
│   ├── login/page.tsx          # Login page with 1-click demo login
│   ├── signup/page.tsx         # Signup page
│   ├── ai-mentor/page.tsx      # AI Chat Mentor interface
│   ├── assessment/page.tsx     # Skill Assessment & quiz engine
│   ├── roadmap/page.tsx        # Learning Roadmap timeline
│   ├── courses/page.tsx        # YouTube-style course discovery
│   ├── coding/page.tsx         # Coding practice problems
│   ├── projects/page.tsx       # Project recommendations
│   ├── certifications/page.tsx # Certificate tracking
│   ├── hackathons/page.tsx     # Hackathon events
│   ├── career/page.tsx         # Career readiness dashboard
│   ├── resume/page.tsx         # AI Resume builder
│   ├── profile/page.tsx        # Profile & achievement system
│   ├── settings/page.tsx       # Settings & preferences
│   └── admin/page.tsx          # Admin dashboard (Admin-only)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Collapsible desktop navigation
│   │   ├── TopBar.tsx          # Header with user menu & notifications
│   │   ├── BottomNav.tsx       # Mobile navigation bar
│   │   └── AppShell.tsx        # Layout wrapper
│   └── ui/
│       ├── Badge.tsx           # Multi-variant badge component
│       ├── ProgressBar.tsx     # Animated progress bar
│       └── StatCard.tsx        # Metric metric card
├── lib/
│   ├── auth/
│   │   └── AuthContext.tsx     # Auth context, route guard & user roles
│   ├── data/
│   │   └── mockData.ts         # Initial mock datasets
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── utils.ts                # Helper utility functions
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Chaitu-2710/learnpath-ai.git
   cd learnpath-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Login Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Student** | `arjun@example.com` | `arjun123` | Full student platform *(Admin menu hidden)* |
| **Admin** | `admin@learnpath.ai` | `admin123` | Full platform + Admin Dashboard (`/admin`) |

*Alternatively, click the 1-click **Student Login** or **Admin Login** buttons on the login screen.*

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
