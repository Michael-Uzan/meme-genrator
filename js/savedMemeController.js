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
        document.querySelector('.no-saved-items').style.display = 'block';
        document.querySelector('.saved-container').style.display = 'none';
    } else {
        document.querySelector('.no-saved-items').style.display = 'none';
        document.querySelector('.saved-container').style.display = 'grid';
        memes.forEach((meme) => {
            strHTML += `<div>
            <img  src="img/memes/1.jpg"></img>
            <div class="btn-container">
                <button onclick="onSelectMeme('${meme.id}')" class="btn">edit</button>
                <button onclick="onDeleteMeme('${meme.id}')" class="btn">delete</button>
            </div>
        </div>`
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

function onDeleteMeme(memeId) {
    deleteMeme(memeId)
    renderSavedImgs()
}
