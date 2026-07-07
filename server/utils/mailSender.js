const nodemailer = require("nodemailer")

const transporters = new Map()

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_SECURE } =
    process.env

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured")
  }

  const primaryPort = Number(MAIL_PORT) || 587
  const primarySecure = MAIL_SECURE === "true"
  const configs = [{ port: primaryPort, secure: primarySecure }]

  if (MAIL_HOST === "smtp.gmail.com") {
    const fallback =
      primaryPort === 465
        ? { port: 587, secure: false }
        : { port: 465, secure: true }

    configs.push(fallback)
  }

  let lastError
  for (const config of configs) {
    const configKey = [
      MAIL_HOST,
      MAIL_USER,
      config.port,
      config.secure,
    ].join("|")

    if (!transporters.has(configKey)) {
      transporters.set(
        configKey,
        nodemailer.createTransport({
          host: MAIL_HOST,
          port: config.port,
          secure: config.secure,
          auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
          },
          connectionTimeout: 7000,
          greetingTimeout: 7000,
          socketTimeout: 10000,
        })
      )
    }

    try {
      const info = await transporters.get(configKey).sendMail({
        from: `"SkillBridge" <${MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
      })

      console.log(info.response)
      return info
    } catch (error) {
      lastError = error
      transporters.delete(configKey)
      console.error(
        `Email send failed with ${MAIL_HOST}:${config.port}`,
        error.message
      )
    }
  }

  throw lastError
}

module.exports = mailSender
