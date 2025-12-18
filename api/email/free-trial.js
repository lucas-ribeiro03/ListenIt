require("dotenv").config();
const nodemailer = require("nodemailer");

exports.sendFreeTrialEmail = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (!email) return res.json({ error: "Email não recebido" });

  try {
    const functionToSendMail = async (email) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"ListenIt" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: "1 mês grátis!",
        html: "<h2>Você ganhou 1 mês grátis!</h2><p>Crie sua conta agora mesmo e resgate seu período de experiência no ListenIt</p>",
      };

      await transporter.sendMail(mailOptions);
    };

    return res.status(200).json("Email enviado com sucesso");
  } catch (e) {
    console.log(e);
    return res.json("ERRO!");
  }
};
