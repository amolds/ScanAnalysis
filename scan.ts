
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
}