const Memo = require('../models/memo');
const readline = require('readline');

class MemoController {
  async index() {
    const memos = await Memo.all();
    memos.forEach(memo => console.log(memo.split()));
  }

  async show() {
    const memos = await Memo.all();
    const prompt = Memo.select('Choose a note you want to see:');
    prompt.run().then(() => console.log(memos[prompt.index].body));
  }

  async destroy() {
    const memos = await Memo.all();
    const prompt = Memo.select('Choose a note you want to delete:');
    prompt.run().then(() => {
      const memo = memos.filter(memo => memos.indexOf(memo) === prompt.index)[0];
      memo.destroy();
    });
  }

  async create() {
    const bodies = await this.#receiveStdin();
    const memo = new Memo(null, bodies[0]);
    memo.save();
  }

  #receiveStdin() {
    return new Promise(resolve => {
      process.stdin.setEncoding("utf8");
      const standardInputs = []; 
      const reader = readline.createInterface({
        input: process.stdin,
      });
      reader.on("line", standardInput => {
        standardInputs.push(standardInput);
        resolve(standardInputs);
      });
    });
  }
}

module.exports = MemoController;
