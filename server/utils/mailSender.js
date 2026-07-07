const nodemailer = require("nodemailer")

const transporters = new Map()

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER, MAIL_PORT, MAIL_SECURE } = process.env
  const MAIL_PASS =
    MAIL_HOST === "smtp.gmail.com"
      ? process.env.MAIL_PASS?.replace(/\s+/g, "")
      : process.env.MAIL_PASS

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured")
  }

  const primaryPort = Number(MAIL_PORT) || 587
  const primarySecure = MAIL_SECURE === "true"
  const configs =
    MAIL_HOST === "smtp.gmail.com"
      ? [
          { port: 465, secure: true },
          { port: 587, secure: false },
        ]
      : [{ port: primaryPort, secure: primarySecure }]

  if (
    MAIL_HOST === "smtp.gmail.com" &&
    !configs.some(
      (config) => config.port === primaryPort && config.secure === primarySecure
    )
  ) {
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
      config.service || config.port,
      config.secure,
    ].join("|")

    if (!transporters.has(configKey)) {
      const transportConfig = {
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
          family: 4,
          tls: {
            servername: MAIL_HOST,
          },
        }

      transporters.set(configKey, nodemailer.createTransport(transportConfig))
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
        `Email send failed with ${config.service || `${MAIL_HOST}:${config.port}`}`,
        error.message
      )
    }
  }

  throw lastError
}

module.exports = mailSender
