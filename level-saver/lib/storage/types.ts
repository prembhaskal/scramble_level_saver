import { Level } from '../../app/types/level';

export interface StorageService {
  /**
   * Save data to storage
   * @param data The data to save
   * @param path The path where to save the data
   * @returns The URL or path where the data was saved
   */
  save(data: Level, path: string): Promise<string>;

  /**
   * Read data from storage
   * @param path The path to read from
   * @returns The data read from storage
   */
  read(path: string): Promise<Level>;

  /**
   * List all files in a directory
   * @param directoryPath The directory path to list files from
   * @returns Array of file paths in the directory
   */
  listFiles(directoryPath: string): Promise<string[]>;

  /**
   * Delete data from storage
   * @param path The path to delete
   */
  delete(path: string): Promise<void>;

  /**
   * Check if data exists at the given path
   * @param path The path to check
   * @returns Whether the data exists
   */
  exists(path: string): Promise<boolean>;
} 