
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

export interface LoopTheLoop {
  grid?: string[][]; // Optional 7x7 grid where each cell is "", "0", "1", "2", or "3"
}

export interface Level {
  level: number;
  spellathon: Spellathon;
  scramble: Scramble;
  answers: string;
  loopTheLoop?: LoopTheLoop;
}

export interface FormData {
  spellathon: Spellathon;
  scramble: Scramble;
  answers: Answers;
  loopTheLoop: LoopTheLoop;
}