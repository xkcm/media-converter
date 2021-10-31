const { AUDIO_MEDIA_TYPE, VIDEO_MEDIA_TYPE, IMAGE_MEDIA_TYPE } = require("../src/config")
const utils = require("../src/utils")

describe("Utils unit tests", () => {
  it("should determine the destination format to 'png'", () => {
    const format = ".PNG"
    const correctFormat = "png"
    const determinedFormat = utils.determineDestinationFormat(format)
    expect(determinedFormat).toEqual(correctFormat)
  })
  it("should determine destination path to /path/to/file.png", () => {
    const path = "/path/to/file.jpg"
    const format = "png"
    const correctPath = "/path/to/file.png"
    const determinedPath = utils.determineDestinationPath(path, format)
    expect(determinedPath).toEqual(correctPath)
  })
  it("should determine source format to txt", () => {
    const path = "/path/to/file.txt"
    const correctExt = "txt"
    const determinedExt = utils.determineSourceFormat(path)
    expect(determinedExt).toEqual(correctExt)
  })
  it("should check if file exists and return false", async () => {
    const path = "/this/path/does/not/exist"
    const exists = await utils.fileExists(path)
    expect(exists).toBeFalsy()
  })
  it("should check if given formats are supported", () => {
    const supported = [
      "mp3", "mp4", "jpg", "png", "mov", "webm"
    ]
    const notSupported = [
      "txt", "docx", "pdf", "js", "java"
    ]
    for (let format of supported) {
      const isSupported = utils.isFormatSupported(format)
      expect(isSupported).toBeTruthy()
    }
    for (let format of notSupported) {
      const isSupported = utils.isFormatSupported(format)
      expect(isSupported).toBeFalsy()
    }
  })
  it("should check if given pairs of formats are compatible", () => {
    const compatible = [
      ["mp3", "wav"],
      ["jpg", "jpeg"],
      ["png", "jpg"],
      ["mp4", "webm"],
      ["webm", "aax"]
    ]
    const notCompatible = [
      ["mp3", "txt"],
      ["mp4", "wav"],
      ["jpg", "mp3"],
      ["png", "mp4"]
    ]
    for (let [f1, f2] of compatible){
      const areCompatible = utils.checkFormatsForCompatibility(f1, f2)
      expect(areCompatible).toBeTruthy()
    }
    for (let [f1, f2] of notCompatible){
      const areCompatible = utils.checkFormatsForCompatibility(f1, f2)
      expect(areCompatible).toBeFalsy()
    }
  })
  it("should return correct media type", () => {
    const formatsMediaPairs = [
      ["mp3", "wav", AUDIO_MEDIA_TYPE],
      ["mp4", "avi", VIDEO_MEDIA_TYPE],
      ["mov", "webm", VIDEO_MEDIA_TYPE],
      ["jpg", "png", IMAGE_MEDIA_TYPE],
      ["png", "bmp", IMAGE_MEDIA_TYPE],
      ["tiff", "jpg", IMAGE_MEDIA_TYPE]
    ]
    for (let [f1, f2, correctMediaType] of formatsMediaPairs){
      const determinedMediaType = utils.checkMediaType(f1, f2)
      expect(determinedMediaType).toEqual(correctMediaType)
    }
  })
})
