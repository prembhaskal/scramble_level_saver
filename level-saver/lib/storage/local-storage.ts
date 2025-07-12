import fs from 'fs/promises';
import path from 'path';
import { Level } from '../../app/types/level';
import { StorageService } from './types';

export class LocalFileSystemStorage implements StorageService {
  private baseDir: string;

  constructor(baseDir: string = 'data') {
    this.baseDir = baseDir;
  }

  private getFullPath(filePath: string): string {
    return path.join(process.cwd(), this.baseDir, filePath);
  }

  async save(data: Level, filePath: string): Promise<string> {
    const fullPath = this.getFullPath(filePath);
    
    // Ensure the directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    // Write the file
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
    
    return filePath;
  }

  async read(filePath: string): Promise<Level> {
    const fullPath = this.getFullPath(filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(content);
  }

  async listFiles(directoryPath: string): Promise<string[]> {
    const fullPath = this.getFullPath(directoryPath);
    try {
      const files = await fs.readdir(fullPath);
      return files.filter(file => file.endsWith('.json'));
    } catch (error) {
      console.error(`Error listing files in ${directoryPath}:`, error);
      // If directory doesn't exist, return empty array
      return [];
    }
  }

  async delete(filePath: string): Promise<void> {
    const fullPath = this.getFullPath(filePath);
    await fs.unlink(fullPath);
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      const fullPath = this.getFullPath(filePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
} 