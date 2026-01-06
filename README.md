Job Listing Portal (MERN Stack)

A role-based Job Listing Portal built using the MERN stack, supporting Job Seekers and Employers with authentication, profile management, and dashboard insights.

This project is designed with clean architecture, scalable backend APIs, and a modern dashboard UI.

🚀 Features Implemented So Far
🔐 Authentication

User registration & login

Secure password hashing using bcrypt

JWT-based authentication

Role-based users:

JOB_SEEKER

EMPLOYER

Persistent login using /me API

👤 Profile Management
Job Seeker Profile

Full name

Phone & location

Current role & experience

Skills & certifications

Resume URL

LinkedIn & portfolio links

Job preferences

Profile completion calculation

Employer Profile

Company name & description

Industry & company type

Company size & founded year

Location & contact details

Company website & logo URL

📊 Dashboards
Job Seeker Dashboard

Profile completion percentage

Applied jobs (mock data)

Recommended jobs (mock data)

Employer Dashboard

Job statistics (mock data)

Posted jobs (mock data)

Recent applications (mock data)

⚠️ Job listings and applications are mocked for now and will be connected to real APIs later.

🧭 UI Layout

Collapsible sidebar with navigation

Topbar with role-aware title

Sidebar user section with profile navigation

Role-based rendering throughout the app

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt

dotenv

Frontend

React

React Router

Context API

Axios

Tailwind CSS

Lucide Icons

📁 Project Structure
JobListingPortal/
├── backend/
│ ├── src/
│ │ ├── models/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── app.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── layout/
│ │ ├── pages/
│ │ │ ├── profile/
│ │ │ └── Dashboard.jsx
│ │ ├── context/
│ │ └── api/
│ └── package.json

🔐 Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ .env is ignored by git. Use .env.example for reference.

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Frontend runs on http://localhost:5173
Backend runs on http://localhost:5000

🧪 API Endpoints (So Far)
Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

Profiles

POST /api/jobseeker/profile/me

GET /api/jobseeker/profile/me

POST /api/employer/profile/me

GET /api/employer/profile/me
