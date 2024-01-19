import util from "util";
import fs from "fs";
import readline from "readline";
const readFile = util.promisify(fs.readFile);

// [implementation of abstract data type] --------------------------
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      // console.log("the stack is empty");
      return undefined;
    }
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // peek the top element
  top() {
    if (this.isEmpty()) {
      // console.log("the stack is empty");
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// [variables(data)] --------------------------
// base data
let phonemesDictArray = [];
let wordlistArray = [];
let vowelSymbolsArray = [];
let rhymeDictArray = [];

// user input data
let input = "";
let inputPhonemesStack = undefined;
let inputRhymeString = "";
let currPhonemesCount = 0;

// [subroutine functions] ----------------------------------------
// to split textlines of a text and convert them to a dynamic array
function splitTextlines(text) {
  const lineArray = text.split("\n");
  return lineArray;
}

// to split a tabbed text and convert them to a dynamic array
function splitTabs(text) {
  const tabArray = text.split("\t");
  return tabArray;
}

// to get a user's input from the prompt
async function getUserInput() {
  return new Promise((resolve) => {
    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Type a word: ", (inputText) => {
      readLine.close();
      resolve(inputText.toLocaleLowerCase());
    });
  });
}

// to exclude an element from a dynamic array
function excludeElement(element, array) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const cond = item.toLocaleLowerCase() !== element.toLocaleLowerCase();
    if (cond) {
      newArray[newArray.length] = item;
    }
  }
  return newArray;
}

// [Lv1 procedural functions (mostly processing arrays)] ----------------------------------------
// to make a dynamic array of phonemes from a dynamic array of textlines
function makePhonemesDictionary(textlineArray) {
  const dictionary = [];

  // iterate over textline array to make a unit of the dictionary
  // use linear search algorithm
  for (let i = 0; i < textlineArray.length; i++) {
    const wordArray = [];

    // split the textline array into a headword and a string of phonemes
    const tabArray = splitTabs(textlineArray[i]);
    const headword = tabArray[0];
    const phonemesString = tabArray[1];

    // split a string of phonemes into a dynamic array
    const phonemesArray = phonemesString.split(" ");
    // use stack for phonemes list here
    const phonemesStack = new Stack();
    // convert array to stack
    phonemesStack.items = phonemesArray;

    // insert the headword and phonemes array
    // note that a 2-dimentional array is used here to distinguish the headword and phonemes
    wordArray[0] = headword;
    wordArray[1] = phonemesStack;

    // insert the word array to the last place of the dictionary array
    dictionary[dictionary.length] = wordArray;
  }

  return dictionary;
}

// to split a tabbed text for all elements of an array, and return a new dynamic array
function makeWordlist(array) {
  const wordlistArray = [];
  for (let i = 0; i < array.length; i++) {
    const tabArray = splitTabs(array[i]);
    const word = tabArray[0];
    wordlistArray[wordlistArray.length] = word;
  }
  return wordlistArray;
}

// to make a dynamic array of phonemes symbols and their meanings from a dynamic array of textlines
// procedure is same to makePhonemesDictionary
function makeSymbolsDictionary(textlineArray) {
  const symbolsArray = [];
  for (let i = 0; i < textlineArray.length; i++) {
    const symbolArray = [];

    const tabArray = splitTabs(textlineArray[i]);
    const symbol = tabArray[0];
    const meaning = tabArray[1];

    symbolArray[0] = symbol;
    symbolArray[1] = meaning;

    symbolsArray[symbolsArray.length] = symbolArray;
  }
  return symbolsArray;
}

// to make a rhyme string with the last chunk of phonemes from the stack of phonemes
async function identifyRhyme(phonemesStack, vowelSymbolsArray) {
  let tempStack = new Stack();
  let phonemesString = "";
  let isPhonemeVowel = false;

  for (let i = phonemesStack.size() - 1; i >= 0; i--) {
    const phoneme = phonemesStack.pop();
    tempStack.push(phoneme);

    // linear search to see if the symbols is vowel
    for (let j = 0; j < vowelSymbolsArray.length; j++) {
      isPhonemeVowel = phoneme === vowelSymbolsArray[j];
      if (isPhonemeVowel) {
        break;
      }
    }

    if (isPhonemeVowel) {
      break;
    }
  }

  if (isPhonemeVowel) {
    for (let k = tempStack.size() - 1; k >= 0; k--) {
      const checkedPhoneme = tempStack.pop();
      phonemesStack.push(checkedPhoneme);
      if (checkedPhoneme !== undefined) {
        phonemesString += checkedPhoneme;
      }
    }
    return phonemesString;
  }

  return "";
}

// to get a dynamic array of the matched rhyme dicts
async function getMatchedRhymeDicts() {
  const matches = [];

  for (let i = 0; i < rhymeDictArray.length; i++) {
    const item = rhymeDictArray[i];
    const itemRhymeString = item[1];
    const itemPhonemesCount = item[2];

    const isRhymeFoundInDict =
      itemRhymeString === inputRhymeString &&
      itemPhonemesCount === currPhonemesCount;

    // conditional insertion
    if (isRhymeFoundInDict) {
      matches[matches.length] = item;
    }
  }

  return matches;
}

// to get meaningful words found in the given word list
async function getMeaningfulWords(matchesArray) {
  let newArr = [];

  for (let i = 0; i < matchesArray.length; i++) {
    const dict = matchesArray[i];
    const headword = dict[0];
    const rhymeString = dict[1];
    const phonemesCount = dict[2];

    for (let j = 0; j < wordlistArray.length; j++) {
      const word = wordlistArray[j];
      const cond = word.toLocaleLowerCase() === headword.toLocaleLowerCase();
      if (cond) {
        newArr[newArr.length] = word.toLocaleLowerCase();
      }
    }
  }

  return newArr;
}

// [Lv2 procedural functions (call Lv1/Lv2 functions inside)] ----------------------------------------
// to return a dynamic array of headwords and their phonemes as a dictionary to be searched
async function getPhonemesDictionary() {
  const filePath = "./assets/phonetic_dict.txt";
  try {
    const textData = await readFile(filePath, "utf8");
    const textlineArray = splitTextlines(textData);
    const dictionary = makePhonemesDictionary(textlineArray);
    return dictionary;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

// to return a dynamic array of the given wordlist from the task. We can get more meaningful words by comparing a word in the phonemes dictionary to one in this list
async function getWordlist() {
  const filePath = "./assets/wordlist.txt";
  try {
    const textData = await readFile(filePath, "utf8");
    const textlineArray = splitTextlines(textData);
    const wordlistArray = makeWordlist(textlineArray);
    return wordlistArray;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

// to return a dynamic array of phonemes symbols. This data is needed to find vowel phonemes, which is critical to comprising rhymes
async function getSymbolsDictionary() {
  const filePath = "./assets/phonetic_symbols.txt";
  try {
    const textData = await readFile(filePath, "utf8");
    const textlineArray = splitTextlines(textData);
    const symbolsArray = makeSymbolsDictionary(textlineArray);
    return symbolsArray;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

// to return a dynamic array of vowel symbols from the phonemes symbols dictionary
async function getVowelSymbols(symbolsDictArray) {
  const vowelSymbolsArray = [];

  // linear search
  for (let i = 0; i < symbolsDictArray.length; i++) {
    const symbolArray = symbolsDictArray[i];
    const symbol = symbolArray[0];
    const meaning = symbolArray[1];

    // conditional insertion
    const isVowel = meaning === "vowel";
    if (isVowel) {
      vowelSymbolsArray[vowelSymbolsArray.length] = symbol;
    }
  }

  return vowelSymbolsArray;
}

// to return an dynamic array of a word, its phonetic rhyme string, and the number of phonemes
async function makeRhymeDictionary(phonemesDictArray, vowelSymbolsArray) {
  const phonemesArray = [];

  for (let i = 0; i < phonemesDictArray.length; i++) {
    const item = phonemesDictArray[i];
    const headword = item[0];
    const phonemesStack = item[1];
    const totalPhonemes = phonemesStack.size();

    let rhymeString = "";
    if (!phonemesStack.isEmpty()) {
      rhymeString = await identifyRhyme(phonemesStack, vowelSymbolsArray);
    } else {
      rhymeString = "";
    }

    // insert
    phonemesArray[phonemesArray.length] = [
      headword,
      rhymeString,
      totalPhonemes,
    ];
  }
  return phonemesArray;
}

// to search the rhyme
async function getSearchedWords() {
  const matches = await getMatchedRhymeDicts();
  const meaningfulMatches = await getMeaningfulWords(matches);
  const matchesExcludingInput = excludeElement(input, meaningfulMatches);
  return matchesExcludingInput;
}

// to get the input's phonemes before searching
async function getPhonemesOf(input) {
  let resultStack = new Stack();
  for (let i = 0; i < phonemesDictArray.length; i++) {
    const item = phonemesDictArray[i];
    const headword = item[0].toLocaleLowerCase();
    const phonemesStack = item[1];

    const isInputFoundInDict = headword === input;
    if (isInputFoundInDict) {
      return phonemesStack;
    }
  }

  return undefined;
}

// to loop over the search process if the result is too small(< 5) by adding more phonemes
async function loopSearch() {
  const searchedWords = await getSearchedWords();
  const isFound = searchedWords.length > 0;
  if (isFound) {
    return searchedWords;
  } else {
    console.log(`The rhymes having ${currPhonemesCount} sounds are not found.`);
    if (currPhonemesCount <= 20) {
      console.log("Continue to find similar rhymes...");
      currPhonemesCount += 1;
      return loopSearch();
    } else {
      return [];
    }
  }
}

// to find more words by adding the number of phonemes to be searched
async function getMoreSearchedWords() {
  currPhonemesCount += 1;
  const moreWords = await getSearchedWords();
  return moreWords;
}

// to show output in the console
function printOutput(searchedWords, isAdditionalSearch) {
  if (isAdditionalSearch) {
    console.log("-------------------------------------------");
    console.log(
      `${searchedWords.length} more rhymes having ${currPhonemesCount} phonemes are found`
    );
    console.log("-------------------------------------------");
  } else {
    console.log("-------------------------------------------");
    console.log(
      `${searchedWords.length} rhymes having ${currPhonemesCount} phonemes are found`
    );
    console.log("-------------------------------------------");
  }
  searchedWords.map((item, idx) =>
    console.log(`${idx + 1}. ${item.toLocaleLowerCase()}`)
  );
}

// to get user's input and parse it
async function processUserInput() {
  input = await getUserInput();
  inputPhonemesStack = await getPhonemesOf(input);

  // if the input's phonemes are not found, try again.
  if (!inputPhonemesStack) {
    console.log("The entered word is not valid. Try another one.");
    await processUserInput();
    return;
  }
}

// to set search parameters, such as the number of phonemes and the phonetic string of the input rhyme
async function setSearchParams() {
  currPhonemesCount = inputPhonemesStack.size();
  inputRhymeString = await identifyRhyme(inputPhonemesStack, vowelSymbolsArray);
}

// to present the result and determine if further search is needed
async function showResult(searchedWords) {
  // search until it satisfies criteria
  const searchedWordsLength = searchedWords.length;
  const isWordsFound = searchedWordsLength > 0;
  if (isWordsFound) {
    printOutput(searchedWords, false);
  }

  const needSearchMore = isWordsFound && searchedWordsLength < 5;
  return needSearchMore;
}

// If the result is too small (< 5), search more by adding the number of phonemes until it gets the limit 20
// otherwise, print a message when any word is not found
async function searchMoreOrEnd(isNeedMore) {
  if (isNeedMore) {
    const extraWords = await getMoreSearchedWords();
    const isWordsFound = extraWords.length > 0;

    if (isWordsFound) {
      printOutput(extraWords, true);
    }

    if (isWordsFound && currPhonemesCount <= 20) {
      currPhonemesCount += 1;
      searchMoreOrEnd(isNeedMore);
    }

    if (currPhonemesCount > 20) {
      console.log("-------------------------------------------");
      console.log("Rhymes cannot be found");
      console.log("-------------------------------------------");
      process.exit();
    }
  }
}

// [Lv3 procedural functions (major procedures)] -----------------------------------------
async function prepareData() {
  phonemesDictArray = await getPhonemesDictionary();
  const symbolsDictArray = await getSymbolsDictionary();
  vowelSymbolsArray = await getVowelSymbols(symbolsDictArray);
  rhymeDictArray = await makeRhymeDictionary(
    phonemesDictArray,
    vowelSymbolsArray
  );
  wordlistArray = await getWordlist();
}

async function processSearch() {
  await processUserInput();
  await setSearchParams();
  const searchedWords = await loopSearch();
  const isNeedMore = await showResult(searchedWords);
  await searchMoreOrEnd(isNeedMore);
}

// [call procedures] -----------------------------
prepareData();
processSearch();
