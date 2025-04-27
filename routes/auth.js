const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/user');
//const { sendVerificationEmail } = require('../utils/mailer');
const { isValidEmail } = require('../utils/emailValidation');
const { TOKEN_EXPIRATION } = require('../config/constants');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { login, pwd } = req.body;
  if (!login || !pwd) return res.status(400).send('Brak danych, podaj email oraz hasło!');
  if (!isValidEmail(login)) {
    return res.status(400).send('Nieprawidłowy format adresu email!');
  }
  if (pwd.length < 8 || pwd.length > 32) {
    return res.status(400).send('Hasło musi mieć pomiędzy 8 a 32 znaki!');
  }  
  try {
    const existing = await User.findOne({ login });
    if (existing) return res.status(400).send('Użytkownik już istnieje, zaloguj się!');

    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = new User({ login, pwd: hashedPwd, isVerified: true}); // Bypass weryfikacji
    await newUser.save();
    res.status(201).send('Zarejestrowano!');
  } catch (err) {
    console.error('Błąd rejestracji:', err);
    res.status(500).send('Błąd serwera');
  }
});

router.post('/login', async (req, res) => {
  const { login, pwd } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(400).send('Nieprawidłowy login lub hasło');

    const valid = await bcrypt.compare(pwd, user.pwd);
    if (!valid) return res.status(400).send('Nieprawidłowy login lub hasło');

    const token = jwt.sign({ login: user.login }, process.env.SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    res.json({ message: 'Zalogowano', token });
  } catch (err) {
    console.error('Błąd logowania:', err);
    res.status(500).send('Błąd serwera');
  }
});

module.exports = router;