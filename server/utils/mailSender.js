const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_SECURE } =
    process.env

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured")
  }

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT) || 587,
    secure: MAIL_SECURE === "true",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })

  const info = await transporter.sendMail({
    from: `"SkillBridge" <${MAIL_USER}>`,
    to: email,
    subject: title,
    html: body,
  })

  console.log(info.response)
  return info
}

module.exports = mailSender
