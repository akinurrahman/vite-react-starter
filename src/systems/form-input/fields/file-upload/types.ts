export interface UploadedFileInfo {
  file: File;
  url: string | null;
  progress: number;
  uploading: boolean;
  error: string | null;
}

export interface UploadResponse {
  status: string;
  data: {
    url: string;
  };
}
