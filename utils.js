function text_process(text) {
    const regex = /\(([^()]*)\)/;

    let finalText = [text];
    let temp = text;
    let match;

    while ((match = regex.exec(temp)) !== null) {
        //console.log(match);
        temp = temp.replace(match[0], match[1].split('').reverse().join(''));
        //console.log(temp);
        finalText.push(temp);
    }

    return finalText
}

function alternating_caps(text) {
    let alternatingCaps = '';
    let caps = true;
    for (let char of text) {
        if (char.match(/[a-z]/i)) {
            alternatingCaps += caps ? char.toUpperCase() : char.toLowerCase();
            caps = !caps;
        } else {
            //console.log(char);
            alternatingCaps += char;
            if (char === ' ') {
                caps = true;
            }
        }
    }
    return alternatingCaps;
}

function vowel_replacement(text) {
    const replace = new Map([
        ['a', 'e'], ['e', 'i'], ['i', 'o'], ['o', 'u'], ['u', 'a'],
        ['A', 'E'], ['E', 'I'], ['I', 'O'], ['O', 'U'], ['U', 'A']
    ]);
    let finalText = '';
    for (let char of text) {
        //console.log(char);
        if (replace.has(char)) {
            finalText += replace.get(char);
        } else {
            finalText += char;
        }
    }
    return finalText;
}

function unique_words(text) {
    let wordLowerCase = '';
    let finalText = '';
    let words = text.replace(/[^\w\s]/g, '');
    words = words.split(' ');
    //console.log(words);
    const wordsMap = new Map();
    for (const word of words) {
        wordLowerCase = word.toLowerCase();
        // console.log('Antes de '+ word);
        // console.log(wordsMap);
        wordsMap.set(wordLowerCase, (wordsMap.get(wordLowerCase) || 0) + 1);
        // console.log('Después de '+ word);
        // console.log(wordsMap);
    }
    finalText = words.filter(word => wordsMap.get(word.toLowerCase()) === 1);
    return finalText;
}

module.exports = {
    text_process,
    alternating_caps,
    vowel_replacement,
    unique_words
};