'use strict'

var gSavedMemes = { savedMemes: [] };
const DataBaseKey = 'DataBaseMemes'

function saveMeme(gMeme) {
    if (!loadFromStorage(DataBaseKey)) gSavedMemes.savedMemes.push(gMeme);
    else {
        gSavedMemes = loadMeme()
        gSavedMemes.savedMemes.push(gMeme);
    }
    saveToStorage(DataBaseKey, gSavedMemes)
}

function loadMeme() {
    gSavedMemes = loadFromStorage(DataBaseKey)
    return gSavedMemes.savedMemes[0]
}