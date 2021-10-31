const chalk = require("chalk");

function log(options){
  let msg = chalk.bold(options.label || "Converter")+" "+options.message
  if (options.level == 'info') msg = chalk.blueBright("info")+"    "+msg
  else if (options.level == 'success') msg = chalk.greenBright("success")+" "+msg
  else if (options.level == 'error') msg = chalk.red("error")+"   "+msg
  else if (options.level == 'warning') msg = chalk.yellowBright("warning")+" "+msg
  console.log(msg)
}

const info = (label, message) => log({ label, message, level: 'info' })
const error = (label, message) => log({ label, message, level: 'error' })
const success = (label, message) => log({ label, message, level: 'success' })
const warning = (label, message) => log({ label, message, level: 'warning' })

module.exports = {
  info, error, success, warning
}