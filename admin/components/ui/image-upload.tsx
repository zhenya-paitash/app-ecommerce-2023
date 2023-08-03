"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onRemove
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const envUploadPreset = "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET";
  const uploadPreset = process.env[envUploadPreset];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex items-center mb-4 gap-4">
        {value.map(url => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image
              className="object-cover"
              src={url}
              alt="Image"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={uploadPreset}
        // uploadPreset="jilxtxrp"
      >
        {({ open }) => {
          const onClick = () => open();

          return (
            <Button
              type="button"
              variant="secondary"
              onClick={onClick}
              disabled={disabled}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
}

export default ImageUpload;