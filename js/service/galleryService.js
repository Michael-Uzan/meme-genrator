'use strict'

var gImgs = createImgs();
var gSearchStr = '';
var gUrlUploadImg = '';


// KEYWORDS //

gImgs[0].keywords = ['trump', 'angry', 'told you', 'america', 'usa', 'politics'];
gImgs[1].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny', 'happy', 'laugh', 'joke'];
gImgs[2].keywords = ['trump', 'angry', 'told you', 'america', 'usa', 'bill blineton', 'politics'];
gImgs[3].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny'];
gImgs[4].keywords = ['cute', 'baby', 'babies', 'kids', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[5].keywords = ['america', 'usa', 'politics', 'ביבי'];
gImgs[6].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great', 'funny', , 'laugh', 'joke'];
gImgs[7].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'funny', 'happy', 'laugh', 'joke'];
gImgs[8].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great',];
gImgs[9].keywords = ['trump', 'told you', 'america', 'funny', 'usa', 'happy', 'laugh', 'joke'];
gImgs[10].keywords = ['animals', 'fish', 'funny', 'sea', 'water'];
gImgs[11].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[12].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'funny', 'laugh', 'joke', 'happy', 'drinks']
gImgs[13].keywords = ['told you', 'yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'told you']
gImgs[14].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'told you']
gImgs[15].keywords = ['sucess', 'victory', 'winner', 'respect', 'nice', 'good work', 'great', 'funny', 'happy', 'laugh', 'joke']
gImgs[16].keywords = ['politics', 'sucess', 'victory', 'winner', 'respect', 'nice', 'good work', 'great', 'funny', 'happy', 'laugh', 'joke', 'america', 'usa']
gImgs[17].keywords = ['little', 'no', 'stop', 'movies', 'kids']
gImgs[18].keywords = ['no', 'stop', 'crzy', 'funny', 'stop']
gImgs[19].keywords = ['animals', 'funny', 'lama', 'stupid', 'look']
gImgs[20].keywords = ['animals', 'funny', 'stupid', 'look', 'cat', 'dogs']
gImgs[21].keywords = ['animals', 'funny', 'angry', 'stupid', 'look', 'birds']
gImgs[22].keywords = ['america', 'funny', 'happy', 'love', 'laugh', 'joke'];
gImgs[23].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great', 'funny', , 'laugh'];
gImgs[24].keywords = ['angey', 'cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great', 'funny', , 'laugh'];
gImgs[25].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies'];
gImgs[26].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies'];
gImgs[27].keywords = ['cute', 'baby', 'babies', 'kids', 'nice', 'good work', 'great', 'funny', , 'laugh'];
gImgs[28].keywords = ['animals', 'funny', 'dog', 'cute', 'stupid'];
gImgs[29].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great', 'america'];
gImgs[30].keywords = ['told you', 'funny', 'happy']
gImgs[31].keywords = ['victory', 'i did it', 'sucess', 'winner', 'win']
gImgs[32].keywords = ['trump', 'potin', 'angry', 'told you', 'america', 'usa', 'politics', 'victory', 'i did it', 'sucess', 'winner', 'win']
gImgs[33].keywords = ['dogs', 'cats', 'cute', 'animals', 'puppy', 'puppies', 'baby', 'babies', 'kids', 'sleep'];
gImgs[34].keywords = ['bush', 'trump', 'angry', 'told you', 'america', 'usa', 'politics', 'victory', 'i did it', 'sucess', 'winner', 'win'];
gImgs[35].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'good work', 'great'];
gImgs[36].keywords = ['ביבי', 'told you', 'america', 'usa', 'politics', 'victory', 'i did it', 'sucess', 'winner', 'win'];
gImgs[37].keywords = ['בנט', 'told you', 'america', 'usa', 'politics', 'victory', 'i did it', 'sucess', 'winner', 'win'];
gImgs[38].keywords = ['yes', 'i did it', 'sucess', 'victory', 'respect', 'nice', 'funny', 'sucess', 'winner', 'win'];

//  CREATE IMGS //

function createImgs() {
    var imgs = [];
    for (var i = 0; i < 39; i++) {
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

