// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CLIENT_URL || "")
	.split(",")
	.map((origin) => origin.trim().replace(/\/$/, ""))
	.filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			const normalizedOrigin = origin ? origin.replace(/\/$/, "") : origin;

			if (
				!origin ||
				allowedOrigins.includes(normalizedOrigin) ||
				/^https:\/\/skillbridge-e-learning-platform.*\.vercel\.app$/.test(normalizedOrigin) ||
				/^http:\/\/localhost:\d+$/.test(normalizedOrigin)
			) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.get("/api/v1/health", (req, res) => {
	return res.json({
		success: true,
		message: "SkillBridge API is healthy",
		mailConfigured: Boolean(
			process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS
		),
		clientUrl: process.env.CLIENT_URL || null,
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
