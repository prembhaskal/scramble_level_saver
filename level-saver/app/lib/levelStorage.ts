import { getStorageService } from '@/lib/storage';
import { Level } from '../types/level';

const LEVELS_DIR = 'levels';

export async function getAllLevels(): Promise<Level[]> {
  const storage = getStorageService();
  try {
    // For Vercel Blob, we need to list all files in the directory
    const files = await storage.read(LEVELS_DIR);
    return files.sort((a: Level, b: Level) => a.level - b.level);
  } catch (error) {
    // If the directory doesn't exist, return an empty array
    if (error instanceof Error && error.message.includes('No file found')) {
      return [];
    }
    throw error;
  }
}

export async function getLastLevel(): Promise<number> {
  const levels = await getAllLevels();
  if (levels.length === 0) return 0;
  return Math.max(...levels.map(level => level.level));
}

export async function saveLevel(levelData: Level): Promise<Level> {
  const storage = getStorageService();
  
  // Validate level data
  if (!validateLevel(levelData)) {
    throw new Error('Invalid level data');
  }

  const filename = `level_${levelData.level}.json`;
  await storage.save(levelData, `${LEVELS_DIR}/${filename}`);
  return levelData;
}

export async function getLevel(levelId: number): Promise<Level | null> {
  const storage = getStorageService();
  try {
    return await storage.read(`${LEVELS_DIR}/level_${levelId}.json`);
  } catch (error) {
    console.error("error in getLevel ", error);
    return null;
  }
}

export async function updateLevel(levelId: number, levelData: Level): Promise<Level> {
  const storage = getStorageService();
  
  if (!validateLevel(levelData)) {
    throw new Error('Invalid level data');
  }

  const filename = `level_${levelId}.json`;
  await storage.save(levelData, `${LEVELS_DIR}/${filename}`);
  return levelData;
}

export async function deleteLevel(levelId: number): Promise<void> {
  const storage = getStorageService();
  await storage.delete(`${LEVELS_DIR}/level_${levelId}.json`);
}

function validateLevel(level: Level): boolean {
  if (!level.level) return false;
  if (!level.spellathon?.sixLetters || level.spellathon.sixLetters.length !== 6) return false;
  if (!level.spellathon?.centerLetter || level.spellathon.centerLetter.length !== 1) return false;
  if (!level.scramble?.words || level.scramble.words.length !== 4) return false;
  if (!level.scramble?.circledLetters || level.scramble.circledLetters.length !== 4) return false;
  if (level.scramble.sentence && level.scramble.sentence.length > 150) return false;
  
  return true;
} 