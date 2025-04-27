const User = require('../models/user');

async function midnightCheck() {
  const userData = await User.find();

  for (const user of userData) {
    let userUpdated = false;
    let retries = 0;

    while (!userUpdated && retries < 5) {
      try {
        const freshUser = await User.findById(user._id);

        if (freshUser.__v !== user.__v) {
          console.log(`Wersja dokumentu użytkownika ${user._id} się zmieniła. Próba ponownego przetworzenia.`);
          retries++;
          user = freshUser;
          continue;
        }

        const today = new Date().toISOString().slice(0, 10);
        if (freshUser.daily_usage.date !== today) {
          freshUser.daily_usage.count = 0;
          freshUser.daily_usage.date = today;
        }

        const todayDate = new Date();
        if (new Date(freshUser.plan.expiration_date) < todayDate) {
          freshUser.plan.expiration_date = '2099-01-01';
          freshUser.plan.plan_type = 'free';
        }

        await freshUser.save();

        userUpdated = true;
      } catch (error) {
        console.error(`Błąd podczas przetwarzania użytkownika ${user._id}: ${error.message}`);
        retries++;
      }
    }

    if (!userUpdated) {
      console.log(`Nie udało się zaktualizować użytkownika ${user._id} po kilku próbach.`);
    }
  }

  console.log('Zakończono przetwarzanie wszystkich użytkowników.');
}

module.exports = midnightCheck;