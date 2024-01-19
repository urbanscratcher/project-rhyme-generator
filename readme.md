# A Rhyme Generator
- This is a personal project on making a rhyme generator based on phonetics
- This is to learn a process of solving problems on data structue and building algorithms
- All codes are written by myself

## Introduction
- My algorithm works in two main steps: parsing and searching, to find phonetic rhymes of words.
- It converts a user input word to phonemes and scans through the pre-processed dictionaries to find proper matches. That is, when you type in a word, the algorithm breaks it down into its phonemes, like sounds of vowels and consonants.
- Then, it checks these phonemes against a pre-processed dictionary of phonetic words that already have their sounds broken down, to see if there is a match. The actual search looks at the phonemes from the end of the word, trying to find similar chunks of characters in the dictionary.
- If matches are found, the corresponding words are shown. 

## Demo Video
[ADS.webm](https://github.com/urbanscratcher/project-rhyme-generator/assets/17016494/af613744-67bf-42ae-9101-3ee9beb33e85)

## An explanation of the original algorithms in non-technical language
- Imagine you're looking for words that sound alike at the end, like "rhyme." To do this, we first break down every word into its sounds, distinguishing between vowels and consonants. This is called 'phonetic parsing,' and we do it in advance for a whole list of words, creating a kind of dictionary with the sounds of each word.
Once that's done, you can enter a word, and the system remembers it. The algorithm then takes this word and dissects it to figure out how it ends. It looks for the last vowel sound and any accompanying consonants, assuming that vowels act as anchor points for rhymes.
- The algorithm scans through the sounds of the word from the end until it finds a vowel. For example, for the word 'cat,' it identifies the ending sound as 'æt.' Then, it compares this sound with the sounds in the pre-processed dictionary, finding words with similar endings like 'hat,' 'mat,' and 'sat.'
- This process repeats for every word in the dictionary, compiling a list of potential rhymes. After looking at all the words, the algorithm gives you the final list. However, I set criteria that if the number of the result is too small, less than 5, it searches again by increasing phonemes to be matched.
- In summary, the whole program has ten steps: 1) preparing the data, 2) getting your input, 3) identifying the phonemes of your word and rhyme (the most important algorithm that can be seen in Section 3-1.), 4) matching phonemes, 5) compiling a list, 6) going through all words, 7) finalizing the rhyme list, 8) determining further search based on criteria, 9) giving you the results, and 10) ending the system.

## Whole Structure of Source Code in Sequence
- Although flowcharts will be helpful, to organize this massive project at a glance, I divided parts as below. I applied some principles of functional programming.
- In step 8, the program ultimately starts by calling two main functions: 1) preparation of data and 2) processing input and search.
1. Stack Class
- Implements a basic stack data structure used for managing phoneme sequences.
2. File Reading and Data Preparation
- Utilizes util.promisify to read files asynchronously.
- Reads phonetic dictionary, phonetic symbols, and wordlist files to prepare basic dictionary data.
3. Data Structures
- phonemesDictArray: Array of headwords and corresponding phoneme stacks.
- vowelSymbolsArray: Array of vowel symbols.
- rhymeDictArray: Array of headwords, rhyme strings, and phoneme counts.
4. Subroutine Functions
- Includes utility functions like splitTextlines, splitTabs, getUserInput, and excludeElement
5. Lv1 Procedural Functions
- Mainly functions for processing arrays, such as makePhonemesDictionary, makeWordlist, and makeSymbolsDictionary
- identifyRhyme: Determines the rhyme string for a given phoneme stack.
- getMatchedRhymeDicts: Filters rhyme dictionaries based on rhyme string and phoneme count.
- getMeaningfulWords: Filters meaningful words from the word list based on matched rhyme dictionaries.
6. Lv2 Procedural Functions
- Mainly higher-level functions that call Lv1 functions, such as getPhonemesDictionary, getWordlist, getSymbolsDictionary, getVowelSymbols, and makeRhymeDictionary
7. Lv3 Procedural Functions
- Major procedures that handle data preparation and the search process, such as prepareData, processUserInput, setSearchParams, loopSearch, getSearchedWords, getPhonemesOf, getMoreSearchedWords, printOutput, showResult, and searchMoreOrEnd
8. Execution
- Calls prepareData to initialize data structures.
- Calls processSearch to get user input, search for rhyming words, and display the results

## A list of the data structures to be used
### Non-primitive data structures
1. Arrays
- Generally, arrays are used for storing and manipulating collections of data. In my JavaScript code, arrays are implemented using dynamic arrays, which allows for flexible resizing as elements are added or removed. This is crucial for efficiently handling the changing size of data, such as the phonemes for each word in the phonetic dictionary. Also, by using arrays, the searching process is conveniently conducted because of easy access.
2. Stacks
- Stacks are implemented by creating a ‘Stack’ class by using dynamic arrays in JavaScript. Stacks are utilized to make a string of phonetic rhyme. The LIFO (Last In, First Out) nature of stacks aligns well with the phonetic parsing process, where finding the vowel phoneme from the last is crucial for identifying rhymes. I use push and pop methods for this.

### Primitive data structures
1. Integers
- Integers are used to represent counts, such as the number of phonemes in a word or the phonetic count in the rhyme dictionary. Numbers in JavaScript are versatile and suitable for these counting purposes.
2. String
- Strings are employed to store words, phonemes, and rhyme strings. They are fundamental for representing textual data and are well-suited for tasks involving word manipulations, comparisons, and identification of phonetic patterns.
3. Boolean
- Booleans are used for logical conditions, such as checking if a word rhyme is found or if additional search iterations are needed. They provide a simple and effective way to make decisions based on the success or failure of certain operations.
4. Undefined in JS
- In JavaScript, undefined is used to represent the absence of a value. It can be employed to handle cases where certain data is expected but might not be present. For instance, if the phoneme stack of an input word is not found in the dictionary, the function may return undefined.



## Limitations and Suggestion of remedies
1. No consideration of multiple vowel sounds of rhymes
- Shortcoming: The current implementation assumes that rhymes are identified by one last vowel sound only, which may not cover cases where multiple vowels or syllables contribute to the rhyme.
- Remedy: 
If the rhyme identification algorithm is improved with the consideration of multiple vowels, a more comprehensive rhyme matching process can be done. However, as data becomes more complex, it is also necessary to consider how to output them.

2. No consideration of position (e.g. catXXX, XXXcatXXX)
- Shortcoming: The algorithm does not account for variations in the position of rhyming sounds within words, potentially missing certain rhyme patterns.
- Remedy: 
The rhyme identification algorithm should be modified to recognize and account for different positions of rhyming sounds within words.

3. Limits of the CMU dictionary
- Shortcoming: The algorithm relies on a ready-made dictionary, the CMU pronouncing dictionary; it might not find a proper rhyme to humans. This dictionary maps pronunciations through a limited set of phonemic symbols, but there can always be exceptions to this rule. If the dictionary is wrong, the accuracy of the results cannot be ensured. Additionally, for words that are not registered in the dictionary, the pronunciation cannot be properly tracked. Also, since the algorithm pre-process the dictionary and stores all data in memory, an issue of space and time complexity can happen.
- Remedy: 
Fortunately, the CMU site says that you can obtain a phoneme list through a speech file in case a word is not in the dictionary (http://www.speech.cs.cmu.edu/tools/lextool.html). If these tools or AI voice recognition are used, the range of words that can be searched will expand and accuracy will increase. The complexity issues can be solved by providing proper data from a server as API.

4. Lack of control in maximum number of output
- Shortcoming: The source code I wrote lacks explicit control over the maximum number of rhyme outputs, potentially leading to longer execution times for larger datasets.
- Remedy: If more functions like pagination to control the maximum number of rhyme outputs are implemented, it could prevent excessive search times and improve the responsiveness of the algorithm.

5. Lack of handling wrong input (edge cases)
- Shortcoming: The code may not handle edge cases and invalid inputs gracefully, potentially leading to unexpected behavior or errors.
- Remedy: When a more sophisticated validation mechanism is implemented, to handle edge cases, it can provide informative messages to users, thus preventing unintended consequences.

6. Potential stack overflows for recursive functions
- Shortcoming: Although I set a limit, the recursive function, such as the looping search process, may lead to a stack overflow for a large number of iterations.
- Remedy: The recursion can be optimized by using advanced techniques.

7. Lack of detailed error handling
- Shortcoming: The code may not handle runtime errors or exceptions adequately.
- Remedy: Implement robust error handling mechanisms, including try-catch blocks, to gracefully handle runtime errors and provide meaningful error messages for debugging.

## Pseudocode of the essential part
~~~
Identification of Rhyme
function IDENTIFY-RHYME(S, n, A)
// S is a stack of the phonemes
// n is the length of S
// A is an array of all vowel phonemes

// Initialize
	new Stack T			// a temporary stack
tempSize  0			// a size(integer) of temporary stack
phone  ""			// a string
isPhoneVowel  FALSE	// a boolean

// Iterate over the phonemes stack to find the last chunk of phonemes
	for i=n-1 downto 0 do
		phone POP[S]
		PUSH[S, T]
		tempSize  tempSize+1
		for j=0 to n-1
			if A[j]= phone then
				isPhoneVowel  TRUE 
				break
			end if
		end for
		if isPhoneVowel=TRUE then
			break
		end if
	end for
	if isPhoneVowel=TRUE then
		for k=tempSize-1 downto 0 do
			checekdPhone""		// a string
			checekdPhonePOP[T]
			PUSH[checekdPhone]
			if not EMPTY[T] then
				phonephone+checkedPhone
end if
end for
return phone
end if
return phone
end function
~~~

## Resources
- English words list: https://introcs.cs.princeton.edu/java/data/wordlist.txt
- Phonemes of Words: CMU Dictionary
(table from the CMU Dictionary website)
* Note that I converted all words in the CMU dictionary into dynamic arrays as well as processed rhymes for each word. Since the word in CMU dictionary is outdated and some strange words, the results were filtered through the Princeton English words list.
