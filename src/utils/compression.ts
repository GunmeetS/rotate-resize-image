import { ResizeOptions, CompressionResult } from '../types';
import { resizeImage } from './resize';

/**
 * Calculate estimated size of base64 data URL in KB
 */
const getDataUrlSizeKB = (dataUrl: string): number => {
  return (dataUrl.length * 0.75) / 1024;
};

/**
 * Compress image to target file size
 */
export const resizeToTargetSize = async (
  file: File,
  targetSizeKB: number,
  options: Omit<ResizeOptions, 'quality'>
): Promise<CompressionResult> => {
  let quality = 0.9;
  let result = '';
  let sizeKB = 0;
  const originalSizeKB = file.size / 1024;
  
  // Binary search for optimal quality
  let minQuality = 0.1;
  let maxQuality = 0.9;
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations && Math.abs(sizeKB - targetSizeKB) > targetSizeKB * 0.05) {
    quality = (minQuality + maxQuality) / 2;
    result = await resizeImage(file, { ...options, quality });
    sizeKB = getDataUrlSizeKB(result);
    
    if (sizeKB > targetSizeKB) {
      maxQuality = quality;
    } else {
      minQuality = quality;
    }
    
    iterations++;
  }
  
  return {
    dataUrl: result,
    sizeKB,
    compressionRatio: originalSizeKB / sizeKB
  };
};

/**
 * Get image info without resizing
 */
export const getImageInfo = (file: File): Promise<{
  width: number;
  height: number;
  sizeKB: number;
  type: string;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.src = reader.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        sizeKB: file.size / 1024,
        type: file.type
      });
    };

    img.onerror = reject;
  });
};
