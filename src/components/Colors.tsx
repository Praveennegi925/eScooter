"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";

interface ColorsEntry extends BaseEntry {
  title: string;
  sub_title: string;
  image: Asset[];
}

const Colors: React.FC = () => {
  const [data, setData] = useState<ColorsEntry | null>(null);
  const [mainImage, setMainImage] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<ColorsEntry>("product_detail", {
        entryUid: "blte3099502dc9b50b3",
      });
      setMainImage(content?.image?.[0] || null);
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="w-full bg-white py-15 md:mb-30">
      <div className="max-w-[1440px] mx-auto text-center mb-12">
        <h2 className="text-5xl lg:text-6xl font-bold text-[#42454a] mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-[#42454a] max-w-2xl mx-auto">
          {data.sub_title}
        </p>
      </div>

      <div className="relative">
        {mainImage?.url && (
          <div key={mainImage?.uid} className="relative w-full h-[200px] md:h-[873px]">
            <Image
              src={mainImage.url}
              alt={mainImage?.title || ""}
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Colors Grid */}
        <div className="flex justify-between gap-6 absolute top-[50%] md:top-[45%] md:top-[85%] left-0 w-full h-full px-4">
          {data.image?.slice(1)?.map((img) => (
            <div key={img.uid} className="relative w-full h-[200px] md:h-[300px]">
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Colors
