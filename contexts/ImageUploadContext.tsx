"use client";

import React, { createContext, useContext, useState } from "react";

interface ImageUploadContextType {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
}

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(
  undefined
);

export function ImageUploadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <ImageUploadContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </ImageUploadContext.Provider>
  );
}

export function useImageUpload() {
  const context = useContext(ImageUploadContext);
  if (context === undefined) {
    throw new Error(
      "useImageUpload must be used within an ImageUploadProvider"
    );
  }
  return context;
}
