const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zoneoftech22@gmail.com',
    pass: 'rkzp vqth rdxv xlln'
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'zoneoftech22@gmail.com',
    subject: subject,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
      return res.status(500).redirect('/message/index.html?error=1'); // Redireciona para a página de erro
    }
    res.redirect('/message/index.html'); // Redireciona para a página de sucesso
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
