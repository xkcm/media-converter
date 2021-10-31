const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const path = require('path')
const { stat } = require('fs/promises')

const { SUPPORTED_FORMATS } = require('./config');

class ConverterError extends Error {
  constructor(msg){
    super(msg)
  }
}

function parseArguments(argv){
  return yargs(hideBin(argv))
    .option("source", {
      alias: "s",
      type: "string",
      demandOption: true,
      describe: "Path to the source file"
    })
    .option("format", {
      alias: "f",
      type: "string",
      demandOption: true,
      describe: "Destination format which file should be converted into"
    })
    .option("destination", {
      alias: "d",
      type: "string",
      demandOption: false,
      describe: "Path where the destination file will be saved"
    })
    .parse()
}
/**
 * 
 * @param {string} source - Path to the source file
 * @param {string} destinationFormat - Format of the destination file 
 * @returns {string} Path to the destination file
 * @example
 * determineDestinationPath("/path/to/the/source.jpg", "png")
 */
const determineDestinationPath = (source, destinationFormat) => path.resolve(process.cwd(), path.join(path.dirname(source), path.basename(source, path.extname(source))+`.${destinationFormat}`))
/**
 * 
 * @param {string} source - Path to the source file
 * @returns {string} Format of the source file
 * @example
 * determineSourceFormat("/path/to/the/source.mov")
 */
const determineSourceFormat = (source) => path.extname(source).slice(1).toLowerCase()
/**
 * 
 * @param {string} format - Destination format
 * @returns {boolean} True if format is available, and false if it is not
 * @example
 * checkFormatForAvailability("png")
 */
const isFormatSupported = (format) => Object.values(SUPPORTED_FORMATS).reduce((acc, formats) => acc || (formats.includes(format)), false)
/**
 * 
 * @param {string} sourceFormat - Format of the source file
 * @param {string} destinationFormat - Format of the destination file
 * @returns {string} Media type of both formats
 * @example
 * checkMediaType("jpg", "png") -> "image"
 * checkMediaType("mp3", "wav") -> "audio"
 */
const checkMediaType = (sourceFormat, destinationFormat) => (Object.entries(SUPPORTED_FORMATS).find(([,formats]) => formats.includes(sourceFormat) && formats.includes(destinationFormat)) || [null])[0]
/**
 * 
 * @param {string} sourceFormat - Format of the source file
 * @param {string} destinationFormat - Format of the destination file
 * @returns {boolean} True if formats are compatible, false otherwise
 * @example
 * checkFormatsForCompatibility("jpg", "png") -> true
 * checkFormatsForCompatibility("wav", "jpg") -> false
 */
const checkFormatsForCompatibility = (sourceFormat, destinationFormat) => !!checkMediaType(sourceFormat, destinationFormat)
/**
 * 
 * @param {string} path - Path to the file 
 * @returns {Promise<boolean>} True if file under given path exists, false otherwise
 * @example
 * fileExists("/path/to/the/file") -> Promise<true>
 */
const fileExists = async (path) => {
  try { await stat(path) }
  catch(e){ return false }
  return true
}
/**
 * 
 * @param {string} sourcePath - Path to the source file
 * @returns {string} Resolved absolute path
 */
const determineSourcePath = sourcePath => path.resolve(process.cwd(), sourcePath)
/**
 * 
 * @param {string} format - Format of the destination file
 * @returns {string} Determined format of the destination file
 */
const determineDestinationFormat = format => (format.startsWith('.') ? format.slice(1) : format).toLowerCase()

module.exports = {
  determineDestinationPath,
  determineSourceFormat,
  determineSourcePath,
  determineDestinationFormat,
  checkFormatsForCompatibility,
  checkMediaType,
  isFormatSupported,
  fileExists,
  ConverterError,
  parseArguments
}