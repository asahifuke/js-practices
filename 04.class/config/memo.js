
const program = require('commander');
const MemoController = require('../app/controllers/memoController');

program
  .option('-l, --list')
  .option('-r, --read')
  .option('-d, --delete')
  .parse();

const options = program.opts();

const memoController = new MemoController();

if (options.list) {
  memoController.index();
} else if (options.read) {
  memoController.show();
} else if (options.delete) {
  memoController.destroy();
} else {
  memoController.create();
}
