"use client";

import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  isUploading: boolean;
}

export function UploadProgress({ progress, isUploading }: UploadProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="w-full max-w-xs mt-4">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground mt-2 text-center">
        {progress.toFixed(0)}% uploaded
      </p>
    </div>
  );
}