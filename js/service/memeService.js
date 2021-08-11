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
        selectedImgId: null,
        selectedLineIdx: null,
        isDrag: false,
        lines: [
            {
                txt: '',
                fontSize: 45,
                align: null,
                color: null,
                position: { x: 150, y: 150 },
                isDrag: false
            }
        ]
    }
}

function getSelectedImage() {
    var photoIdx = gImgs.findIndex(function (img) {
        return gMeme.selectedImgId === img.id
    })
    return gImgs[photoIdx];
}

function setSelectedImg(photoId) {
    gMeme.selectedImgId = photoId
}

function updateTxtLine(txt, lineIdx) {
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].txt = txt;
}

function getMeme() {
    return gMeme;
}

function resetMeme() {
    gMeme = createMeme()
}

function isCanvas() {
    return gMeme.selectedImgId
}

function plusFont(diff) {
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].fontSize
    if (fontSize === 0 || fontSize === 150) return
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function isLineClicked(clickedPos) {

    var lineIdx = gMeme.lines.findIndex(function (line) {
        console.log('fontSize', line.fontSize)
        console.log('txt.length', line.txt.length)
        return ((clickedPos.x > line.position.x && clickedPos.x < line.position.x + ((line.fontSize / 2) * line.txt.length)) &&
            (clickedPos.y < line.position.y) && (clickedPos.y > (line.position.y - line.fontSize)))
    })
    if (lineIdx === -1) return false;
    // setFlaseLineDrag(true, lineIdx)
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

