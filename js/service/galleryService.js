'use strict'

var gImgs = createImgs();
var gSearchStr = '';
var gUrlUploadImg = '';

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

//  FILTER SEARCH //

function getImgs() {
    if (gSearchStr === '') return gImgs;
    var filteredImgs = gImgs.filter(function (img) {

        return img.keywords.some(function (word) {
            return word.includes(gSearchStr);
        })

    })
    console.log('filteredImgs', filteredImgs)
    return filteredImgs;
}

// UPDATE SEARCH KEY //

function search(strSearch) {
    gSearchStr = strSearch;
}

// Saving Upload IMG //

function saveUplaodImgURL(imgSrc) {
    console.log('img.src', imgSrc)
    gUrlUploadImg = imgSrc;

}

function getUploadUrlIMG() {
    return gUrlUploadImg
}

// KEYWORDS //

gImgs[0].keywords = ['trump', 'angry', 'told you', 'america', 'usa'];
gImgs[1].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies'];
gImgs[2].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'baby', 'babies', 'kids', 'sleep'];
gImgs[3].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'sleep'];
gImgs[4].keywords = ['cute', 'baby', 'babies', 'kids', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[5].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[6].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great', 'funny', , 'laugh', 'joke'];
gImgs[7].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'america'];
gImgs[8].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great',];
gImgs[9].keywords = ['trump', 'told you', 'america', 'funny', 'usa', 'happy', 'laugh', 'joke'];
gImgs[10].keywords = ['america', 'funny', 'happy', 'love', 'laugh', 'joke'];
gImgs[11].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[12].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'funny', 'laugh', 'joke', 'happy', 'drinks']
gImgs[13].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'told you']
gImgs[14].keywords = ['told you', 'little', 'no', 'stop']
gImgs[15].keywords = ['sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'funny', 'happy', 'laugh', 'joke']
gImgs[16].keywords = ['sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'funny', 'happy', 'laugh', 'joke', 'america', 'usa']
gImgs[17].keywords = ['little', 'no', 'stop', 'movies', 'kids']