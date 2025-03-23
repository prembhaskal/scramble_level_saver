import fs from 'fs/promises';
import path from 'path';

const LEVELS_DIR = path.join(process.cwd(), 'data', 'levels');

// Ensure the levels directory exists
export async function ensureLevelsDirectory() {
  try {
    await fs.access(LEVELS_DIR);
  } catch {
    await fs.mkdir(LEVELS_DIR, { recursive: true });
  }
}

export async function getAllLevels() {
  await ensureLevelsDirectory();
  
  const files = await fs.readdir(LEVELS_DIR);
  const levels = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(LEVELS_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
  );

  return levels.sort((a, b) => a.level - b.level);
}

export async function getLastLevel() {
  const levels = await getAllLevels();
  if (levels.length === 0) return 0;
  return Math.max(...levels.map(level => level.level));
}

export async function saveLevel(levelData: any) {
  await ensureLevelsDirectory();
  
  // Validate level data
  if (!validateLevel(levelData)) {
    throw new Error('Invalid level data');
  }

  const filename = `level_${levelData.level}.json`;
  await fs.writeFile(
    path.join(LEVELS_DIR, filename),
    JSON.stringify(levelData, null, 2),
    'utf-8'
  );

  return levelData;
}

function validateLevel(level: any) {
  // Add validation logic here
  if (!level.level) return false;
  if (!level.spellathon?.sixLetters || level.spellathon.sixLetters.length !== 6) return false;
  if (!level.spellathon?.centerLetter || level.spellathon.centerLetter.length !== 1) return false;
  if (!level.scramble?.words || level.scramble.words.length !== 4) return false;
  if (!level.scramble?.circledLetters || level.scramble.circledLetters.length !== 4) return false;
  if (level.scramble.sentence && level.scramble.sentence.length > 150) return false;
  
  return true;
}

export async function getLevel(levelId: number) {
  await ensureLevelsDirectory();
  
  try {
    const content = await fs.readFile(
      path.join(LEVELS_DIR, `level_${levelId}.json`),
      'utf-8'
    );
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export async function updateLevel(levelId: number, levelData: any) {
  await ensureLevelsDirectory();
  
  if (!validateLevel(levelData)) {
    throw new Error('Invalid level data');
  }

  const filename = `level_${levelId}.json`;
  await fs.writeFile(
    path.join(LEVELS_DIR, filename),
    JSON.stringify(levelData, null, 2),
    'utf-8'
  );

  return levelData;
}

export async function deleteLevel(levelId: number) {
  await ensureLevelsDirectory();
  
  try {
    await fs.unlink(path.join(LEVELS_DIR, `level_${levelId}.json`));
    return true;
  } catch (error) {
    throw new Error('Failed to delete level');
  }
}
