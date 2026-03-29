"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset, Metadata } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";

interface TestimonialCard {
  rating: number;
  description: string;
  profile_image: Asset;
  profile_name: string;
  designation: string;
  _metadata: Metadata;
}

interface TestimonialsEntry extends BaseEntry {
  title: string;
  card: TestimonialCard[];
}

const Testimonials: React.FC = () => {
  const [data, setData] = useState<TestimonialsEntry | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<TestimonialsEntry>("testimonials", {
        entryUid: "bltdc8feaf834e270a0",
      });
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

  const visibleCards = 3;
  const maxIndex = Math.max(0, data.card.length - visibleCards);
  const displayedCards = data.card.slice(activeIndex, activeIndex + visibleCards);

  return (
    <section className="w-full py-15 px-4 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto text-center mb-16">
        <h2 className="text-5xl lg:text-6xl font-bold text-[#42454a]">
          {data.title}
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto">
        {/* Testimonial Cards */}
        <div className="flex gap-6 justify-evenly items-stretch mb-12 overflow-visible flex-wrap">
          {displayedCards.map((item) => (
            <div
              key={item._metadata.uid}
              className="flex flex-col justify-center items-center p-5 bg-white border border-[#D8D8D8] shadow-[0px_12px_25px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.12)] hover:scale-[1.03] transition-all hover:border-white duration-300 will-change-transform"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xl text-[#FF6B5B]">
                    ★
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="w-60 text-gray-700 text-sm leading-relaxed mb-8 flex-grow text-center">
                {item.description}
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-3">
                {item.profile_image?.url && (
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.profile_image.url}
                      alt={item.profile_name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.profile_name}
                  </p>
                  <p className="text-gray-500 text-xs">{item.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className="p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center"
          >
            <i className="ri-arrow-left-long-line text-lg text-gray-600"></i>
          </button>

          <button
            onClick={() => setActiveIndex((prev) => Math.min(maxIndex, prev + 1))}
            disabled={activeIndex === maxIndex}
            className="p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center"
          >
            <i className="ri-arrow-right-long-line text-lg text-gray-600"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;