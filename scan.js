var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Word = /** @class */ (function () {
    function Word(word) {
        this.word = word;
    }
    // public is default
    Word.prototype.isValid = function () {
        // TODO: spell check
        return false;
    };
    Word.prototype.toString = function () {
        // TODO:
        return 'I am a word... but what am I?';
    };
    return Word;
}());
var Sentence = /** @class */ (function () {
    function Sentence(words, index) {
        this.words = words;
        this.index = index;
    }
    Sentence.prototype.invalidWords = function () {
        // TODO: return count of invalid words
        return 0;
    };
    Sentence.prototype.mostOccurrences = function () {
        // TODO: return most used word
        return undefined;
    };
    Sentence.prototype.totalValidWords = function () {
        // TODO: return total number valid words
        return undefined;
    };
    Sentence.prototype.totalInvalidWords = function () {
        // TODO: return total number of invalid words
        return undefined;
    };
    Sentence.prototype.totalNumbers = function () {
        // TODO: return total words that are truly numeric (numbers)
        return undefined;
    };
    Sentence.prototype.totalDates = function () {
        // TODO: return total words that are truly dates
        return undefined;
    };
    Sentence.prototype.toString = function () {
        var _a;
        var results = '';
        results += ">>> ".concat(this.index);
        (_a = this.words) === null || _a === void 0 ? void 0 : _a.forEach(function (word) {
            results += word.toString();
        });
        results += "<<< ".concat(this.index);
        return results;
    };
    return Sentence;
}());
var Paragraph = /** @class */ (function () {
    function Paragraph(sentences) {
        this.sentences = sentences;
    }
    Paragraph.prototype.getStats = function () {
        // TODO: return text string of stats (as an example)
        return '<span>A stat</span><span>Another stat</span>';
    };
    Paragraph.prototype.toString = function () {
        // TODO: disassemble a set of sentences
        return undefined;
    };
    return Paragraph;
}());
function onBlur() {
    var input = document.getElementById('textInput').value;
    console.log('You entered', input);
    // Suggestions
    // 1. parse a sentence at a time.
    // 2. for each sented parse each "word" separated by white space
    // 3. construct a sentence object and a array of word objects
    // 4. form into a document and compute    
    var firstSentenceWords = [];
    firstSentenceWords.push(__assign({}, new Word('this')));
    firstSentenceWords.push(__assign({}, new Word('is')));
    firstSentenceWords.push(__assign({}, new Word('a')));
    firstSentenceWords.push(__assign({}, new Word('test')));
    var secondSentenceWords = [];
    secondSentenceWords.push(__assign({}, new Word('I')));
    secondSentenceWords.push(__assign({}, new Word('123')));
    secondSentenceWords.push(__assign({}, new Word('am')));
    secondSentenceWords.push(__assign({}, new Word('1/2/2022')));
    var firstSentence = new Sentence(firstSentenceWords, 1);
    var secondSentence = new Sentence(secondSentenceWords, 2);
    var sentences = [];
    sentences.push(firstSentence);
    sentences.push(secondSentence);
    var paragraph = new Paragraph(sentences);
    console.log('paragraph: toString()', paragraph.toString());
    console.log('sentence 1: toString()', firstSentenceWords.toString());
    console.log('sentence 2: toString()', secondSentenceWords.toString());
    var dictionary = [];
    fetch('https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic').then(function (response) {
        response.body.getReader().read().then(function (results) {
            var words = Utf8ArrayToStr(results.value).split('\n');
            console.log(words);
            dictionary.push.apply(dictionary, words);
            console.log(dictionary.length);
            console.log('aaron?', dictionary.indexOf('aaron') >= 0);
            console.log('aaakdkfdjf', dictionary.indexOf('aaakdkfdjf') >= 0);
        });
    });
}
function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
