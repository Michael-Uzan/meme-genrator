'use strict'

var gCtx;
var gCanvas;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsUpload = false;


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
    gCanvas.addEventListener('mouseleave', onUp);
    // Touch
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const clickedPos = getEvPos(ev)
    console.log('pos', clickedPos)
    if (!isLineClicked(clickedPos)) return
    var selectedLine = getSelectedLine()
    if (!selectedLine.isStiker) {
        // line is clicked:
        RenderSelectedLine()
        gStartPos = clickedPos
        document.body.style.cursor = 'grabbing'
    } else if (selectedLine.isStiker) {
        // Stiker is Clicked
        console.log('stiker clicked')
        gStartPos = clickedPos
        document.body.style.cursor = 'grabbing'
        document.querySelector('[name=text]').value = '';
        document.querySelector('[name=text]').placeholder = 'sticker!';
    }


}

function onMove(ev) {
    if (!isCanvas()) return
    const line = getDragLine();
    if (line.isDrag) {
        var pos = getEvPos(ev)
        var dx = pos.x - gStartPos.x
        var dy = pos.y - gStartPos.y
        if (!line.isStiker) {
            moveLine(dx, dy)
            renderCanvas()
        } else if (line.isStiker) {
            moveLineStiker(dx, dy)
            renderCanvas()
        }
        gStartPos = pos
        renderRecEditor(line)
    }
}

function onUp() {
    if (!isCanvas()) return
    renderCanvas()
    setFlaseLineDrag()
    // Render Rec Edit //
    var selectedLine = getSelectedLine()
    renderRecEditor(selectedLine)
    document.body.style.cursor = 'auto'
    if (!selectedLine.isStiker) document.querySelector('[name=text]').placeholder = 'type in something';
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
    if (!gIsUpload) {
        var currImg = getSelectedImage() // {id url keywords: [])
        if (!currImg) {
            drawText('Choose a photo', (gCanvas.height / 5), (gCanvas.height / 5), (gCanvas.height / 10), { outLineColor: '#000000', fillColor: '#ffffff' }, 'Impact', 'start')
            return
        }
        drawImgFromLocal(currImg.url)
    } else {
        var uploadImgURL = getUploadUrlIMG()
        drawImgFromLocal(uploadImgURL)
    }
    drawLines();
}

function drawStiker(stiker) {
    let stikerRender = new Image();
    stikerRender.src = stiker.url;
    stikerRender.onload = () => {
        gCtx.drawImage(stikerRender, stiker.position.x, stiker.position.y, stiker.widthX, stiker.heightY);
    };
}

function drawLines() {
    if (!isCanvas()) return
    var meme = getMeme();
    meme.lines.forEach(line => {
        if (!line.isStiker) {
            drawText(line.txt, line.position.x, line.position.y, line.fontSize, line.color, line.font, line.textAlign)
        } else if (line.isStiker) {
            drawStiker(line.isStiker)
        }
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
    if (!line.isStiker) {
        if (line.txt === '') return
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
    } else {
        drawRect(line.isStiker.position.x, line.isStiker.position.y, line.isStiker.widthX, line.isStiker.heightY)
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
    updateTxtLine(txt)
    renderCanvas()
    // Render Rec Edit //
    var selectedLine = getSelectedLine()
    renderRecEditor(selectedLine)
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
    const SelectedColor = { outLineColor: outLineColor, fillColor: fillColor }
    changeColor(SelectedColor)
    renderCanvas()
}

function onAddText() {
    if (!isCanvas()) return
    addText(gCanvas.height, gCanvas.width)
    RenderSelectedLine()
    renderCanvas();
    // Render Rec Edit //
    var selectedLine = getSelectedLine()
    renderRecEditor(selectedLine)
}

function onAddStiker(id) {
    if (!isCanvas()) return
    addStiker(gCanvas.height, gCanvas.width, id)
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
    renderCanvas()
    // Render Rec Edit //
    var selectedLine = getSelectedLine()
    renderRecEditor(selectedLine)
    document.querySelector('[name=text]').placeholder = 'type n something';
    if (selectedLine.isStiker) {
        document.querySelector('[name=text]').value = '';
        document.querySelector('[name=text]').placeholder = 'sticker!';
    }
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
    var btn = document.querySelector('.btn-save');
    if (gIsUpload) {
        btn.innerText = 'Can\'t!'
        btn.style.color = 'red'
        setTimeout(function () {
            btn.innerText = 'Save'
            btn.style.color = 'white'
        }, 1200)
        return
    }
    btn.innerText = 'Saving!'
    btn.style.color = 'red'
    setTimeout(function () {
        btn.innerText = 'Save'
        btn.style.color = 'white'
    }, 1200)
    renderCanvas()
    saveMeme(gMeme, gCanvas)
}

function loadSavedMeme(meme) {
    gIsUpload = false;
    gMeme = meme;
    cleanTxtLine();
    renderCanvas()
}

// DOWNLOAD CANVAS //

function onDownloadImg(elLink) {
    renderCanvas()
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


// UPLAODING IMG //

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
    resetMeme();
    cleanTxtLine();
    gIsUpload = true;
    // setSelectedImg();
    renderCanvas();

}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        saveUplaodImgURL(img.src) //
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onShareImage() {
    if (!isCanvas()) return
    renderCanvas()
    var imgCanvasToShare = gCanvas.toDataURL('image/jpeg')
    shareImage(imgCanvasToShare)
}

async function shareImage(imgCanvasToShare) {
    const response = await fetch(imgCanvasToShare);
    const blob = await response.blob();
    const filesArray = [
        new File(
            [blob],
            'meme.jpg',
            {
                type: "image/jpeg",
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}
