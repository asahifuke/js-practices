class Calendar {
  constructor() {
    this.argv = require('minimist')(process.argv.slice(2));
    this.year = this.argv['y'] || new Date().getFullYear()
    this.month = this.argv['m'] || new Date().getMonth() + 1
  }

  show() {
    let result = `${this.month}月 ${this.year}\n`.padStart(15, " ")
    result += '日 月 火 水 木 金 土\n'
    result += ''.padStart(this.#calculateFirstDay().getDay() * 3, " ")
    for (let nowDay = 1; nowDay <= this.#calculateLastDay().getDate(); nowDay++) {
      result += (String(nowDay).padStart(2 , " ")).padEnd(3, " ");
      if (this.#isSaturday(nowDay)) { result += '\n'}
    }
    console.log(result);
  }

  #calculateFirstDay() {
    return new Date(this.year, this.month - 1, 1);
  }

  #calculateLastDay() {
    return new Date(this.year, this.month, 0);
  }

  #isSaturday(nowDay) {
    return (this.#calculateFirstDay().getDay() + nowDay) % 7 === 0
  }
}
module.exports = Calendar;
