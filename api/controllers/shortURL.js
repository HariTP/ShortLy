
let arr = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    '4', '5', '6', '7','8', '9',
    'G', 'H', 'I', 'O', 'K', 'L',
    'Y', 'n', 'o', 'p', 'q', 'r',
    's', 'Z', 'u', 'v', 'w', 'x',
    'y', 'z', '0', '1', '2', '3',
    'S', 'T', 'U', 'V', 'W', 'X',
    'A', 'B', 'C', 'D', 'E', 'F',
    'M', 'N', 'J', 'P', 'Q', 'R',
    'm', 't'
  ]

function shortUrl(len) {
    let shortID = "";
    for (let i=0; i<len; i++) {
        shortID+=arr[Math.floor(Math.random() * 62)];
    }
    return shortID;
}

module.exports = shortUrl;