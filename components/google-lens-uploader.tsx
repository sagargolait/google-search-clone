import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/contexts/ImageUploadContext";

const GoogleLensUploader = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { setUploadedFile } = useImageUpload();
  const [isUploading, setIsUploading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleUpload(file);
    }
  }, []);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setSearchResults([]);
    setUploadedFile(file);

    router.push(
      `/image-search?q=${encodeURIComponent(file.name)}&searchType=image`
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop,
  });

  return (
    <div className="bg-[#303134] border rounded-xl shadow-[0px_4px_6px_rgba(32,33,36,0.28)] -ml-1 mt-0 absolute -top-1 w-[calc(100%+8px)] z-[989]">
      <div className="rounded-lg shadow-md p-4">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-4">
          <p className="text-[#f1f3f4]">Search any image with Google Lens</p>
        </div>

        <div className="w-full border-dashed flex-grow flex flex-col rounded-md border border-[#3c4043] h-[280px] bg-[#202124]">
          {isUploading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4 gap-4 items-center flex-grow">
                <input {...getInputProps()} />
                <Image src="/upload.svg" alt="upload" width={59} height={45} />
                <div className="text-[#f1f3f4] mb-4">
                  Drag an image here or
                  <span
                    {...getRootProps()}
                    className="text-blue-600 cursor-pointer hover:underline ml-1"
                    role="button"
                  >
                    upload a file
                  </span>
                </div>
              </div>

              <div className="items-center flex px-6">
                <div className="flex-grow border-t border-[#3c4043] h-0"></div>
                <div className="text-[#9aa0a6] cursor-default flex-shrink-0 text-sm mx-5">
                  OR
                </div>
                <div className="flex-grow border-t border-[#3c4043] h-0"></div>
              </div>

              <div className="flex m-4">
                <input
                  className="bg-[#303134] border border-[#3c4043] text-[#f1f3f4] rounded-[36px] inline-flex flex-grow text-sm h-10 px-6 w-full outline-none"
                  placeholder="Paste image link"
                  autoComplete="off"
                  autoCorrect="off"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button
                  onClick={() => {
                    router.push(
                      `/image-search?q=${encodeURIComponent(
                        imageUrl
                      )}&searchType=image`
                    );
                  }}
                  className="flex items-center bg-[#303134] rounded-[32px] border border-[#3c4043] text-[#8ab4f8] cursor-pointer flex-shrink-0 font-['Google_Sans',_Roboto,_Arial,_sans-serif] text-sm justify-center letter-spacing-[.25px] ml-2 outline-0 px-6 py-2"
                >
                  Search
                </button>
              </div>
            </>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.secure_url}
                  alt={`Similar image ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                {image.similarity && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {Math.round(image.similarity * 100)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleLensUploader;
