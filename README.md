# media-converter
### Description
Simple media converter built with JavaScript in NodeJS. It allows you to convert images, audio and video files to different extensions.

![usage example](https://i.imgur.com/MOjVrmu.gif)
### Dependencies
- ffmpeg (for audio and video conversion)
- jimp (for image conversion)
### Installation
Clone this repo
```bash
git clone http://github.com/xkcm/media-converter
```
Enter the directory and install all dependencies
```bash
yarn
```
Also if you do not have ffmpeg installed, it is also required to install this library, you can install it with:
```bash
sudo apt install ffmpeg
```
### Usage
Open up the terminal and type
```bash
yarn start --source <path to the source file> --format <target format>
```
By default the new file will be saved in the same directory as the source file, you can explicitly declare the destination by using "--destination"
```bash
yarn start --source <path to the source file> --format <target format> --destination <destination path>
```
### Further development
I will not develop this project any further, it was made just for fun and personal use:)
