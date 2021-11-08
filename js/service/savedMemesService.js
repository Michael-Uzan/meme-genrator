'use strict'

var gSavedMemes;

const DataBaseKey = 'DataBaseMemes'

function saveMeme(gMeme, gCanvas) {
    gMeme.id = makeId();
    gMeme.canvasImg = gCanvas.toDataURL('image/jpeg', 0.1);
    if (!loadFromStorage(DataBaseKey)) gSavedMemes.savedMemes.push(gMeme);
    else {
        loadMeme()
        gSavedMemes.savedMemes.push(gMeme);
    }
    saveToStorage(DataBaseKey, gSavedMemes)
}

function loadMeme() {
    gSavedMemes = loadFromStorage(DataBaseKey)
    if (!gSavedMemes) gSavedMemes = { savedMemes: [] };
    console.log('gSavedMemes', gSavedMemes)
}

function getSavedMemes() {
    return gSavedMemes.savedMemes;
}

function getSelectedMeme(memeId) {
    var memeIdx = gSavedMemes.savedMemes.findIndex(function (meme) {
        return memeId === meme.id
    })
    return gSavedMemes.savedMemes[memeIdx];
}

function deleteMeme(memeId) {
    var memeIdx = gSavedMemes.savedMemes.findIndex(function (meme) {
        return memeId === meme.id
    })
    gSavedMemes.savedMemes.splice(memeIdx, 1)
    saveToStorage(DataBaseKey, gSavedMemes)
}