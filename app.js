const canvas = document.querySelector('#jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.querySelectorAll('.jsColor')
const lineWidthRange = document.querySelector('#jsRange')
const modeBtn = document.querySelector('#jsMode')
const saveBtn = document.querySelector('#jsSave')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700

canvas.height = CANVAS_SIZE
canvas.width = CANVAS_SIZE

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

ctx.lineWidth = 2.5
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR

let painting = false
let filling = false

function startPainting() {
  painting = true
}

function stopPainting() {
  painting = false
}

function onMouseMove(event) {
  const { offsetX: x, offsetY: y } = event
  if (painting) {
    ctx.lineTo(x, y)
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
}

function onMouseDown() {
  startPainting()
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
}

function handleContextMenu(event) {
  event.preventDefault()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvasClick)
  canvas.addEventListener('contextmenu', handleContextMenu)
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

colors.forEach((color) => color.addEventListener('click', handleColorClick))

function onLineWidthChange(event) {
  const lineWidth = event.target.value
  ctx.lineWidth = lineWidth
}

if (lineWidthRange) {
  lineWidthRange.addEventListener('change', onLineWidthChange)
}

function handleModeClick(event) {
  const btn = event.target
  if (filling) {
    filling = false
    btn.innerText = 'FILL'
  } else {
    filling = true
    btn.innerText = 'DRAW'
  }
}

if (modeBtn) {
  modeBtn.addEventListener('click', handleModeClick)
}

function handleSaveClick(event) {
  const image = canvas.toDataURL()
  const link = document.createElement('a')
  link.href = image
  link.download = 'Paint JS [Export]'
  link.click()
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick)
}
