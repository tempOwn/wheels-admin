import React, { useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { ImageIcon, Trash, RefreshCcw } from "lucide-react";
import { cn } from "@/src/lib/utils";

type ImageInputProps = {
  image: any;
  label?: string;
  handleImageChange: (file: any) => void;
};

export default function ImageInput({
  label,
  image,
  handleImageChange,
}: ImageInputProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    const fl = acceptedFiles[0];
    handleImageChange(fl);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
  });

  const handleDelete = () => {
    handleImageChange(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <span className="mb-2 block text-sm text-[rgba(85,112,126,1)]">
          {label}
        </span>

        {image && (
          <div className="flex items-center space-x-1">
            <button
              onClick={open}
              type="button"
              className="flex items-center space-x-2">
              <RefreshCcw size={14} />
            </button>

            <button
              onClick={handleDelete}
              type="button"
              className="flex items-center space-x-2">
              <Trash size={14} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {image ? (
          <div className={cn("h-32 w-full overflow-hidden rounded-md")}>
            {image && (
              <Image
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                width={500}
                height={500}
                alt=""
                className={cn("h-full w-full object-cover")}
              />
            )}
          </div>
        ) : (
          <div
            onClick={open}
            role="button"
            className="flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-mlg border border-dashed border-wheels-primary bg-[#F1F5F8] text-center text-wheels-grey">
            <div className="border-loyaone-yellow-black-text flex h-10 w-10 items-center justify-center rounded-full border-[0.2px] bg-white">
              <ImageIcon />
            </div>
            <div className="mt-3 text-10 text-wheels-grey">
              <p className="opacity-70">No image uploaded yet</p>
              <p className="mt-0.5 font-medium">Select Image</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
