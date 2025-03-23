interface ScrambleProps {
    data: {
      words: string[];
      circledLetters: number[][];
      sentence: string;
    };
    onChange: (data: {
      words: string[];
      circledLetters: number[][];
      sentence: string;
    }) => void;
  }
  
  export default function ScrambleSection({ data, onChange }: ScrambleProps) {
    const handleWordChange = (index: number, value: string) => {
      const newWords = [...data.words];
      newWords[index] = value;
      onChange({ ...data, words: newWords });
    };
  
    const toggleCircledLetter = (wordIndex: number, letterIndex: number) => {
      const newCircledLetters = [...data.circledLetters];
      if (newCircledLetters[wordIndex].includes(letterIndex)) {
        newCircledLetters[wordIndex] = newCircledLetters[wordIndex].filter(
          (i) => i !== letterIndex
        );
      } else {
        newCircledLetters[wordIndex] = [...newCircledLetters[wordIndex], letterIndex];
      }
      onChange({ ...data, circledLetters: newCircledLetters });
    };
  
    return (
      <div className="mb-8">
        <h2 className="text-xl mb-4">Scramble</h2>
        {data.words.map((word, wordIndex) => (
          <div key={wordIndex} className="mb-4">
            <input
              type="text"
              value={word}
              onChange={(e) => handleWordChange(wordIndex, e.target.value)}
              minLength={5}
              maxLength={10}
              placeholder={`Enter word ${wordIndex + 1}`}
              className="border p-2 rounded mb-2"
            />
            <div className="flex gap-2">
              {word.split('').map((letter, letterIndex) => (
                <button
                  key={letterIndex}
                  onClick={() => toggleCircledLetter(wordIndex, letterIndex)}
                  className={`w-8 h-8 border rounded-full ${
                    data.circledLetters[wordIndex].includes(letterIndex)
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        ))}
        <textarea
          value={data.sentence}
          onChange={(e) => onChange({ ...data, sentence: e.target.value })}
          maxLength={150}
          placeholder="Enter sentence (max 150 characters)"
          className="border p-2 rounded w-full h-32"
        />
      </div>
    );
  }
  