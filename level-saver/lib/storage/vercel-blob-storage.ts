import { put, del, list } from '@vercel/blob';
import { StorageService } from './types';

export class VercelBlobStorage implements StorageService {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private getFullPath(path: string): string {
    return this.prefix ? `${this.prefix}/${path}` : path;
  }

  async save(data: any, path: string): Promise<string> {
    const fullPath = this.getFullPath(path);
    const blob = await put(fullPath, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });
    return blob.url;
  }

  async read(path: string): Promise<any> {
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