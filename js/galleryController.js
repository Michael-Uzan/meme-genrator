'use script'

function onInitImgs() {
    renderImgs()
}

// RENDER IMGS //

function renderImgs() {
    var imgs = getImgs();
    if (!imgs.length) {
        document.querySelector('.no-search-items').style.display = 'block';
        document.querySelector('.photos-container').style.display = 'none';
    } else {
        document.querySelector('.no-search-items').style.display = 'none';
        document.querySelector('.photos-container').style.display = 'grid';
        var strHTML = '';
        imgs.forEach((img) => {
            strHTML += `<a href="#top"><img onclick="onSelectImage(${img.id})" src="img/memes/${img.id}.jpg"></a>\n`
        });
        document.querySelector('.photos-container').innerHTML = strHTML;
    }
}

// SELECT IMG AND MOVE TO EDITOR

function onSelectImage(photoId) {
    gIsUpload = false;
    onChangeTab('editor');
    var navEl = document.querySelector('.active-img')
    activeNav(navEl)
    resetMeme();
    cleanTxtLine();
    setSelectedImg(photoId);
    renderCanvas();
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
        document.querySelector('[name=serch-input]').value = '';
        search('') // display all photos
        renderImgs()
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

// SEARCH //

function onSearch() {
    var strSearch = document.querySelector('[name=serch-input]').value.toLowerCase()
    search(strSearch)
    renderImgs()
}

function setWordSearch(wordSearch) {
    search(wordSearch)
    renderImgs()
}
