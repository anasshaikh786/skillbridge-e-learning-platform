const nodemailer = require("nodemailer")

const transporters = new Map()

const normalizeBool = (value) => String(value).toLowerCase() === "true"

const assertRealMailConfig = ({ MAIL_HOST, MAIL_USER, MAIL_PASS }) => {
  const placeholderValues = [
    "example.com",
    "your_email_address",
    "your_email_app_password",
    "skillbridge.smtp.test@example.com",
  ]

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Mail service is not configured")
  }

  const configText = [MAIL_HOST, MAIL_USER, MAIL_PASS].join(" ").toLowerCase()
  if (placeholderValues.some((value) => configText.includes(value))) {
    throw new Error("Mail service is using placeholder credentials")
  }
}

const mailSender = async (email, title, body) => {
  const { MAIL_HOST, MAIL_USER, MAIL_PORT, MAIL_SECURE } = process.env
  const MAIL_PASS =
    MAIL_HOST === "smtp.gmail.com"
      ? process.env.MAIL_PASS?.replace(/\s+/g, "")
      : process.env.MAIL_PASS

  assertRealMailConfig({ MAIL_HOST, MAIL_USER, MAIL_PASS })

  const primaryPort = Number(MAIL_PORT) || 587
  const primarySecure = normalizeBool(MAIL_SECURE)
  const configs =
    MAIL_HOST === "smtp.gmail.com"
      ? [
          { port: primaryPort, secure: primarySecure },
          { port: 465, secure: true },
          { port: 587, secure: false },
        ]
      : [{ port: primaryPort, secure: primarySecure }]
  const uniqueConfigs = configs.filter(
    (config, index, allConfigs) =>
      allConfigs.findIndex(
        (item) => item.port === config.port && item.secure === config.secure
      ) === index
  )

  let lastError
  for (const config of uniqueConfigs) {
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

      console.log({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        user: process.env.MAIL_USER,
        hasPass: !!process.env.MAIL_PASS,
      })

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
      console.error(`Email send failed with ${MAIL_HOST}:${config.port}`, {
        secure: config.secure,
        code: error.code,
        command: error.command,
        responseCode: error.responseCode,
        message: error.message,
      })
    }
  }

  throw lastError
}

module.exports = mailSender
