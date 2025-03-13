import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Create "uploads" folder if it doesn't exist
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const POST = async (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    upload.single('file')(req as any, {} as any, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return resolve(
          NextResponse.json({ error: 'File upload failed' }, { status: 500 })
        );
      }

      const file = (req as any).file;

      if (!file) {
        return resolve(
          NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        );
      }

      console.log('File uploaded:', file);

      resolve(
        NextResponse.json({
          message: 'File uploaded successfully',
          filePath: `/uploads/${file.filename}`,
        })
      );
    });
  });
};
