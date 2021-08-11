'use strict'
var gMeme = createMeme();
const gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: []
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: []
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: []
    }
];

function createMeme() {
    return {
        isCanvas: false,
        selectedImgId: false,
        selectedLineIdx: 0,
        isDrag: false,
        lines: [
            {
                txt: '',
                fontSize: 70,
                font: 'Impact',
                textAlign: 'left',
                align: null,
                color: { outLineColor: '#000000', fillColor: '#ffffff' },
                position: { x: 100, y: 100 },
                isDrag: false
            }
        ]
    }
}

function _createLine(linesCount, height, align) {
    console.log(' linesCount', linesCount)
    if (linesCount % 2 === 0) {
        var position = { x: 100, y: 100 + linesCount * 40 }
    } else {
        var position = { x: 100, y: height - 100 - (linesCount - 1) * 40 }
    }
    return {
        txt: '',
        fontSize: 70,
        font: 'Impact',
        textAlign: align,
        align: null,
        color: { outLineColor: '#000000', fillColor: '#ffffff' },
        position,
        isDrag: false
    }
}

function getSelectedImage() {
    var photoIdx = gImgs.findIndex(function (img) {
        return gMeme.selectedImgId === img.id
    })
    return gImgs[photoIdx];
}

function setSelectedImg(photoId) {
    gMeme.selectedImgId = photoId;
}

function updateTxtLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getMeme() {
    return gMeme;
}

function resetMeme() {
    gMeme = createMeme()
}

function isCanvas() {
    return gMeme.selectedImgId;
}

function plusFont(diff) {
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].fontSize
    if (fontSize === 25 || fontSize === 150) return
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function changeColor(color) {  //{ outLineColor: outLineColor, fillColor: fillColor }
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function ChangeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function textAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = align
}

function isLineClicked(clickedPos) {

    var lineIdx = gMeme.lines.findIndex(function (line) {
        console.log('fontSize', line.fontSize)
        console.log('txt.length', line.txt.length)
        return ((clickedPos.x > line.position.x && clickedPos.x < line.position.x + ((line.fontSize / 2) * line.txt.length)) &&
            (clickedPos.y < line.position.y) && (clickedPos.y > (line.position.y - line.fontSize)))
    })
    if (lineIdx === -1) return false;
    gMeme.selectedLineIdx = lineIdx;
    gMeme.lines[lineIdx].isDrag = true;
    gMeme.isDrag = true;
    return true
}

function getDragLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].position.x += dx
    gMeme.lines[gMeme.selectedLineIdx].position.y += dy
}

function setFlaseLineDrag() {
    if (!gMeme.isDrag) return
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false;
    // gMeme.selectedLineIdx = null;
    gMeme.isDrag = false;
}

function addText(height) {
    gMeme.lines.push(_createLine(gMeme.lines.length, height))
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function deleteText() {
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}


function changeLineIdx() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0;
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}