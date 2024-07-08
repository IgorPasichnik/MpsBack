const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const { feedbackData } = req.body;

    const name = feedbackData.name
      ? feedbackData.name
      : "(Клиент не указал имя)";

    await transporter.sendMail({
      from: process.env.EMAIL_ADRESS,
      to: process.env.EMAIL_ADRESS,
      subject: "Новое сообщение о заявке",
      text: `${feedbackData}`,
      html: `От:  ${name}<br/>Email:  ${feedbackData.email}<br/>Телефон:  ${feedbackData.phoneNumber}<br/>Сообщение:  ${feedbackData.message}`,
    });

    return res.status(200).send({ message: "Сообщение отправлено успешно" });
  } catch (e) {
    return res.status(500).send({ message: "Ошибка отправки сообщения" });
  }
};

module.exports = { sendEmail };
