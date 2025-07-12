import { put, del, list } from '@vercel/blob';
import { Level } from '../../app/types/level';
import { StorageService } from './types';

export class VercelBlobStorage implements StorageService {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private getFullPath(path: string): string {
    return this.prefix ? `${this.prefix}/${path}` : path;
  }

  async save(data: Level, path: string, allowOverwrite: boolean = false): Promise<string> {
    const fullPath = this.getFullPath(path);
    const blob = await put(fullPath, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: allowOverwrite,
    });
    return blob.url;
  }

  async read(path: string): Promise<Level> {
    const fullPath = this.getFullPath(path);
    const { blobs } = await list({ prefix: fullPath });
    
    if (blobs.length === 0) {
      throw new Error(`No file found at path: ${path}`);
    }

    const response = await fetch(blobs[0].url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }

    return response.json();
  }

  async listFiles(directoryPath: string): Promise<string[]> {
    const fullPath = this.getFullPath(directoryPath);
    try {
      const { blobs } = await list({ prefix: fullPath });
      return blobs
        .map(blob => blob.pathname.split('/').pop() || '')
        .filter(filename => filename.endsWith('.json'));
    } catch (error) {
      console.error(`Error listing files in ${directoryPath}:`, error);
      // If directory doesn't exist, return empty array
      return [];
    }
  }

  async delete(path: string): Promise<void> {
    const fullPath = this.getFullPath(path);
    const { blobs } = await list({ prefix: fullPath });
    
    if (blobs.length === 0) {
      throw new Error(`No file found at path: ${path}`);
    }

    await del(blobs[0].url);
  }

  async exists(path: string): Promise<boolean> {
    try {
      const fullPath = this.getFullPath(path);
      const { blobs } = await list({ prefix: fullPath });
      return blobs.length > 0;
    } catch {
      return false;
    }
  }
} 