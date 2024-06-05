# Rhyme Generator

January 2024

This is a personal project developed for a Data Structures and Algorithms assignment, designed to generate rhymes based on pronunciation.

## Demo
<video src="https://github.com/urbanscratcher/project-rhyme-generator/assets/17016494/af613744-67bf-42ae-9101-3ee9beb33e85" controls ></video>

## Algorithm Summary
The algorithm can be divided into two main stages: parsing and searching for phonetic rhymes.
1. **Parsing**: When a user inputs a word, the algorithm breaks it down into phonemes such as vowels and consonants.
2. **Searching**: It then searches a phonetic dictionary for matching words. The search starts from the end phonemes of each word and looks for the most similar phonetic segments in the entire dictionary. When a match is found, the corresponding word is displayed.

## Algorithm Explanation
- When we think of "rhyme," we usually think of words with similar ending sounds.
- To generate such rhymes, the algorithm first breaks all words down into phonemes, distinguishing between vowels and consonants. This process is called 'phonetic parsing.' A phonetic dictionary is created in advance by parsing a large set of words, with each word having its own set of phonemes.
- When a user inputs a word, the system remembers it. The algorithm breaks this word down to identify the ending phonemes. Here, we assume that vowels act as the key points for rhymes, so we find the last vowel and consonant sounds.
- The algorithm scans the word from the end, searching for phonemes until it encounters a vowel. For example, for the word 'cat,' the ending phoneme is identified as 'æt.' Then it compares this sound with those in the dictionary to find words with similar ending sounds, such as 'hat,' 'mat,' and 'sat.'
- This process is repeated for all words in the dictionary, and the matching words are stored in a list. After scanning all the words, the algorithm outputs the final list.
- If the number of results is too small (fewer than five), the algorithm increases the matching phonemes and searches again.
- In summary, the program consists of ten steps:
   1) Prepare dictionary data
   2) Receive input
   3) Identify word phonemes
   4) Search the dictionary for matching phonemes
   5) Store matches in the rhyme list
   6) Repeat steps 4-5 for all words in the dictionary
   7) Finalize the rhyme list
   8) Decide whether to conduct additional searches based on criteria
   9) Output results
   10) System termination

## Code Structure
- To organize this project at a glance, the parts are divided as follows. Some principles of functional programming are applied.
- The program starts by calling two main functions: 1) data preparation and 2) input processing and search.
1. Stack Class
	- Implement the stack data structure to manage phoneme sequences.
2. File Reading and Data Preparation
	- Use util.promisify to read files asynchronously.
 	- Read phonetic dictionary, phoneme symbols, and word list files to prepare the basic dictionary data.
3. Data Structures
	- `phonemesDictArray`: Array of headwords and corresponding phoneme stacks.
	- `vowelSymbolsArray`: Array of vowel symbols.
	- `rhymeDictArray`: Array of headwords, rhyme strings, and phoneme counts.
4. Subroutine Functions
	- Includes utility functions like `splitTextlines`, `splitTabs`, `getUserInput`, and `excludeElement`
5. Lv1 Procedural Functions
	- Mainly functions for processing arrays, such as `makePhonemesDictionary`, `makeWordlist`, and `makeSymbolsDictionary`
	- `identifyRhyme`: Determines the rhyme string for a given phoneme stack.
	- `getMatchedRhymeDicts`: Filters rhyme dictionaries based on rhyme string and phoneme count.
	- `getMeaningfulWords`: Filters meaningful words from the word list based on matched rhyme dictionaries.
6. Lv2 Procedural Functions
	- Mainly higher-level functions that call Lv1 functions, such as `getPhonemesDictionary`, `getWordlist`, `getSymbolsDictionary`, `getVowelSymbols`, and `makeRhymeDictionary`
7. Lv3 Procedural Functions
	- Major procedures that handle data preparation and the search process, such as `prepareData`, `processUserInput`, `setSearchParams`, `loopSearch`, `getSearchedWords`, `getPhonemesOf`, `getMoreSearchedWords`, `printOutput`, `showResult`, and `searchMoreOrEnd`
8. Execution
	- Calls `prepareData` to initialize data structures.
	- Calls `processSearch` to get user input, search for rhyming words, and display the results

## Data Structures Used
### Non-primitive Data Structures
1. Arrays
	- Generally used to store and manipulate data collections. In JavaScript code, arrays are implemented as dynamic arrays, which can flexibly resize when elements are added or removed. This is useful for handling data like phonemes of each word in the phonetic dictionary, where the size can change. Arrays also allow easy access during the search process.
2. Stacks
	- Implemented in JavaScript by creating a `Stack` class using dynamic arrays. Stacks are used to form phonetic rhyme strings. Stacks have a LIFO (Last In, First Out) characteristic, which can be useful when finding the last vowel phoneme. Methods such as `push` and `pop` are used for this.


### Primitive Data Structures
1. Integer
	- Used to represent counts such as the number of phonemes in a word or the number of phonemes in the rhyme dictionary.
2. String
	- Used to store words, phonemes, and rhyme strings. Strings are a basic data structure for representing text data and are suitable for word manipulation, comparison, and phonetic pattern identification tasks.

3. Boolean
	- Used for logical conditions to check whether a rhyme has been found or if additional search iterations are needed. This allows specific actions to be executed based on the success of certain operations.

4. Undefined
	- In JavaScript, `undefined` is used to represent the absence of a value. It is used to handle cases where specific data is expected but might not exist. For example, if the phoneme stack of an input word is not found in the dictionary, a function might return `undefined`.

## Limitations and Improvements
1. Insufficient Consideration of Multiple Vowel Sounds in Rhymes
- Limitation: The current code assumes that only the last vowel sound identifies the rhyme, excluding cases where multiple vowels or syllables can rhyme.
- Improvement: Improving the rhyme identification algorithm to consider multiple vowels can provide more comprehensive rhyme matching. However, the method to output this more complex data must also be considered.

2. Inability to Identify Rhymes in Different Positions (e.g., catXXX, XXXcatXXX)
- Limitation: This algorithm does not consider rhymes in different positions, potentially missing other rhyme patterns.
- Improvement: Modify the rhyme identification algorithm to recognize and consider various positions of rhyme sounds within words.

3. Limitations of the CMU Dictionary Itself
- Limitation: The algorithm relies on the CMU Pronouncing Dictionary, so it might not find proper rhymes as humans perceive them. The phonemes used in the CMU dictionary are limited and can always have exceptions. If the dictionary is incorrect, the accuracy of the results cannot be ensured. Additionally, for words not registered in the dictionary, pronunciation cannot be properly tracked. The algorithm processes the dictionary data before the program starts and stores all data in memory, leading to space and time complexity issues.
- Improvement: Fortunately, the CMU site mentions that you can obtain a phoneme list through a speech file if a word is not in the dictionary (http://www.speech.cs.cmu.edu/tools/lextool.html). Using such tools or AI voice recognition can expand the range of searchable words and improve accuracy. Complexity issues can be resolved by providing processed dictionary data from a server as an API.

4. Need for Functionality to Control Maximum Rhyme Output
- Limitation: The current source code lacks functionality to control the maximum number of rhyme outputs, potentially leading to long execution times.
- Improvement: Adding features like pagination to control the maximum number of outputs can prevent long search times and improve the algorithm's responsiveness.

5. Insufficient Handling of Invalid Input (Edge Cases)

- Limitation: The code does not handle edge cases and invalid inputs properly, leading to unexpected behavior or errors.
- Improvement: Introducing a sophisticated input validation logic to handle edge cases and provide error messages to users can prevent unintended results.

6. Potential Stack Overflow in Recursive Functions
- Limitation: Although limits are set, the recursive functions in the code (e.g., search process) can lead to stack overflow.
- Improvement: Use optimized recursive function algorithms to address this issue.

7. Insufficient Detailed Error Handling
- Limitation: The code may not handle runtime errors or exceptions adequately.
- Improvement: Implement error handling mechanisms such as try-catch blocks to handle runtime errors and provide debugging error messages.

## Pseudocode of Essential Part
```
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
```
## Resources
- English words list: https://introcs.cs.princeton.edu/java/data/wordlist.txt
- Phonemes of Words: CMU Dictionary
(table from the CMU Dictionary website)
* Note that I converted all words in the CMU dictionary into dynamic arrays as well as processed rhymes for each word. Since the word in CMU dictionary is outdated and some strange words, the results were filtered through the Princeton English words list.
