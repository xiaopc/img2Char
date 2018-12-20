import { FONT_HEIGHT, FONT_WIDTH } from './constants'

function rgbToGray(r, g, b) {
  return (299 * r + 587 * g + 114 * b + 500) / 1000
}

export function createPairsFunc(chars) {
  const grayGap = 255 / chars.length
  function grayPair(gray) {
    let index = (gray / grayGap) >> 0
    if (index >= chars.length) {
      index = chars.length - 1
    }
    return chars[index]
  }

  return grayPair
}

export function imageToGrayScaleText(imageData, charWidth, grayToText) {
  const dataArr = imageData.data
  const width = imageData.width
  const height = imageData.height
  const lines = []
  for (let h = 0; h < height; h += FONT_HEIGHT) {
    let line = ''
    for (let w = 0; w < width; w += FONT_WIDTH * charWidth) {
      const i = (w + width * h) * 4
      const gray = rgbToGray(dataArr[i], dataArr[i + 1], dataArr[i + 2])
      line += grayToText((dataArr[i + 3] == 0) ? 255 : gray)
    }
    lines.push(line)
  }
  return lines
}