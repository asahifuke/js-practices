function calendar() {
  function requireArgv() {
    return require('minimist')(process.argv.slice(2));
  }
  
  function requireYear(argv) {
    return argv['y'] || new Date().getFullYear()
  }
  
  function requirMonth(argv) {
    return argv['m'] || new Date().getMonth()+1
  }
  
  function requireDay(year, month, date) {
    const thisDate = new Date();
    thisDate.setMonth(month);
    thisDate.setYear(year);
    thisDate.setDate(date);
    return thisDate; 
  }
  
  function requireFirstDay(year, month) {
    return requireDay(year, month - 1, 1);
  }
  
  function requireLastDay(year, month){
    return requireDay(year, month, 0);
  }
  
  let result = `${requirMonth(requireArgv())}月 ${requireYear(requireArgv())}\n`.padStart(15, " ")
  result += '日 月 火 水 木 金 土\n'
  result += ''.padStart(requireFirstDay(requireYear(requireArgv()), requirMonth(requireArgv())).getDay() * 3, " ") 
  for (let nowDay = 1; nowDay <= requireLastDay(requirMonth(requireArgv()), requirMonth(requireArgv())).getDate(); nowDay++) {
    result += (String(nowDay).padStart(2 , " ")).padEnd(3, " "); 
    if ((requireFirstDay(requirMonth(requireArgv()), requirMonth(requireArgv())).getDay() + nowDay) % 7 === 0) { result += '\n'}
  }
  return result
}
module.exports = calendar;
