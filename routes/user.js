const User = require('../models/user');
const Desc = require('../models/desc');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.get('/history', authMiddleware, async (req, res) => {

  try {
    const userHistory = await Desc.find({ login: req.user.login }).sort({ date: -1 });
    res.json(userHistory);
  } catch (error) {
    console.error('Błąd przy pobieraniu historii zapytań:', error);
    res.status(500).send({ error: 'Błąd serwera podczas pobierania historii zapytań' });
  }
});

router.get('/history/:id', authMiddleware, async (req, res) => {
  try {
    const desc = await Desc.findById(req.params.id);
    if (!desc) {
      return res.status(404).send({ error: 'Nie znaleziono opisu' });
    }
    res.json(desc);
  } catch (error) {
    console.error('Błąd pobierania opisu:', error);
    res.status(500).send({ error: 'Błąd serwera' });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userInfo = await User.findOne({login: req.user.login });
    res.json({login: userInfo.login, plan: userInfo.plan?.plan_type, daily: userInfo.daily_usage?.count});
  } catch (error) {
    console.error('Błąd przy pobieraniu danych użytkownika:', error);
    res.status(500).send({ error: 'Błąd serwera podczas pobierania danych użytkownika' });
  }
});

module.exports = router;

