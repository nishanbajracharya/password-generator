function getCharacterCount(string = '', source = '') {
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    const character = string[i];

    if (source.includes(character)) count++;
  }

  return count;
}

function shuffle(string = '') {
  return string
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
}

module.exports = {
  shuffle,
  getCharacterCount,
};
