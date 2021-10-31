
const IMAGE_MEDIA_TYPE = 'image'
const AUDIO_MEDIA_TYPE = 'audio'
const VIDEO_MEDIA_TYPE = 'video'

const SUPPORTED_FORMATS = {
  [IMAGE_MEDIA_TYPE]: [
    "png", "jpg", "jpeg", "bmp", "tiff"
  ],
  [AUDIO_MEDIA_TYPE]: [
    "mp3", "wav"
  ],
  [VIDEO_MEDIA_TYPE]: [
    "mp4", "mov", "mkv", "avi", "webm", "aax"
  ]
}

module.exports = {
  SUPPORTED_FORMATS,
  IMAGE_MEDIA_TYPE,
  AUDIO_MEDIA_TYPE,
  VIDEO_MEDIA_TYPE
}