"use client";

import React from "react";
import { Metadata, Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";

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

interface FeaturesProps {
  data: HeroFeatureEntry;
}

const Features: React.FC<FeaturesProps> = ({data}) => {
  
  const featureContent = data || null;

  if (!featureContent) return null;

  return (
    <section className="w-full bg-white py-16 lg:py-20 px-4 lg:px-8">
      <div className="max-w-[1440px] mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {featureContent.feature_card?.map((feature) => {
            
            const [value, unit] = feature.feature_description.split(" ");

            return (
              <div
                key={feature._metadata.uid}
                className="bg-white border border-[#f4f4f4] rounded-lg p-6 shadow-[0px_13px_26px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center min-h-[140px]"
              >
                
                {/* Value + Unit */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[#42454a]">
                      {value}
                    </span>

                    {unit && (
                      <span className="text-sm font-bold text-[#42454a]">
                        {unit}
                      </span>
                    )}
                  </div>
                </div>

                {/* Label */}
                <p className="text-xs font-medium text-[#42454a] leading-tight">
                  {feature.feature_title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;