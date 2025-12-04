import { ValidationResult } from '../types';

export const validateFile = (file: File): ValidationResult => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif'];
  
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type: ${file.type}. Supported types: ${validTypes.join(', ')}` 
    };
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 10MB` 
    };
  }
  
  return { valid: true };
};

export const validateOptions = (options: any): ValidationResult => {
  if (!options.maxWidth || !options.maxHeight) {
    return { valid: false, error: 'maxWidth and maxHeight are required' };
  }

  if (options.maxWidth <= 0 || options.maxHeight <= 0) {
    return { valid: false, error: 'maxWidth and maxHeight must be positive numbers' };
  }

  if (options.quality !== undefined && (options.quality < 0 || options.quality > 1)) {
    return { valid: false, error: 'quality must be between 0 and 1' };
  }

  return { valid: true };
};
