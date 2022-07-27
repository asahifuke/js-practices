const { Select } = require('enquirer');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../db/memo.db');

class Memo {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  static all() {
    return new Promise((resolve) => {
      const memos = [];
      db.all(`SELECT * FROM memos ORDER BY id ASC`, 
        (error, rows) => rows.forEach(row => {
          memos.push(new Memo(row.id, row.body));
          resolve(memos);
        })
      );
    });
  }

  static select(message) {
    return new Select({ message: message, choices: Memo.choice() });
  }

  static async choice() {
    const memos = await Memo.all();
    return memos.map((memo) => { return memo.split(); });
  }

  static async runPrompt(message, callback) {
    const memos = await Memo.all();
    const prompt = Memo.select(message);
    prompt.run().then(() => callback(memos, prompt));
  }

  save() {
    db.run('INSERT INTO memos(body) VALUES(?)', this.body);
  }

  destroy() {
    db.run(`DELETE FROM memos WHERE id = ?`, this.id);
  }

  split() {
    return this.body.split(/\n/)[0];
  }
}

module.exports = Memo;
