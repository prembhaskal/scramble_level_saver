export interface Spellathon {
    sixLetters: string;
    centerLetter: string;
  }
  
  export interface Scramble {
    words: string[];
    circledLetters: number[][];
    sentence: string;
  }
  
  export interface Level {
    level: number;
    spellathon: Spellathon;
    scramble: Scramble;
  }
  