const Jimp = require("jimp")
const fs = require("fs/promises")
const prompts = require("prompts")
const ffmpeg = require("fluent-ffmpeg")
const cliProgress = require("cli-progress")

const { IMAGE_MEDIA_TYPE, AUDIO_MEDIA_TYPE, VIDEO_MEDIA_TYPE } = require("./config")
const { ConverterError, fileExists } = require("./utils")
const logger = require('./logger')
const chalk = require("chalk")

/**
 * 
 * @param {{source: string, destination: string, format: string}} media - Media information
 * @param {{saveToFile: boolean}} options - Additional options
 * @returns {boolean} True if conversion was successful, false otherwise
 */
async function ImageConversion(media, options){
  logger.info("ConversionUnit", "Loading image")
  const image = await Jimp.read(media.source)
  logger.success("ConversionUnit", "Image data loaded")
  logger.info("ConversionUnit", "Conversion in progress")
  if (options.saveToFile) await image.writeAsync(media.destination)
  logger.success("ConversionUnit", "Success!")
  return true
}
/**
 * 
 * @param {{source: string, destination: string, format: string}} media - Media information
 * @param {{saveToFile: boolean}} options - Additional options
 * @returns {boolean} True if conversion was successful, false otherwise
 */
function AudioConversion(media, options){
  return new Promise((res, rej) => {
    logger.info("ConversionUnit", "Conversion in progress")
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey)

    const command = ffmpeg(media.source)
    if (options.saveToFile) {
      progressBar.start(100, 0)
      command.saveToFile(media.destination)
    }
    command.on("progress", (progress) => {
      progressBar.update(parseInt(progress.percent))
    })
    command.on("error", rej)
    command.on("end", () => {
      progressBar.update(100)
      progressBar.stop()
      logger.success("ConversionUnit", "Success!")
      res(true)
    })

  })
}
/**
 * 
 * @param {{source: string, destination: string, format: string}} media - Media information
 * @param {{saveToFile: boolean}} options - Additional options
 * @returns {boolean} True if conversion was successful, false otherwise
 */
function VideoConversion(media, options){
  return AudioConversion(media, options)
}

/**
 * 
 * @param {{mediaType: string, source: string, destination: string, format: string}} media - Media information
 * @param {{saveToFile: boolean}} options - Additional options
 * @returns {boolean|null} True if conversion was successful, false otherwise
 */
async function convert(media, options){
  let result
  if (await fileExists(media.destination)) {
    logger.warning("ConversionUnit", `Found a file at the destination path (${media.destination})`)
    const response = await prompts({
      message: 'Do you want to delete the file?',
      name: 'value',
      type: 'confirm',
      initial: true,

    })
    if (response.value) await fs.unlink(media.destination)
    else return null
  }
  try {
    switch(media.mediaType){
      case IMAGE_MEDIA_TYPE:
        result = await ImageConversion(media, options)
        break
      case AUDIO_MEDIA_TYPE:
        result = await AudioConversion(media, options)
        break
      case VIDEO_MEDIA_TYPE:
        result = await VideoConversion(media, options)
        break
      default:
        throw new ConverterError(`Unknown media type "${media.mediaType}"`)
    }
  } catch (error) {
    if (error.message.match("ffmpeg: not found")) throw new ConverterError(`
      Error occurred while processing audio: ${chalk.bold("ffmpeg")} is required for this converter to work
      You can install it with: ${chalk.bold("sudo apt install ffmpeg")}
    `)
    throw new ConverterError(`An error occured while trying to convert media\n\n${error.message}`)
  }
  return result
}

module.exports = {
  convert
}