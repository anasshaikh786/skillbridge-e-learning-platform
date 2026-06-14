# SkillBridge — E-Learning Platform

A full-stack ed-tech platform where students browse and purchase courses, and instructors manage content with analytics dashboards.

🔗 [Live Demo](https://skillbridge-e-learning-platform-8wj.vercel.app) &nbsp;|&nbsp; 🐙 [Source Code](https://github.com/anasshaikh786/skillbridge-e-learning-platform) 

---

### Tech Stack

**Frontend**
`React.js` &nbsp; `Redux` &nbsp; `Tailwind CSS` &nbsp; `HTML5`

**Backend**
`Node.js` &nbsp; `Express.js` &nbsp; `REST APIs` &nbsp; `JWT`

**Database**
`MongoDB` &nbsp; `Mongoose`

**Integrations**
`Razorpay` &nbsp; `Cloudinary` &nbsp; `OTP Verification` &nbsp; `SMTP`

**Deployment**
`Vercel` &nbsp; `Render` &nbsp; `MongoDB Atlas`

---

### Features

**For Students**
- Browse and purchase courses with Razorpay payment integration
- Secure login with JWT + OTP email verification
- Responsive UI across all devices

**For Instructors**
- Create and manage course content
- Analytics dashboard to track enrollments and revenue
- Media upload and management via Cloudinary

---

### Getting Started

```bash
# Clone the repo
git clone https://github.com/anasshaikh786/skillbridge-e-learning-platform.git

# Install dependencies
cd skillbridge-e-learning-platform
npm install

# Set up environment variables
cp .env.example .env

# Run the app
npm run dev
```

---

### Environment Variables

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### Project Structure

```
skillbridge/
├── client/               # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── redux/
└── server/               # Node.js backend
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

---

### Connect

Built by [Mohd Anas Shaikh](https://github.com/anasshaikh786) · [LinkedIn](https://linkedin.com/in/mohd-anas-shaikh)
