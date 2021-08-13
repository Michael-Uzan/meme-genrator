'use strict'

function onInitSaved() {
    loadMeme()
    renderSavedImgs()
}

// RENDER SAVED IMG 

function renderSavedImgs() {
    var memes = getSavedMemes();
    var strHTML = '';
    if (!memes.length) {
        strHTML = `<div class="no-saved-items">
                            <h1>Sorry, no saved memes</h1>
                        </div>`
        document.querySelector('.saved-container').innerHTML = strHTML;
    } else {
        memes.forEach((meme) => {
            strHTML += `
            <img onclick="onSelectMeme('${meme.id}')" src="${meme.canvasImg}"></img>\n`
        });
        document.querySelector('.saved-container').innerHTML = strHTML;
    }
}

function onSelectMeme(memeId) {
    var meme = getSelectedMeme(memeId)
    onChangeTab('editor');
    var navEl = document.querySelector('.active-img')
    activeNav(navEl)
    loadSavedMeme(meme)
}

// function onSelectImage(photoId) {
// }