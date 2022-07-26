const calendar = require('./calendar');

test('adds 1 + 2 to equal 3', () => {
  const july2020 = "       7月 2022\n日 月 火 水 木 金 土\n                1  2 \n 3  4  5  6  7  8  9 \n10 11 12 13 14 15 16 \n17 18 19 20 21 22 23 \n24 25 26 27 28 29 30 \n31 "
  expect(calendar()).toEqual(july2020);
});
