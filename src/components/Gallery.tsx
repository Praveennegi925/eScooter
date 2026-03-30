"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset, Metadata } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";

interface FeatureCard {
  feature_title: string;
  feature_description: string;
  feature_image: Asset | null;
  _metadata: Metadata;
}

interface FeatureGroup {
  feature_card: FeatureCard[];
}

interface GalleryEntry extends BaseEntry {
  title: string;
  sub_title: string;
  feature: FeatureGroup[];
  cta: {
    title: string;
    href: string;
  }[];
}

const Gallery: React.FC = () => {
  const [data, setData] = useState<GalleryEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<GalleryEntry>("product_detail", {
        includeReferences: ["feature", "feature.feature_card"],
        entryUid: "bltfa67be072fd0c87e",
      });
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

  const cards: FeatureCard[] = data.feature?.flatMap((group) => group?.feature_card ?? []) ?? [];

  // Left column takes the first card, right column takes the rest (up to 2)
  const [leftCard, ...rightCards] = cards;
  const rightTwo = rightCards.slice(0, 2);

  return (
    <section className="w-full bg-white py-15 px-4 lg:px-8">
      <div className="max-w-[1440px] mx-auto text-center mb-12">
        <h2 className="text-5xl lg:text-6xl font-bold text-[#42454a] mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-[#42454a] max-w-2xl mx-auto">
          {data.sub_title}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left column */}
        <div className="flex flex-col justify-end items-end">
          {leftCard && (
            <div className="relative w-full h-[225px] md:h-[450px]">
              <p className="absolute top-1 md:top-2 left-[5%] md:left-[22%] z-10 text-xl font-bold text-[#42454a]">
                {leftCard.feature_title}
              </p>
              {leftCard.feature_image?.url && (
                <Image
                  src={leftCard.feature_image.url}
                  alt={leftCard.feature_title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          )}

          <div className="space-y-4 mt-5 ml-6">
            {data.cta?.map((btn, i) => (
              <button
                key={i}
                className="w-75 md:w-90 ml-8 border-2 border-[#42454a] rounded py-4 text-[#42454a] font-semibold hover:bg-[#42454a] hover:text-white transition-colors"
              >
                {btn.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {rightTwo.map((card) => (
            <div key={card._metadata.uid} className="relative w-full h-[225px] md:h-[450px]">
              <p className="absolute top-2 md:top-3 left-[4%] md:left-[22%] z-10 text-xl font-bold text-[#42454a]">
                {card.feature_title}
              </p>
              {card.feature_image?.url && (
                <Image
                  src={card.feature_image.url}
                  alt={card.feature_title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;