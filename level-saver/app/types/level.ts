
export interface Spellathon {
  sixLetters: string;
  centerLetter: string;
  description: string;
}

export interface Scramble {
  words: string[];
  circledLetters: number[][];
  sentence: string;
}

export interface Answers {
  ans: string;
}

export interface Level {
  level: number;
  spellathon: Spellathon;
  scramble: Scramble;
  answers: string;
}

export interface FormData {
  spellathon: Spellathon;
  scramble: Scramble;
  answers: Answers;
}