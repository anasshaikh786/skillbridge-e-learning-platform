# SkillBridge - E-Learning Platform

SkillBridge is a full-stack e-learning marketplace where instructors can publish structured courses and students can discover, purchase, and track their learning progress. It combines a polished React learning experience with a production-style Express API, MongoDB data models, authentication, media uploads, email workflows, and Razorpay payments.

This project demonstrates end-to-end product engineering: user journeys, role-based access, course content management, payment flow, and a deployable MERN architecture.

## Live Demo

Add your deployed links here after hosting:

- Frontend: `https://skillbridge-e-learning-platform.vercel.app`
- Backend API: `https://your-skillbridge-api.onrender.com`

## Why This Project Stands Out

- Complete student and instructor workflows instead of static pages.
- Secure authentication with JWT, OTP verification, password reset, and protected routes.
- Instructor course builder with course information, sections, subsections, thumbnails, and publish flow.
- Student cart, checkout, course enrollment, progress tracking, ratings, and reviews.
- Real integrations: MongoDB Atlas, Cloudinary, Nodemailer, and Razorpay.
- Responsive React UI with Redux state management and route-based dashboards.

## Features

### Student

- Sign up, verify email with OTP, log in, and reset password.
- Browse courses by category and view detailed course pages.
- Add courses to cart and purchase through Razorpay.
- Access enrolled courses and track lecture progress.
- Submit ratings and reviews after enrollment.

### Instructor

- Instructor dashboard with course insights.
- Create, edit, publish, and delete courses.
- Upload course thumbnails and lecture media through Cloudinary.
- Build nested course content with sections and subsections.
- View and manage created courses.

### Platform

- Role-based access control for Student, Instructor, and Admin flows.
- JWT authentication middleware for protected backend APIs.
- Email templates for OTP verification, password updates, enrollment, contact form, and payment success.
- Contact form API with confirmation email.
- Responsive UI with reusable components, dashboard navigation, and loading states.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, React Router, Redux Toolkit, Tailwind CSS |
| Forms and UI | React Hook Form, React Icons, Swiper, Chart.js |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt, OTP verification |
| Media | Cloudinary, express-fileupload |
| Payments | Razorpay |
| Email | Nodemailer |
| Deployment | Vercel frontend, Render backend, MongoDB Atlas database |

## Architecture

```text
SkillBridge
|-- src/                       # React frontend
|   |-- components/             # Reusable UI and feature components
|   |-- pages/                  # Route-level pages
|   |-- services/               # API endpoints and service operations
|   |-- slices/                 # Redux Toolkit state slices
|   |-- data/                   # Static navigation and UI data
|
|-- server/                    # Express backend
|   |-- config/                 # Database, Cloudinary, Razorpay config
|   |-- controllers/            # Business logic for APIs
|   |-- middleware/             # Auth and role authorization
|   |-- models/                 # Mongoose schemas
|   |-- routes/                 # API route definitions
|   |-- mail/templates/         # Transactional email templates
|   |-- utils/                  # Mail sender and upload helpers
```

## Getting Started Locally

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Razorpay test account
- SMTP email credentials, such as a Gmail app password

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skillbridge-e-learning-platform.git
cd skillbridge-e-learning-platform
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

Create `.env` in the project root:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

Create `server/.env`:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=skillbridge

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_app_password

RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
```

You can also copy the included example files:

```bash
copy .env.example .env
copy server\.env.example server\.env
```

### 5. Run the full app

From the project root:

```bash
npm run dev
```

The frontend runs on `http://localhost:3000` and the backend runs on `http://localhost:4000`.

## API Overview

Base URL:

```text
/api/v1
```

Main route groups:

- `/auth` - signup, login, OTP, password reset, change password
- `/profile` - user profile, enrolled courses, instructor dashboard
- `/course` - course CRUD, categories, sections, subsections, progress, reviews
- `/payment` - Razorpay order capture, verification, payment success email
- `/reach` - contact form

## Deployment Guide

### Backend on Render

1. Push the project to GitHub.
2. Create a new Render Web Service from the GitHub repository.
3. Set the root directory to `server`.
4. Use:

```text
Build Command: npm install
Start Command: npm start
```

5. Add all variables from `server/.env.example` in Render Environment Variables.
6. After deployment, test the API root URL. It should return:

```json
{
  "success": true,
  "message": "Your server is up and running ..."
}
```

### Frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Use Create React App defaults:

```text
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
```

3. Add frontend environment variables:

```env
REACT_APP_BASE_URL=https://your-render-backend-url.onrender.com/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

4. Deploy and verify signup, login, course loading, cart, payment, and email flows.

## GitHub Publishing Checklist

```bash
git init
git add .
git commit -m "Initial commit: SkillBridge e-learning platform"
git branch -M main
git remote add origin https://github.com/your-username/skillbridge-e-learning-platform.git
git push -u origin main
```

Before pushing, make sure real `.env` files are not committed. This project includes `.env.example` files so recruiters can understand the setup without seeing secrets.

## Interview Talking Points

- Designed role-based dashboards for students and instructors using protected React routes.
- Built a modular Express backend with controllers, routes, middleware, and Mongoose models.
- Implemented JWT authentication, OTP verification, and password reset flows.
- Integrated Razorpay payment verification before enrolling students in paid courses.
- Used Cloudinary for media storage and Nodemailer for transactional email workflows.
- Managed app-wide state with Redux Toolkit for auth, cart, profile, and course creation.

## Future Improvements

- Add automated tests for authentication, payment verification, and course creation.
- Add admin dashboard UI for category and platform management.
- Replace open CORS policy with production domain allowlisting.
- Add video streaming optimization and signed media URLs.
- Add analytics for instructor revenue and student engagement.

## Author

Built by Anas as a full-stack MERN learning platform project.
