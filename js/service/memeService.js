'use strict'

const gImgs = [
    {
        id: 0,
        url: 'img/1.jpg',
        keywords: []
    },
    {
        id: 1,
        url: 'img/2.jpg',
        keywords: []
    },
    {
        id: 2,
        url: 'img/3.jpg',
        keywords: []
    }
];

function getSelectedImage(photoId) {
    var photoIdx = gImgs.findIndex(function (img) {
        return photoId === img.id
    })
    return gImgs[photoIdx];
}
