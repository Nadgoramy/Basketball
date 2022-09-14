declare global {
    interface String {
        removeSpaces(): String;
        someWords(n: number): String;
    }
}

String.prototype.removeSpaces = function () {
    return this.trim().replace(/\s{2,}/g, ' ');
}

String.prototype.someWords = function (n: number) {
    return this.removeSpaces().split(' ', n).join(' ');
}

export { }