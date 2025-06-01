import { StorageService } from './types';
import { LocalFileSystemStorage } from './local-storage';
import { VercelBlobStorage } from './vercel-blob-storage';

export function getStorageService(): StorageService {
  const storageType = process.env.STORAGE_TYPE || 'local';
  
  switch (storageType) {
    case 'local':
      return new LocalFileSystemStorage();
    case 'vercel-blob':
      return new VercelBlobStorage('levels');
    default:
      throw new Error(`Unknown storage type: ${storageType}`);
  }
} 