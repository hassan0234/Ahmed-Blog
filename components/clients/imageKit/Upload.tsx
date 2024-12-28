"use client";

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { useRef, useState } from "react";
import { UploadProgress } from "./upload-progress";
import toast from "react-hot-toast";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const ikUploadRef = useRef<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onError = (err: any) => {
    setIsUploading(false);
    setUploadProgress(0);
    toast.error("Error uploading image");
  };

  const onSuccess = (res: any) => {
    setIsUploading(false);
    setUploadProgress(0);
    onImageUpload(res.filePath);
    toast.success("Image uploaded successfully!");
  };

  const onUploadProgress = (progress: any) => {
    if (progress.loaded && progress.total) {
      const percentage = (progress.loaded / progress.total) * 100;
      setUploadProgress(percentage);
    }
  };

  const onUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="flex flex-col space-y-4">
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          className="hidden"
          ref={ikUploadRef}
        />
        <div>
          <button
            onClick={() => ikUploadRef.current.click()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 shadow-md transition duration-300 ease-in-out disabled:opacity-50"
            disabled={isUploading}
            type="button"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        <UploadProgress progress={uploadProgress} isUploading={isUploading} />
      </div>
    </ImageKitProvider>
  );
}
