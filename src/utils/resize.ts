import { ResizeOptions } from '../types';

/**
 * Resize and rotate an image
 */
export const resizeImg = (
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number,
  degrees: number = 0,
  quality: number = 0.9,
  format: string = 'image/jpeg'
): string => {
  const imgWidth = img.width;
  const imgHeight = img.height;

  // Calculate scaling factor to maintain aspect ratio
  const widthScale = maxWidth / imgWidth;
  const heightScale = maxHeight / imgHeight;
  const scale = Math.min(widthScale, heightScale, 1); // Don't upscale

  const newWidth = Math.round(imgWidth * scale);
  const newHeight = Math.round(imgHeight * scale);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Adjust canvas size for rotation
  if (degrees % 180 !== 0) {
    canvas.width = newHeight;
    canvas.height = newWidth;
  } else {
    canvas.width = newWidth;
    canvas.height = newHeight;
  }

  // Apply rotation if needed
  if (degrees !== 0) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(img, -newWidth / 2, -newHeight / 2, newWidth, newHeight);
  } else {
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
  }

  return canvas.toDataURL(format, quality);
};

/**
 * Main resize function
 */
export const resizeImage = (
  file: File, 
  options: ResizeOptions
): Promise<string> => {
  const { 
    maxWidth, 
    maxHeight, 
    quality = 0.9, 
    degrees = 0, 
    format = 'image/jpeg' 
  } = options;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);

    img.onload = () => {
      try {
        const resizedImage = resizeImg(
          img, 
          maxWidth, 
          maxHeight, 
          degrees, 
          quality, 
          format
        );
        resolve(resizedImage);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
  });
};
