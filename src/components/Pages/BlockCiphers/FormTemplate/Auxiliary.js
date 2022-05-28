export const padding = (string) => {
    let paddings = [
        "0",
        "01",
        "0202",
        "030303",
        "04040404",
        "0505050505",
        "060606060606",
        "07070707070707",
        "0808080808080808",
    ];

    let bytes = parseInt(string.length / 2);
    if (parseInt(bytes) % 8 == 0) {
        return string + paddings[8];
    } else {
        return string + paddings[8 - parseInt(bytes % 8)];
    }
}

export const hexList = (blockSize, string) => {
    let hexList = []
    for (let i = 0; i < string.length; i += blockSize) {
        hexList.push(string.substring(i, i + blockSize));
    }
    return hexList;
}

export const inputKey = (string) => {
    let key = []
    for (let i = 0; i < string.length; i += 2) {
        key.push(Number("0x" + string.substring(i, i + 2)));
    }
    return key
}
