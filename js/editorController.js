'use strict'

var gCtx;
var gCanvas;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function onInitMeme() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    addListeners()
}

// RESIZE CANVAS //

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function changeToEditorWindow() {
    resizeCanvas()
    renderCanvas()
}

// Event listners //

function addListeners() {
    // Canvas Dimenestion
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
    // Mouse 
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
    // Touch
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const clickedPos = getEvPos(ev)
    console.log('pos', clickedPos)
    if (!isLineClicked(clickedPos)) return
    // line is clicked:
    RenderSelectedLine()
    gStartPos = clickedPos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!isCanvas()) return
    const line = getDragLine();
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
        renderRecEditor(line)
    }
}

function onUp() {
    renderCanvas()
    setFlaseLineDrag()
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

//  RENDER CANVAS

function renderCanvas() {
    var currImg = getSelectedImage() // {id url keywords: [])
    if (!currImg) {
        drawText('Choose a photo', (gCanvas.height / 5), (gCanvas.height / 5), (gCanvas.height / 10), { outLineColor: '#000000', fillColor: '#ffffff' }, 'Impact', 'start')
        return
    }
    drawImgFromLocal(currImg.url)
    drawLines();
}

function drawLines() {
    if (!isCanvas()) return
    var meme = getMeme();
    meme.lines.forEach(line => {

        drawText(line.txt, line.position.x, line.position.y, line.fontSize, line.color, line.font, line.textAlign)
    });
}

function drawImgFromLocal(imgUrl) {
    var img = new Image()
    img.src = imgUrl;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
}

function drawText(txt, x, y, size, color, font, align) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color.outLineColor
    gCtx.fillStyle = color.fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align;
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function renderRecEditor(line) {
    if (line.textAlign === 'left') {
        drawRect((line.position.x - 10), (line.position.y - (1 * line.fontSize)),
            line.txt.length * (0.55 * line.fontSize), (1.2 * line.fontSize))
    }
    if (line.textAlign === 'center') {
        drawRect((line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize / 2)), (line.position.y - (1 * line.fontSize)),
            line.txt.length * (0.55 * line.fontSize), (1.2 * line.fontSize))
    }
    if (line.textAlign === 'right') {
        drawRect((line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize)), (line.position.y - (1 * line.fontSize)),
            line.txt.length * (0.55 * line.fontSize), (1.2 * line.fontSize))
    }
}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.strokeStyle = '#ffffff';
    gCtx.stroke()
}

function getCanvas() {
    return gCanvas;
}

//  Text //

function onType(txt) {
    if (!isCanvas()) return
    console.log('rendering on Canvas: ', txt);
    updateTxtLine(txt)
    renderCanvas()
}
function onChangeFont(font) {
    if (!isCanvas()) {
        document.querySelector('#fonts').value = 'Impact';
        return
    }
    ChangeFont(font)
    renderCanvas()
}

function onPlusFont(diff) {
    if (!isCanvas()) return
    plusFont(diff)
    renderCanvas()
}

function onChangeColor() {
    if (!isCanvas()) {
        document.querySelector('[name=text-outline-color]').value = '#000000'
        document.querySelector('[name=text-fill-color]').value = '#ffffff'
        return
    }
    var outLineColor = document.querySelector('[name=text-outline-color]').value
    var fillColor = document.querySelector('[name=text-fill-color]').value
    console.log('outLineColor, fillColor', outLineColor, fillColor)
    const SelectedColor = { outLineColor: outLineColor, fillColor: fillColor }
    changeColor(SelectedColor)
    renderCanvas()
}

function onAddText() {
    if (!isCanvas()) return
    addText(gCanvas.height, gCanvas.width)
    RenderSelectedLine()
    renderCanvas();
}

function onDeleteText() {
    if (!isCanvas()) return
    deleteText();
    cleanTxtLine();
    renderCanvas();
}

function onTextAlign(align) {
    if (!isCanvas()) return
    textAlign(align)
    renderCanvas()
}

function onChangeLineIdx() {
    if (!isCanvas()) return
    changeLineIdx()
    RenderSelectedLine()
}

function RenderSelectedLine() {
    var selectedLine = getSelectedLine()
    // render Text
    document.querySelector('[name=text]').value = selectedLine.txt;
    // document.querySelector('[name=text]').focus();
    // render Color
    document.querySelector('[name=text-outline-color]').value = selectedLine.color.outLineColor
    document.querySelector('[name=text-fill-color]').value = selectedLine.color.fillColor
    document.querySelector('#fonts').value = selectedLine.font
}

function cleanTxtLine() {
    document.querySelector('[name=text]').value = '';
    // document.querySelector('[name=text]').focus();
}

// SAVED & LOAD MEME //

function onSaveMeme() {
    if (!isCanvas()) return
    saveMeme(gMeme, gCanvas)
}

// function onLoadMeme() {
//     gMeme = loadMeme()
//     renderCanvas()
// }

function loadSavedMeme(meme) {
    gMeme = meme;
    cleanTxtLine();
    renderCanvas()
}

