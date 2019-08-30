import { FONT_HEIGHT, FONT_WIDTH } from './constants'

function rgba2Hex(r, g, b, a, br, bg, bb) {
  let hex = "#" 
  const alpha = a / 255
  const rr = Math.floor(r * alpha + br * (1 - alpha))
  const rg = Math.floor(g * alpha + bg * (1 - alpha))
  const rb = Math.floor(b * alpha + bb * (1 - alpha))
  hex += ("0" + Number(rr).toString(16)).slice(-2)
  hex += ("0" + Number(rg).toString(16)).slice(-2)
  hex += ("0" + Number(rb).toString(16)).slice(-2)
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
      let hex = rgba2Hex(dataArr[i], dataArr[i + 1], dataArr[i + 2], dataArr[i + 3], 255, 255, 255)
      line += ('<span style="color:' + hex + '">' + textGen() + '</span>')
    }
    lines.push(line)
  }
  return lines
}