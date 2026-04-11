import { File, FileText, ImageIcon, Music, Video } from 'lucide-react';

import { apiCall } from '@/lib/api/api-call';

import { type FileUploadCategory } from '../../types';
import { type UploadResponse } from './types';

export const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
        return <ImageIcon className="text-muted-foreground h-6 w-6" />;
    }
    if (mimeType.startsWith('video/')) {
        return <Video className="text-muted-foreground h-6 w-6" />;
    }
    if (mimeType.startsWith('audio/')) {
        return <Music className="text-muted-foreground h-6 w-6" />;
    }
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) {
        return <FileText className="text-muted-foreground h-6 w-6" />;
    }
    return <File className="text-muted-foreground h-6 w-6" />;
};

export const isImageFile = (mimeType: string) => mimeType.startsWith('image/');

export const uploadFileToCloud = async (
    file: File,
    category: FileUploadCategory
): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const response = (await apiCall('/files/upload', formData, 'POST')) as UploadResponse;

    if (response.status === 'success' && response.data.url) {
        return response.data.url;
    }

    throw new Error('Upload failed');
};

export const generateFileKey = (file: File): string => {
    return `${file.name}-${file.size}-${file.lastModified}`;
};

export const getDisplayUrl = (
    previewUrl: string | null,
    serverPath: string | null,
    isImage: boolean
): string | null => {
    if (previewUrl) return previewUrl;
    if (serverPath && isImage) {
        return `${import.meta.env.VITE_FILES_URL ?? ''}${serverPath}`;
    }
    return null;
};

export const formatFileSize = (bytes: number): string => {
    return `${(bytes / 1024).toFixed(1)} KB`;
};

export const createPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file);
};

export const revokePreviewUrl = (url: string): void => {
    URL.revokeObjectURL(url);
};
