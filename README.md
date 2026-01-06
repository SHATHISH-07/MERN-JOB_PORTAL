# Job Listing Portal (MERN Stack)

A role-based Job Listing Portal built using the MERN stack, supporting Job Seekers and Employers with authentication, profile management, and dashboard insights.

This project follows clean architecture principles with scalable backend APIs and a modern dashboard-based frontend.

---

## Features Implemented So Far

### User Authentication

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-based access:
  - JOB_SEEKER
  - EMPLOYER
- Persistent login using the `/me` API

---

### Profile Management

#### Job Seeker Profile

- Full name
- Phone number and location
- Current role and experience
- Skills and certifications
- Resume URL
- LinkedIn and portfolio links
- Job preferences
- Profile completion percentage calculation

#### Employer Profile

- Company name and description
- Industry and company type
- Company size and founded year
- Location and contact details
- Company website and logo URL

---

### Dashboards

#### Job Seeker Dashboard

- Profile completion status
- Applied jobs (mock data)
- Recommended jobs (mock data)

#### Employer Dashboard

- Job statistics (mock data)
- Posted jobs (mock data)
- Recent applications (mock data)

Note: Job listings and applications are currently mocked and will be connected to real APIs in future updates.

---

### UI Layout

- Collapsible sidebar navigation
- Topbar with role-based title
- Sidebar user section linking to profile
- Role-based rendering throughout the application

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

### Frontend

- React
- React Router
- Context API
- Axios
- Tailwind CSS

---

## Project Structure

````text
JobListingPortal/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   ├── pages/
│   │   │   ├── profile/
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   └── api/
│   └── package.json
|_________________________
```

## Environment Variables

```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

The backend runs on http://localhost:5000
The frontend runs on http://localhost:5173

## API Endpoints

### Authentication

```text
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

### Profiles

```text
POST /api/jobseeker/profile/me

GET /api/jobseeker/profile/me

POST /api/employer/profile/me

GET /api/employer/profile/me
```
````
