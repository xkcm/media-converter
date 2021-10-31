const chalk = require('chalk')

const { parseArguments, determineDestinationPath, determineSourceFormat, isFormatSupported, ConverterError, checkMediaType, checkFormatsForCompatibility, determineSourcePath, determineDestinationFormat } = require('./utils')
const Converter = require('./converter')
const logger = require('./logger')

async function main(args){
  let { source, destination, format: destinationFormat } = parseArguments(args)
  if (!destination) destination = determineDestinationPath(source, destinationFormat)
  destinationFormat = determineDestinationFormat(destinationFormat)
  source = determineSourcePath(source)
  const sourceFormat = determineSourceFormat(source)

  if (!isFormatSupported(destinationFormat)) throw new ConverterError(`Converter does not accept '${chalk.bold(destinationFormat)}' destination format`)
  if (!isFormatSupported(sourceFormat)) throw new ConverterError(`Converter does not accept '${chalk.bold(sourceFormat)}' source format`)
  if (!checkFormatsForCompatibility(destinationFormat, sourceFormat)) throw new ConverterError(`Cannot convert from '${chalk.bold(sourceFormat)}' to '${chalk.bold(destinationFormat)}'`)
  const mediaType = checkMediaType(sourceFormat, destinationFormat)

  const result = await Converter.convert({
    mediaType,
    destination,
    format: destinationFormat,
    source
  }, {
    saveToFile: true
  })
  if (result == null) return logger.info('Converter', 'Conversion cancelled')
  if (result == false) throw new ConverterError('Conversion was not successful')
  logger.success('Converter', 'Conversion successful!')
  logger.success('Converter', 'Destination file saved at '+chalk.bold(destination))
}

if (require.main == module){
  main(process.argv)
    .catch(error => {
      logger.error('Converter', 'Caught an error!')
      if (error instanceof ConverterError) logger.error('Converter', error.message)
      else console.error(error)
    })
}
