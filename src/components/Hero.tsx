"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { stackLink, Metadata, Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";
import Link from "next/link";
import Features from "./Features";
import { useLoading } from "@/context/LoadingContext";

interface HeroCarouselItem {
  hero_image: Asset;
  hero_background_image: Asset;
  _metadata: Metadata;
}

interface CTA {
  url: stackLink;
  icon: Asset;
  _metadata: Metadata;
}

interface FeatureCard {
  feature_title: string;
  feature_description: string;
  feature_image: Asset | null;
  _metadata: Metadata;
}

export interface HeroFeatureEntry extends BaseEntry {
  title: string;
  feature_card: FeatureCard[];
  tags: string[];
  _in_progress: boolean;
}

export interface HeroEntry extends BaseEntry {
  title: string;
  hero_description: string;
  hero_carousel: HeroCarouselItem[];
  hero_feature: HeroFeatureEntry[];
  cta: CTA[];
  tags: string[];
  _in_progress: boolean;
}

const Hero: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroEntry | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHeroLoaded } = useLoading();

  // Fetch CMS Data
  useEffect(() => {
    const fetchHeroContent = async () => {
      const content = await getHomePage<HeroEntry>("hero_section", { includeReferences: ["hero_feature"] });
      setHeroContent(content);
      setHeroLoaded(true);
    };
    fetchHeroContent();
  }, [setHeroLoaded]);


  if (!heroContent) return null;

  const currentSlide = heroContent.hero_carousel[activeIndex];

  return (
    <>
      <section className="relative w-full bg-white overflow-hidden min-h-screen flex items-center">
      <div className="max-w-[1440px] mx-auto w-full py-15 lg:py-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pl-4 lg:pl-8">

          {/* LEFT CONTENT */}
          <div className="flex flex-col md:justify-center md:items-start md:justify-around">

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#42454a]">
                {heroContent?.title?.split(" ")[0]?.toUpperCase()} &nbsp;
                {heroContent?.title?.split(" ")[1]?.toUpperCase()}
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#42454a]">
                {heroContent?.title?.split(" ")?.slice(2)?.join(" ")?.toUpperCase()}
              </h2>
            </div>

            {/* Divider */}
            <div className="w-80 h-1 bg-[#42454a] mb-8"></div>

            {/* Description */}
            <p className="text-lg text-[#42454a] mb-12 max-w-xs">
              {heroContent?.hero_description}
            </p>

            {/* CTA */}
            <div className="flex justify-start items-center gap-20">
                 <Link
                  key={heroContent?.cta ? heroContent.cta[0]._metadata.uid : undefined}
                  href={heroContent?.cta ? heroContent.cta[0].url.href : "#"}
                  className="flex justify-center items-center gap-3"
                >
                  <div className="bg-[#42454a] p-3 rounded">
                    <Image
                      src={heroContent?.cta ? heroContent.cta[0].icon.url : ""}
                      alt={heroContent?.cta ? heroContent.cta[0].icon.title : ""}
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="text-lg font-medium">
                    {heroContent?.cta ? heroContent.cta[0].url.title : ""}
                  </span>
                </Link>
                <Link
                  key={heroContent?.cta ? heroContent.cta[1]._metadata.uid : undefined}
                  href={heroContent?.cta ? heroContent.cta[1].url.href : "#"}
                  className="flex justify-start gap-2 mt-3"
                >

                  <span className="text-lg font-medium text-[#42454a] text-balance w-25">
                    {heroContent?.cta ? heroContent.cta[1].url.title : ""}
                  </span>
                  <div className="p-3 rounded">
                    <Image
                      src={heroContent?.cta ? heroContent.cta[1].icon.url : ""}
                      alt={heroContent?.cta ? heroContent.cta[1].icon.title : ""}
                      width={80}
                      height={80}
                    />
                  </div>
                </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative w-full md:h-[600px] flex items-center justify-center">

            {/* Background Image*/}
    
              <Image
                src={currentSlide.hero_background_image.url} alt="bg"
                fill
                className="md:object-none absolute !left-[22%] opacity-50"
              />
       

            {/* Product Image */}
            <div className="relative w-full">
              <Image
                src={currentSlide.hero_image.url}
                alt={currentSlide.hero_image.title}
                width={800}
                height={800}
                className="object-contain w-full"
                priority
              />
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-[-25%] md:bottom-[-8%] right-10 flex items-center gap-6">

              {/* Index */}
              <div className="text-6xl md:text-8xl font-bold text-outlined-white">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* Arrows */}
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0
                        ? heroContent.hero_carousel.length - 1
                        : prev - 1
                    )
                  }
                  className="px-4 py-1 border border-[#8B938D] rounded-l-3xl hover:bg-black hover:text-white"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </button>

                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === heroContent.hero_carousel.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                  className="px-4 py-1 border border-[#8B938D] rounded-r-3xl hover:bg-black hover:text-white"
                >
                     <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    {heroContent?.hero_feature && (
        <Features data={heroContent?.hero_feature[0]} />
      )}
    </>
  );
};

export default Hero;