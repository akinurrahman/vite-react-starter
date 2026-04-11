import { useEffect, useRef, useState } from 'react';

import { type ControllerRenderProps } from 'react-hook-form';

import { type UploadedFileInfo } from '../fields/file-upload/types';
import { generateFileKey, uploadFileToCloud } from '../fields/file-upload/utils';
import { type FileUploadCategory } from '../types';

interface UseFileUploadOptions {
  category: FileUploadCategory;
  multiple?: boolean;
  field: ControllerRenderProps;
}

export function useFileUpload({ category, multiple, field }: UseFileUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({});

  useEffect(() => {
    const initialValue = field.value;

    if (!initialValue) {
      setUploadedFiles({});
      return;
    }

    const urls = Array.isArray(initialValue) ? initialValue : [initialValue];

    const currentUrls = Object.values(uploadedFiles)
      .map(f => f.url)
      .filter(Boolean);
    const urlsMatch =
      currentUrls.length === urls.length && urls.every((url: string) => currentUrls.includes(url));

    if (urlsMatch) return;

    const initialFiles: Record<string, UploadedFileInfo> = {};

    urls.forEach((url: string, index: number) => {
      if (!url) return;

      const fileName = url.split('/').pop() || `file-${index}`;
      const fileKey = `existing-${fileName}-${index}`;

      initialFiles[fileKey] = {
        file: new File([], fileName, { type: 'application/octet-stream' }),
        url,
        progress: 100,
        uploading: false,
        error: null,
      };
    });

    setUploadedFiles(initialFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  const handleFileUpload = async (file: File) => {
    const fileKey = generateFileKey(file);

    setUploadedFiles(prev => ({
      ...prev,
      [fileKey]: {
        file,
        url: null,
        progress: 0,
        uploading: true,
        error: null,
      },
    }));

    try {
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => {
          const current = prev[fileKey];
          if (!current || current.progress >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return {
            ...prev,
            [fileKey]: {
              ...current,
              progress: Math.min(current.progress + Math.random() * 20, 90),
            },
          };
        });
      }, 300);

      const url = await uploadFileToCloud(file, category);

      clearInterval(progressInterval);

      setUploadedFiles(prev => ({
        ...prev,
        [fileKey]: {
          ...prev[fileKey],
          url,
          progress: 100,
          uploading: false,
        },
      }));

      if (multiple) {
        const currentUrls = Array.isArray(field.value) ? field.value : [];
        field.onChange([...currentUrls, url]);
      } else {
        field.onChange(url);
      }
    } catch (error) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileKey]: {
          ...prev[fileKey],
          uploading: false,
          error: error instanceof Error ? error.message : 'Upload failed',
        },
      }));
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    if (!multiple && newFiles.length > 0) {
      setUploadedFiles({});
    }

    newFiles.forEach(file => {
      handleFileUpload(file);
    });
  };

  const removeFile = (fileKey: string) => {
    const fileInfo = uploadedFiles[fileKey];
    if (!fileInfo) return;

    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileKey];
      return newFiles;
    });

    if (multiple && fileInfo.url) {
      const currentUrls = Array.isArray(field.value) ? field.value : [];
      field.onChange(currentUrls.filter((url: string) => url !== fileInfo.url));
    } else {
      field.onChange(null);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    uploadedFiles,
    handleFileSelect,
    removeFile,
    openFilePicker,
  };
}
