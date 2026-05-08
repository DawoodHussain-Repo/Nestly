"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

interface PropertyGalleryProps {
  mainImage: string;
  images: string[];
  title: string;
}

export function PropertyGallery({ mainImage, images, title }: PropertyGalleryProps) {
  const [imageError, setImageError] = useState(false);
  const [galleryErrors, setGalleryErrors] = useState<Record<number, boolean>>({});

  const galleryImages = images && images.length > 0 
    ? images.slice(0, 4) 
    : Array(4).fill(mainImage);

  return (
    <section className="max-w-7xl mx-auto px-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
        <div className="relative h-[400px] md:h-[500px] bg-muted">
          {!imageError ? (
            <Image
              src={mainImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <div className="text-center">
                <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">Property Image</p>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((img, idx) => (
            <div key={`${img}-${idx}`} className="relative h-[190px] md:h-[242px] bg-muted rounded-xl overflow-hidden">
              {!galleryErrors[idx] ? (
                <Image
                  src={img}
                  alt={`${title} - Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  onError={() => setGalleryErrors(prev => ({ ...prev, [idx]: true }))}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
