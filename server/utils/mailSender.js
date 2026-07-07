const nodemailer = require("nodemailer")

let transporter
let transporterConfigKey

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_SECURE } =
    process.env

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured")
  }

  const configKey = [MAIL_HOST, MAIL_USER, MAIL_PORT, MAIL_SECURE].join("|")

  if (!transporter || transporterConfigKey !== configKey) {
    transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT) || 587,
      secure: MAIL_SECURE === "true",
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      connectionTimeout: 7000,
      greetingTimeout: 7000,
      socketTimeout: 10000,
    })
    transporterConfigKey = configKey
  }

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
