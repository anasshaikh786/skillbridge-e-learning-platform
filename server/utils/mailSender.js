const nodemailer = require("nodemailer");

const assertRealMailConfig = ({ MAIL_HOST, MAIL_USER, MAIL_PASS }) => {
  const placeholderValues = [
    "example.com",
    "your_email_address",
    "your_email_app_password",
    "skillbridge.smtp.test@example.com",
  ];

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured");
  }

  const configText = [MAIL_HOST, MAIL_USER, MAIL_PASS]
    .join(" ")
    .toLowerCase();

  if (placeholderValues.some((value) => configText.includes(value))) {
    throw new Error("Mail service is using placeholder credentials");
  }
};

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER } = process.env;

  const MAIL_PASS =
    MAIL_HOST === "smtp.gmail.com"
      ? process.env.MAIL_PASS?.replace(/\s+/g, "")
      : process.env.MAIL_PASS;

  assertRealMailConfig({ MAIL_HOST, MAIL_USER, MAIL_PASS });

  console.log("MAIL CONFIG:", {
    host: MAIL_HOST,
    user: MAIL_USER,
    hasPass: !!MAIL_PASS,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: `"SkillBridge" <${MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("EMAIL SENT:", info.response);

    return info;
  } catch (error) {
    console.error("MAIL ERROR:", {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      message: error.message,
    });

    throw error;
  }
};

module.exports = mailSender;
