'use strict'
// let gIsChangeTextSize;
// let handleSize = 15;

var gMeme;// = createMeme();
const gStickers = ['img/stickers/S1.png', 'img/stickers/S2.png', 'img/stickers/S3.png'];


// CREATE MEME

function _createMeme(canvas) {
    var line = _createLine(0, canvas.height, canvas.width, 'left', false, 0)
    return {
        id: '',
        canvasImg: '',
        isCanvas: false,
        selectedImgId: false,
        selectedLineIdx: 0,
        isDrag: false,
        lines: [line],
    }
}

function _createLine(linesCount, height, width, align, isStiker = false, id) {
    if (linesCount % 2 === 0) {
        var y = height / 8 + linesCount * 40;
    } else {
        var y = height - height / 8 - (linesCount - 1) * 40;
    }
    if (align === 'left') var x = (width / 10);
    if (align === 'center') var x = width / 2;
    if (align === 'right') var x = width - (width / 10);

    const position = { x: x, y: y };
    return {
        txt: 'txt here',
        fontSize: height / 7.5,
        font: 'Impact',
        textAlign: align,
        color: { outLineColor: '#000000', fillColor: '#ffffff' },
        position: position,
        isDrag: false,
        isStiker: (isStiker) ? _createStiker(height, width, id) : false
    }
}

function _createStiker(height, width, id) { //stiker.widthX, stiker.heightY
    return {
        position: { x: width / 3, y: height / 3 },
        // isDrag: false,
        url: gStickers[id],
        widthX: (width / 5),
        heightY: (height / 5)
    }
}

// IS BOOLEAN?

function isCanvas() {
    return gMeme; ///////////////////////////////////////////////////////////
}

// function isStikerClicked(clickedPos) {
//     if (!gMeme) return false;
//     var stikerIdx = gMeme.stikers.findIndex(function (stiker) {
//         return (clickedPos.x > stiker.position.x) && (clickedPos.x < stiker.widthX)
//             && (clickedPos.y > stiker.heightY) && (clickedPos.y < stiker.heightY)
//     })

// }

function isLineClicked(clickedPos) {
    if (!gMeme) return false;

    var lineIdx = gMeme.lines.findIndex(function (line) {
        if (!line.isStiker) {
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
        } else if (line.isStiker) {
            return (clickedPos.x > line.isStiker.position.x) && (clickedPos.x < (line.isStiker.position.x + line.isStiker.widthX))
                && (clickedPos.y > line.isStiker.position.y) && (clickedPos.y < (line.isStiker.position.y + line.isStiker.heightY))
        }
    })
    if (lineIdx === -1) return false;
    gMeme.selectedLineIdx = lineIdx;
    gMeme.lines[lineIdx].isDrag = true;
    gMeme.isDrag = true;
    return true
}

// HANDLE CHECK //

function isHandleClicked(clickedPos) {
    var lineIdx = gMeme.lines.findIndex(function (line) {
        if (!line.isStiker) {
            if (line.textAlign === 'left') {
                return (clickedPos.x < ((line.position.x - 10 + 20)) &&
                    ((clickedPos.y) > (line.position.y - (1 * line.fontSize))))
            } else if (line.textAlign === 'center') {
                return ((clickedPos.x < (20 + (line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize / 2))) &&
                    ((clickedPos.y) > ((line.position.y - (1 * line.fontSize))))));
            } else {
                return ((clickedPos.x < (20 + line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize)) &&
                    ((clickedPos.y) > (line.position.y - (1 * line.fontSize)))))
            }
        } else if (line.isStiker) {
            return ((clickedPos.x < (line.isStiker.position.x + 20))
                && (clickedPos.y < (line.isStiker.position.y + 20)))
        }
    })
    if (lineIdx === -1) return false;
    else return true
}

// MEME SERVICE

function getMeme() {
    return gMeme;
}

function resetMeme() {
    var canvas = getCanvas()
    gMeme = _createMeme(canvas)
}

function setSelectedImg(photoId) {
    gMeme.selectedImgId = photoId;
}

// TEXT SERVICE

function updateTxtLine(txt) {
    // if (!gMeme) gMeme = createMeme();
    if (!gMeme.lines[gMeme.selectedLineIdx].isStiker) {
        gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].txt = txt;
        gMeme.lines[gMeme.selectedLineIdx].isStiker = false;

    }
}

function plusfontStiker(diff) {
    var width = gMeme.lines[gMeme.selectedLineIdx].isStiker.widthX
    var height = gMeme.lines[gMeme.selectedLineIdx].isStiker.heightY

    if ((width < 35 && diff < 0)
        || (width > 250 && diff > 0) || (height < 35 && diff < 0)
        || (height > 250 && diff > 0)) {
        diff = 0;
    }
    gMeme.lines[gMeme.selectedLineIdx].isStiker.widthX += diff
    gMeme.lines[gMeme.selectedLineIdx].isStiker.heightY += diff
}

function plusFont(diff) {
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].fontSize
    if ((fontSize < 25 && diff < 0)
        || (fontSize > 150 && diff > 0)) {
        diff = 0;
    }
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
    var canvas = getCanvas()
    if (align === 'left') var x = (canvas.width / 10);
    if (align === 'center') var x = canvas.width / 2;
    if (align === 'right') var x = canvas.width - (canvas.width / 10);
    gMeme.lines[gMeme.selectedLineIdx].position.x = x; //position: { x: 100, y: 100 },
}

function getDragLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].position.x += dx
    gMeme.lines[gMeme.selectedLineIdx].position.y += dy
}

function moveLineStiker(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].isStiker.position.x += dx
    gMeme.lines[gMeme.selectedLineIdx].isStiker.position.y += dy
}

function setFlaseLineDrag() {
    if (!gMeme.isDrag) return
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false;
    // gMeme.selectedLineIdx = null;
    gMeme.isDrag = false;
}

function addStiker(height, width, id) {
    gMeme.lines.push(_createLine(gMeme.lines.length, height, width, 'left', true, id))
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function addText(height, width) {
    gMeme.lines.push(_createLine(gMeme.lines.length, height, width, gMeme.lines[gMeme.selectedLineIdx].textAlign, false, 0))
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function deleteText() {
    if (gMeme.lines.length === 1) {
        gMeme.lines[gMeme.selectedLineIdx].txt = '';
        return
    }
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


