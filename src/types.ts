export interface ResizeOptions {
  maxWidth: number;
  maxHeight: number;
  quality?: number; // 0 to 1, default 0.9
  degrees?: number; // Rotation angle, default 0
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface CompressionResult {
  dataUrl: string;
  sizeKB: number;
  compressionRatio: number;
}
