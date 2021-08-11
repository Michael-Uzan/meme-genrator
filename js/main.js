'use strict'

var gCtx;
var gCanvas;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    drawText('Choose a photo', 150, 150)
    addListeners()
}

function addListeners() {
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
    gStartPos = clickedPos
    document.body.style.cursor = 'grabbing'
    // document.querySelector('body').style.cursor = 'grab'
}

function onMove(ev) {
    const line = getDragLine();
    if (!line) return;
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    setFlaseLineDrag()
    document.body.style.cursor = 'auto'
    // document.querySelector('body').style.cursor = 'auto'

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

function drawImgFromLocal(imgUrl) {
    var img = new Image()
    img.src = imgUrl;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend

    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    // }
}

function onSelectImage(photoId) {
    resetMeme()
    setSelectedImg(photoId)
    renderCanvas()
}

function drawText(txt, x, y, size = 100) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px Arial`
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onType(txt, lineIdx) {
    if (!isCanvas()) return
    console.log('rendering on Canvas: ', txt);
    updateTxtLine(txt, lineIdx)
    renderCanvas()
}

function renderCanvas() {
    var currImg = getSelectedImage() // {id url keywords: [])
    drawImgFromLocal(currImg.url)
    drawLines();
}

function drawLines() {
    var meme = getMeme();
    meme.lines.forEach(line => {
        drawText(line.txt, line.position.x, line.position.y, line.fontSize)
    });
}

function onPlusFont(diff) {
    if (!isCanvas()) return
    plusFont(diff)
    renderCanvas()
}