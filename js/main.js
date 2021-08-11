'use strict'
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}
var gCtx;
var gCanvas;

function onInit() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    drawText('Choose a photo', 150, 150)

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
    var currImg = getSelectedImage(photoId) // {id url keywords: [])
    gMeme.selectedImgId = currImg.id
    renderCanvas()
}

function drawText(txt, x, y) {
    gCtx.font = '48px serif';
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onType(txt, lineIdx) {
    console.log('rendering on Canvas: ', txt);
    gMeme.lines[lineIdx].txt = txt;
    renderCanvas()
}

function renderCanvas() {
    var currImg = getSelectedImage(gMeme.selectedImgId) // {id url keywords: [])
    drawImgFromLocal(currImg.url)
    drawLines();
}

function drawLines() {
    gMeme.lines.forEach(line => {
        drawText(line.txt, 150, 150)
    });
}

// txt: 'Hello',
// size: 20,
// align: 'left',
// color: 'red'