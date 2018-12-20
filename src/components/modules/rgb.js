import { FONT_HEIGHT, FONT_WIDTH } from './constants'

function rgb2Hex(r, g, b) {
  let hex = "#" 
  hex += ("0" + Number(r).toString(16)).slice(-2)
  hex += ("0" + Number(g).toString(16)).slice(-2)
  hex += ("0" + Number(b).toString(16)).slice(-2)
  return hex;
}

export function pickCharsFunc(chars, random = false) {
  const length = chars.length
  var cur = 0
  function inOrder() {
    return chars[cur++ % length]
  }
  function randomOrder() {
    return chars[Math.floor(Math.random() * length)]
  }
  return random ? randomOrder : inOrder
}

export function imageToRgbHTML(imageData, charWidth, textGen) {
  const dataArr = imageData.data
  const width = imageData.width
  const height = imageData.height
  const lines = []
  for (let h = 0; h < height; h += FONT_HEIGHT) {
    let line = ''
    for (let w = 0; w < width; w += FONT_WIDTH * charWidth) {
      const i = (w + width * h) * 4
      let hex = rgb2Hex(dataArr[i], dataArr[i + 1], dataArr[i + 2])
      line += ('<span style="color:' + ((dataArr[i + 3] == 0) ? "#FFFFFF" : hex) + '">' + textGen() + '</span>')
    }
    lines.push(line)
  }
  return lines
}