const express = require('express');
const authRouter = require('../routes/auth');
const descRouter = require('../routes/desc');
const userRouter = require('../routes/user');
const cors = require('cors');
const midnightCheck = require('../cron/midnightCheck');
const cron = require('node-cron');

const app = express();
const db = require('../database/db');


app.use(cors({
  origin: 'https://denchal.github.io',
  credentials: true,
  methods: ['GET','POST','OPTIONS']
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/desc', descRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

cron.schedule('0 0 * * *', () => {
  midnightCheck();
  console.log('Wykonuję zadanie aktualizację limitów');
});

midnightCheck();