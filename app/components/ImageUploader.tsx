"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "blogImage">
      endpoint="blogImage"
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0) return;
        onUpload(res[0].url);
      }}
      onUploadError={(error) => {
        alert(error.message);
      }}
    />
  );
}

