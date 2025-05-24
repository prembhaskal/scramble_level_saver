import { StorageService } from './types';
import { LocalFileSystemStorage } from './local-storage';

export function getStorageService(): StorageService {
  const storageType = process.env.STORAGE_TYPE || 'local';
  
  switch (storageType) {
    case 'local':
      return new LocalFileSystemStorage();
    case 'vercel-blob':
      // TODO: Implement Vercel Blob storage
      throw new Error('Vercel Blob storage not implemented yet');
    default:
      throw new Error(`Unknown storage type: ${storageType}`);
  }
} 