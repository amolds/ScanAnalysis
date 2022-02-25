class Word {
    private word: string

    constructor(word: string) {
        this.word = word;
    }

    // public is default
    public isValid(): boolean {
        // TODO: spell check
        return false;
    }

    toString(): string {
        // TODO:
        return 'I am a word... but what am I?';
    }
}

class Sentence {
    private words: Word[];
    private index: number;

    constructor(words: Word[], index: number) {
        this.words = words;
        this.index = index;
    }

    invalidWords(): number {
        // TODO: return count of invalid words
        return 0;
    }

    mostOccurrences(): Word {
        // TODO: return most used word
        return undefined;
    }

    totalValidWords(): number {
        // TODO: return total number valid words
        return undefined;
    }

    totalInvalidWords(): number {
        // TODO: return total number of invalid words
        return undefined;
    }

    totalNumbers(): number {
        // TODO: return total words that are truly numeric (numbers)
        return undefined;
    }

    totalDates(): number {
        // TODO: return total words that are truly dates
        return undefined;
    }

    toString(): string {
        let results = '';
        results += `>>> ${this.index}`;
        this.words?.forEach((word: Word) => {
            results += word.toString();
        })
        results += `<<< ${this.index}`;

        return results;
    }
}

class Paragraph {
    private sentences: Sentence[];

    constructor(sentences: Sentence[]) {
        this.sentences = sentences;
    }

    getStats(): string {
        // TODO: return text string of stats (as an example)
        return '<span>A stat</span><span>Another stat</span>'
    }

    toString(): string {
        // TODO: disassemble a set of sentences
        return undefined;
    }
}

function onBlur(): void {
    const input = (<any>document.getElementById('textInput')).value;
    console.log('You entered', input);

    // Suggestions
    // 1. parse a sentence at a time.
    // 2. for each sented parse each "word" separated by white space
    // 3. construct a sentence object and a array of word objects
    // 4. form into a document and compute    
    const firstSentenceWords: Word[] = [];
    firstSentenceWords.push(<Word>{...new Word('this')});
    firstSentenceWords.push(<Word>{...new Word('is')});
    firstSentenceWords.push(<Word>{...new Word('a')});
    firstSentenceWords.push(<Word>{...new Word('test')});

    const secondSentenceWords: Word[] = [];
    secondSentenceWords.push(<Word>{...new Word('I')});
    secondSentenceWords.push(<Word>{...new Word('123')});
    secondSentenceWords.push(<Word>{...new Word('am')});
    secondSentenceWords.push(<Word>{...new Word('1/2/2022')});

    const firstSentence: Sentence = new Sentence(firstSentenceWords, 1);
    const secondSentence: Sentence = new Sentence(secondSentenceWords, 2);

    const sentences: Sentence[] = [];
    sentences.push(firstSentence);
    sentences.push(secondSentence);

    const paragraph: Paragraph = new Paragraph(sentences);
    console.log('paragraph: toString()', paragraph.toString());
    console.log('sentence 1: toString()', firstSentenceWords.toString());
    console.log('sentence 2: toString()', secondSentenceWords.toString());



    // TODO: this should be in a service which client can consume through accessor method eg: isValidWord(theWord)
    // 1. think of ways to optimize this - eg is it faster to create 26 buckets based on first character?
    // 2. can you handle mixed case / all caps?  You should normalize the data
    // 3. some words may be top hits - does it make sense to create a small "L1" cache for these?
    let dictionary: Array<string> = [];

    // NOTE: https://github.com/JacobSamro/ngx-spellchecker#:~:text=Simple%20Spellchecker%20is%20a%20spellchecker,a%20list%20of%20valid%20words.
    //       Provides an Angular library for spell check... we reference the endpoint for custom spell check (not in Angular)
    fetch('https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic').then(response => {
        response.body.getReader().read().then(results => {
            const words = Utf8ArrayToStr(results.value).split('\n');
            console.log(words);
            dictionary.push(...words);

            console.log(dictionary.length);

            console.log('aaron?', dictionary.indexOf('aaron') >= 0);
            console.log('aaakdkfdjf', dictionary.indexOf('aaakdkfdjf') >= 0);
        });
    });
}


// NOTE: taken from this site: https://ourcodeworld.com/articles/read/164/how-to-convert-an-uint8array-to-string-in-javascript
function Utf8ArrayToStr(array): string {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
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