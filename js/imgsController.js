'use script'

function onInitImgs() {
    renderImgs()
}

// RENDER IMGS //

function renderImgs() {
    var imgs = getImgs();
    var strHTML = '';
    imgs.forEach((img, imgIndex) => {
        strHTML += `<img onclick="onSelectImage(${imgIndex + 1})" src="img/memes/${imgIndex + 1}.jpg"></img>\n`
    });
    document.querySelector('.photos-container').innerHTML = strHTML;
}

// SELECT IMG AND MOVE TO EDITOR

function onSelectImage(photoId) {
    resetMeme();
    cleanTxtLine();
    setSelectedImg(photoId);
    renderCanvas();
    onChangeTab('editor');
}

// CHANGED TAB //

function onChangeTab(tab) {
    var gallery = document.querySelector('body .gallery')
    var editor = document.querySelector('body .editor')
    var saved = document.querySelector('body .saved')

    saved.style.display = 'none';
    gallery.style.display = 'none';
    editor.style.display = 'none';
    if (tab === 'editor') {
        editor.style.display = 'flex';
        changeToEditorWindow()
    } else if (tab === 'gallery') {
        gallery.style.display = 'block';
    } else if (tab === 'saved') { saved.style.display = 'block'; }

}

//  RENDER NAV //

function activeNav(navEl) {
    if (navEl.classList.contains('active')) return
    else {
        var elLinks = document.querySelectorAll('header li');
        elLinks.forEach(elLink => {
            if (elLink.classList.contains('active')) elLink.classList.remove('active')
        })
        navEl.classList.add('active');
    }
}

// RIGHT NAV//

function openRightNav() {
    document.querySelector('body').classList.toggle('menu-open');
}
