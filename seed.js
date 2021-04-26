const db = require('./models');
const axios = require("axios");

const examples = [
  { name: 'Example 1', completed: true}, 
  { body: 'Example 2', completed: false}
];
const oneExample = { name: 'Example 3', completed: true };


const addManyExamples = async () => {
  const savedExamples = await db.Example.insertMany(examples);
  console.log('=======> Saved Examples.');
  console.log(savedExamples);
}

const addOneExample = async () => {
  const savedOneExample = await db.Example.create(oneExample);
  console.log('=======> Saved One Example.');
  console.log(savedOneExample);
}

// run the functions
// addManyExamples();
// addOneExample();

const oneMessage = { content: 'This is the first message' };

const addOneMessage = async () => {
  const savedOneMessage = await new db.Message.create(oneMessage);
  console.log('=======> Saved One Message.');
  console.log(savedOneMessage);
}

// run the function
// addOneMessage();

const currency = { _id: "AAA", symbol: "AAA", symbol_native: "AAA", decimal_digits: 0, rounding: 0 }

const addOneCurrency = async  () => {
  const savedCurency = await new db.Currency(currency)
}

// addOneMessage();


// Currency seed data provided by LocalePlanet
// https://www.localeplanet.com
const getCurrencies = async () => {
  try {
    const localePlanetURL = "https://www.localeplanet.com/api/auto/currencymap.json?name=y";
    const currenciesData = await axios.get(localePlanetURL);
      const currencies = Object.keys(currenciesData.data).map((currency) => {
        const { name, name_plural, code, symbol, symbol_native, decimal_digits, rounding } = currenciesData.data[currency];
        
        return { name, name_plural, code, symbol, symbol_native, decimal_digits, rounding };
      });
      
      try {
        const savedCurrencies = await db.Currency.insertMany(currencies)
        console.log(savedCurrencies);
        process.exit() // Exit Node.js
      } catch (error) {
        console.log(error.message);
        process.exit(1) // Exit Node.js
      }
    } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

getCurrencies();