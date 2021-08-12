'use strict'
var gMeme = createMeme();
const gImgs = [
    {
        id: 1,
        url: 'img/memes/1.jpg',
        keywords: [],
        dimenntion: { type: 'square', width: 500, height: 500 }
    },
    {
        id: 2,
        url: 'img/memes/2.jpg',
        keywords: [],
        dimenntion: { type: 'square', width: 500, height: 500 }
    },
    {
        id: 3,
        url: 'img/memes/3.jpg',
        keywords: [],
        dimenntion: { type: 'square', width: 500, height: 500 }
    }
];

// CREATE MEME

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
                color: { outLineColor: '#000000', fillColor: '#ffffff' },
                position: { x: 100, y: 100 },
                isDrag: false
            }
        ]
    }
}

function _createLine(linesCount, height, width, align) {
    console.log(' linesCount', linesCount)

    if (linesCount % 2 === 0) {
        var y = 100 + linesCount * 40;
    } else {
        var y = height - 100 - (linesCount - 1) * 40;
    }
    if (align === 'left') var x = 100;
    if (align === 'center') var x = width / 2;
    if (align === 'right') var x = width - 100;

    const position = { x: x, y: y };
    return {
        txt: '',
        fontSize: 70,
        font: 'Impact',
        textAlign: align,
        color: { outLineColor: '#000000', fillColor: '#ffffff' },
        position: position,
        isDrag: false
    }
}

// IS BOOLEAN?

function isCanvas() {
    return gMeme.selectedImgId;
}

function isLineClicked(clickedPos) {

    var lineIdx = gMeme.lines.findIndex(function (line) {
        if (line.textAlign === 'left') {
            return (clickedPos.x > line.position.x) && (clickedPos.x < (line.position.x + ((line.fontSize / 2) * line.txt.length))) &&
                (clickedPos.y < line.position.y) && (clickedPos.y > (line.position.y - line.fontSize));
        } else if (line.textAlign === 'center') {
            const helfWordPx = ((line.fontSize / 2) * line.txt.length) / 2;
            return (clickedPos.x > (line.position.x - helfWordPx)) && (clickedPos.x < (line.position.x + helfWordPx)) &&
                (clickedPos.y < line.position.y) && (clickedPos.y > (line.position.y - line.fontSize));
        } else {
            return (clickedPos.x > (line.position.x - ((line.fontSize / 2) * line.txt.length))) & (clickedPos.x < line.position.x) &&
                (clickedPos.y < line.position.y) && (clickedPos.y > (line.position.y - line.fontSize));
        }
    })
    if (lineIdx === -1) return false;
    gMeme.selectedLineIdx = lineIdx;
    gMeme.lines[lineIdx].isDrag = true;
    gMeme.isDrag = true;
    return true
}

// MEME SERVICE

function getMeme() {
    return gMeme;
}

function resetMeme() {
    gMeme = createMeme()
}


//  IMAGE SERVICE

function getSelectedImage() {
    var photoIdx = gImgs.findIndex(function (img) {
        return gMeme.selectedImgId === img.id
    })
    return gImgs[photoIdx];
}

function setSelectedImg(photoId) {
    gMeme.selectedImgId = photoId;
}

// TEXT SERVICE

function updateTxtLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
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

function addText(height, width) {
    gMeme.lines.push(_createLine(gMeme.lines.length, height, width, gMeme.lines[gMeme.selectedLineIdx].textAlign))
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