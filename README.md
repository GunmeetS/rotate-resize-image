<div align="center">

# 🖼️ rotate-resize-image

**Lightweight, fast, and powerful client-side image processing library**

[![npm version](https://img.shields.io/npm/v/rotate-resize-image.svg?style=flat-square)](https://www.npmjs.com/package/rotate-resize-image)
[![npm downloads](https://img.shields.io/npm/dm/rotate-resize-image.svg?style=flat-square)](https://www.npmjs.com/package/rotate-resize-image)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/rotate-resize-image?style=flat-square)](https://bundlephobia.com/package/rotate-resize-image)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [API](#-api-reference) • [Examples](#-examples) • [Contributing](#-contributing)

</div>

---

## 🎯 Features

- ✨ **Smart Resizing** - Maintains aspect ratio automatically
- 🔄 **Image Rotation** - Rotate images by any degree
- 🗜️ **Intelligent Compression** - Target specific file sizes
- 🎨 **Multiple Formats** - Support for JPEG, PNG, WebP, and more
- ⚡ **Zero Dependencies** - Lightweight and fast
- 🔍 **Built-in Validation** - Validate files before processing
- 📝 **TypeScript Support** - Full type definitions included
- 🌐 **Browser-Only** - Works entirely client-side using Canvas API
- 📦 **Tree-Shakeable** - Import only what you need

## 📦 Installation

npm
npm install rotate-resize-image

yarn
yarn add rotate-resize-image

pnpm
pnpm add rotate-resize-image

## 🎮 Interactive Demo

Try all features in our interactive demo:

**[Launch Demo →](https://GunmeetS.github.io/rotate-resize-image/demo.html)**

## 🚀 Quick Start

import { resizeImage } from 'rotate-resize-image';

# Get file from input

const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files;

# Resize the image

const resizedDataUrl = await resizeImage(file, {
maxWidth: 800,
maxHeight: 600,
quality: 0.9
});

# Use the result (data URL)

document.querySelector('img').src = resizedDataUrl;


## 📖 API Reference

### `resizeImage(file, options)`

Resize and optionally rotate an image while maintaining aspect ratio.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `File` | ✅ | The image file to process |
| `options` | `ResizeOptions` | ✅ | Configuration options |

#### ResizeOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `maxWidth` | `number` | - | Maximum width in pixels |
| `maxHeight` | `number` | - | Maximum height in pixels |
| `quality` | `number` | `0.9` | Image quality (0-1) |
| `degrees` | `number` | `0` | Rotation angle in degrees |
| `format` | `string` | `'image/jpeg'` | Output format (`'image/jpeg'` \| `'image/png'` \| `'image/webp'`) |

#### Returns

`Promise<string>` - Data URL of the processed image

#### Example

const result = await resizeImage(file, {
maxWidth: 1024,
maxHeight: 768,
quality: 0.85,
degrees: 90,
format: 'image/webp'
});

---

### `resizeToTargetSize(file, targetSizeKB, options)`

Automatically compress an image to meet a target file size.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `File` | ✅ | The image file to compress |
| `targetSizeKB` | `number` | ✅ | Target file size in kilobytes |
| `options` | `Omit<ResizeOptions, 'quality'>` | ✅ | Resize options (quality is auto-adjusted) |

#### Returns

`Promise<CompressionResult>`

interface CompressionResult {
dataUrl: string;   // Compressed image data URL

sizeKB: number; // Actual file size achieved

compressionRatio: number; // Original size / compressed size
}

#### Example

const result = await resizeToTargetSize(file, 100, {
maxWidth: 1920,
maxHeight: 1080,
format: 'image/jpeg'
});

console.log(Compressed from ${result.compressionRatio.toFixed(2)}x);
console.log(Final size: ${result.sizeKB.toFixed(2)}KB);

---

### `getImageInfo(file)`

Get image dimensions and metadata without processing.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `File` | ✅ | The image file to analyze |

#### Returns

Promise<{
width: number; // Image width in pixels

height: number; // Image height in pixels

sizeKB: number; // File size in kilobytes

type: string; // MIME type
}>

#### Example

const info = await getImageInfo(file);
console.log(Dimensions: ${info.width}x${info.height});
console.log(Size: ${info.sizeKB}KB);

---

### `validateFile(file)`

Validate image file before processing.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `File` | ✅ | The file to validate |

#### Returns

{
valid: boolean;
error?: string;
}

#### Example

const validation = validateFile(file);
if (!validation.valid) {
alert(validation.error);
return;
}

---

### `validateOptions(options)`

Validate resize options before processing.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `ResizeOptions` | ✅ | The options to validate |

#### Returns

{
valid: boolean;
error?: string;
}

## 💡 Examples

### Example 1: Basic Image Resize

import { resizeImage, validateFile } from 'rotate-resize-image';

async function handleImageUpload(file: File) {

# Validate file first

const validation = validateFile(file);
if (!validation.valid) {
console.error(validation.error);
return;
}

# Resize image

const resized = await resizeImage(file, {
maxWidth: 800,
maxHeight: 600
});

# Display or upload

document.querySelector('img').src = resized;
}


### Example 2: Rotate and Convert Format

import { resizeImage } from 'rotate-resize-image';

# Rotate 90° and convert to WebP

const result = await resizeImage(file, {
maxWidth: 1024,
maxHeight: 1024,
degrees: 90,
format: 'image/webp',
quality: 0.85
});


### Example 3: Compress to Target Size

import { resizeToTargetSize } from 'rotate-resize-image';

# Compress to under 150KB

const result = await resizeToTargetSize(file, 150, {
maxWidth: 1920,
maxHeight: 1080,
format: 'image/jpeg'
});

console.log(✅ Compressed to ${result.sizeKB}KB);
console.log(📊 Compression ratio: ${result.compressionRatio.toFixed(2)}x);


### Example 4: React Component

import { useState } from 'react';
import { resizeImage, getImageInfo } from 'rotate-resize-image';

function ImageUploader() {
const [preview, setPreview] = useState('');
const [info, setInfo] = useState(null);

async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
const file = e.target.files?.;
if (!file) return;

# Get original info

const originalInfo = await getImageInfo(file);
console.log('Original:', originalInfo);

# Resize

const resized = await resizeImage(file, {
  maxWidth: 800,
  maxHeight: 600,
  quality: 0.9
});

setPreview(resized);

}

return (
<div>
<input type="file" accept="image/*" onChange={handleChange} />
{preview && <img src={preview} alt="Preview" />}
</div>
);
}


### Example 5: Next.js App Router

'use client';

import { resizeImage } from 'rotate-resize-image';

export default function ImageUploadForm() {
async function handleSubmit(formData: FormData) {
const file = formData.get('image') as File;

# Resize before uploading

const resized = await resizeImage(file, {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.85,
  format: 'image/webp'
});

# Convert data URL to Blob

const blob = await fetch(resized).then(r => r.blob());

# Upload to server

const uploadFormData = new FormData();
uploadFormData.append('image', blob, 'image.webp');

await fetch('/api/upload', {
  method: 'POST',
  body: uploadFormData
});

}

return (
<form action={handleSubmit}>
<input type="file" name="image" accept="image/*" />
<button type="submit">Upload</button>
</form>
);
}


### Example 6: Multiple Images with Progress

import { resizeImage } from 'rotate-resize-image';

async function processMultipleImages(files: File[]) {
const results = [];

for (let i = 0; i < files.length; i++) {
const file = files[i];
console.log(Processing ${i + 1}/${files.length}...);

const resized = await resizeImage(file, {
  maxWidth: 1024,
  maxHeight: 768,
  quality: 0.9
});

results.push(resized);
}

return results;
}


## 🎨 Use Cases

- **Profile Pictures** - Resize avatars before upload
- **Blog Images** - Optimize images for web display
- **E-commerce** - Product image compression
- **Social Media** - Prepare images for sharing
- **Forms** - Reduce upload sizes automatically
- **PWAs** - Client-side image optimization
- **Galleries** - Create thumbnails on-the-fly

## 🌐 Browser Support

Works in all modern browsers that support:
- Canvas API
- FileReader API
- Promises

| Browser | Version |
|---------|---------|
| Chrome | ✅ 50+ |
| Firefox | ✅ 52+ |
| Safari | ✅ 11+ |
| Edge | ✅ 79+ |

## ⚠️ Important Notes

- This library runs entirely in the browser using Canvas API
- Large images may take time to process
- Image quality depends on the `quality` parameter (0-1)
- Images are never upscaled (scale factor is capped at 1)
- Data URLs can be large - consider converting to Blob for uploads
- Web Workers are not included (manual implementation possible)

## 🔧 TypeScript

Full TypeScript support is included with type definitions:

import type {
ResizeOptions,
CompressionResult,
ValidationResult
} from 'rotate-resize-image';


## 📊 Bundle Size

- **Minified**: ~3KB
- **Gzipped**: ~1.5KB
- **Zero dependencies**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © Gunmeet Singh

See [LICENSE](LICENSE) for more information.

## 👨‍💻 Author

**Your Name**
- GitHub: [@GunmeetS](https://github.com/GunmeetS)
- Twitter: [@GunmeetS](https://twitter.com/GunmeetS44)

## 🙏 Acknowledgments

- Built with TypeScript
- Powered by HTML5 Canvas API

## 📮 Support

- 🐛 [Report Bug](https://github.com/GunmeetS/rotate-resize-image/issues)
- 💡 [Request Feature](https://github.com/GunmeetS/rotate-resize-image/issues)
- ⭐ [Star on GitHub](https://github.com/GunmeetS/rotate-resize-image)

---

<div align="center">

Made with ❤️ by Gunmeet Singh(https://github.com/GunmeetS)

If this package helped you, please consider giving it a ⭐!

</div>










