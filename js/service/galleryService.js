'use strict'

var gImgs = createImgs();

//  CREATE IMGS //

function createImgs() {
    var imgs = [];
    for (var i = 0; i < 18; i++) {
        const img = {
            id: i + 1,
            url: `img/memes/${i + 1}.jpg`,
            keywords: [],
            dimenstion: { type: 'square', width: 500, height: 500 }
        }
        imgs.push(img);
    }
    return imgs;
}

function getSelectedImage() {
    var meme = getMeme();
    if (!meme) return
    var photoIdx = gImgs.findIndex(function (img) {
        return meme.selectedImgId === img.id
    })
    return gImgs[photoIdx];
}

function getImgs() {
    return gImgs;
}