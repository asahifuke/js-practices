const Memo = require('../models/memo');
const readline = require('readline');

class MemoController {
  async index() {
    const memos = await Memo.all();
    memos.forEach(memo => console.log(memo.split()));
  }

  async create() {
    const bodies = await this.#receiveStdin();
    const memo = new Memo(null, bodies[0]);
    memo.save();
  }

  show() {
    Memo.runPrompt('Choose a note you want to see:', (memos, prompt) => {
      console.log(memos[prompt.index].body);
    });
  }

  destroy() {
    Memo.runPrompt('Choose a note you want to delete:', (memos, prompt) => {
      const memo = memos.filter(memo => memos.indexOf(memo) === prompt.index)[0];
      memo.destroy();
    });
  }

  #receiveStdin() {
    return new Promise(resolve => {
      process.stdin.setEncoding('utf8');
      const standardInputs = []; 
      const reader = readline.createInterface({
        input: process.stdin,
      });
      reader.on('line', standardInput => {
        standardInputs.push(standardInput);
        resolve(standardInputs);
      });
    });
  }
}

module.exports = MemoController;
