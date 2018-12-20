export function staticImageBuffer(image, resize = 1) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const ratio = image.width / image.naturalWidth
  canvas.width = image.width * resize
  canvas.height = image.height * resize
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  ctx.scale(ratio * resize, ratio * resize)
  const imageData = ctx.getImageData(0, 0, image.width * resize, image.height * resize)
  return imageData
}