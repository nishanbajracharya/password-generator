const { shuffle } = require('./util');

const numbers = '0123456789';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = `!"#$%&'()*+,-./:;<=>?@[]^_{|}~`;

const DEFAULT_OPTIONS = {
  numbers: false,
  lowerCase: true,
  upperCase: true,
  symbols: false,
  length: 8,
};

function generate(options = {}) {
  const completeOptions = { ...DEFAULT_OPTIONS, ...options };

  let requiredLength =
    completeOptions.length < 1
      ? DEFAULT_OPTIONS.length
      : completeOptions.length;

  let allCharacters = '';

  if (completeOptions.numbers) allCharacters += numbers;
  if (completeOptions.lowerCase) allCharacters += lowerCaseLetters;
  if (completeOptions.upperCase) allCharacters += upperCaseLetters;
  if (completeOptions.symbols) allCharacters += symbols;

  if (!allCharacters) allCharacters = lowerCaseLetters;

  const shuffledSet = shuffle(allCharacters);

  let password = shuffledSet.slice(0, requiredLength);

  const remainingCharacters = requiredLength - password.length;

  if (remainingCharacters > 0) {
    for (let i = 0; i < remainingCharacters; i++) {
      allCharacters = shuffle(allCharacters);

      password += allCharacters[0];
    }
  }

  return shuffle(password);
}

module.exports = generate;
