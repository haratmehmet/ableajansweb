import fs from "fs/promises";
import path from "path";
import { put, del } from "@vercel/blob";

export interface StorageProvider {
  uploadFile(buffer: Buffer, filename: string, mimeType: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
  getFileUrl(filename: string): string;
}

export class LocalStorageProvider implements StorageProvider {
  private uploadDir: string;

  constructor() {
    // .env dosyasından veya varsayılan dizinden al
    this.uploadDir = process.env.LOCAL_UPLOAD_DIR || "./public/uploads";
  }

  private async ensureDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    await this.ensureDir();
    const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(this.uploadDir, uniqueFilename);
    
    await fs.writeFile(filePath, buffer);
    return this.getFileUrl(uniqueFilename);
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.uploadDir, filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file ${filename}:`, error);
    }
  }

  getFileUrl(filename: string): string {
    // Next.js public klasöründen servis edileceği için
    // "./public/uploads" -> "/uploads/filename"
    const publicPath = this.uploadDir.replace(/^\.?\/public/, "");
    return `${publicPath}/${filename}`;
  }
}

export class VercelBlobStorageProvider implements StorageProvider {
  async uploadFile(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    
    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, buffer, {
      access: 'public',
      contentType: mimeType,
    });
    
    return blob.url;
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      // If filename is a full URL (which Blob returns), use it directly
      await del(filename);
    } catch (error) {
      console.error(`Failed to delete blob ${filename}:`, error);
    }
  }

  getFileUrl(filename: string): string {
    // Vercel Blob uploadFile already returns the full URL.
    // If this is called, it might just return the filename which is expected to be a URL.
    return filename;
  }
}

export function getStorageProvider(): StorageProvider {
  // Always use Vercel Blob to debug the issue
  return new VercelBlobStorageProvider();
}

// Global kullanım için instance
export const storage = getStorageProvider();
