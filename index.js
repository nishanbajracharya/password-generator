const { getCharacterCount, shuffle } = require('./util');

const numbers = '0123456789';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = `_%$@!-`;
// const allSymbols = `~!@#$%^&*()_+-={}[]\|;:'"<>?,./\``;

const DEFAULT_OPTIONS = {
  numbers: false,
  lowerCase: true,
  upperCase: true,
  symbols: false,
  length: 8,
};

const MIN_ADDITIONAL_CHARACTERS = 2;

function generate(options = {}) {
  const completeOptions = { ...DEFAULT_OPTIONS, ...options };

  let requiredLength = completeOptions.length - MIN_ADDITIONAL_CHARACTERS;

  if (requiredLength < 1)
    requiredLength = DEFAULT_OPTIONS.length - MIN_ADDITIONAL_CHARACTERS;

  let allCharacters = '';

  if (completeOptions.numbers) allCharacters += numbers;
  if (completeOptions.lowerCase) allCharacters += lowerCaseLetters;
  if (completeOptions.upperCase) allCharacters += upperCaseLetters;
  if (completeOptions.symbols) allCharacters += symbols;

  if (!allCharacters) allCharacters = lowerCaseLetters;

  const shuffledSet = shuffle(allCharacters);

  let password = shuffledSet.slice(0, requiredLength);

  for (let i = 0; i < MIN_ADDITIONAL_CHARACTERS; i++) {
    let characters = [];

    if (completeOptions.numbers) characters.push(numbers);
    if (completeOptions.lowerCase) characters.push(lowerCaseLetters);
    if (completeOptions.upperCase) characters.push(upperCaseLetters);
    if (completeOptions.symbols) characters.push(symbols);

    let characterPercent = [];

    characters.forEach((set) => {
      const percent = getCharacterCount(password, set) / password.length;

      characterPercent.push(percent);
    });

    const minPercent = Math.min(...characterPercent);

    const minCharacterIndex = characterPercent.findIndex(
      (index) => index === minPercent
    );

    let characterSet = characters[minCharacterIndex];

    characterSet = shuffle(characterSet);

    password += characterSet[0];
  }

  const remainingCharacters = completeOptions.length - password.length;

  if (remainingCharacters > 0) {
    allCharacters = shuffle(allCharacters);

    password += allCharacters.slice(0, remainingCharacters);
  }

  return shuffle(password);
}

module.exports = generate;