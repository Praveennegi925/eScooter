"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";


interface FeatureCard {
  feature_title: string;
  feature_image: Asset | null;
  _metadata: {
    uid: string;
  };
}

interface FeatureGroup {
  uid: string;
  title: string;
  feature_card: FeatureCard[];
}

interface AccessoriesEntry extends BaseEntry {
  title: string;
  sub_title: string;
  image: Asset[];
  feature: FeatureGroup[];
  cta: {
    title: string;
    href: string;
  }[];
}


const Accessories: React.FC = () => {
  const [data, setData] = useState<AccessoriesEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<AccessoriesEntry>(
        "product_detail",
        {
          includeReferences: ["feature"],
          entryUid: "blte3f4127a2e83837e"
        }
      );
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

    const accessories = data.feature.map((featureGroup, index) => ({
      name: featureGroup.title,
      images: data.image.slice(index * 2, index * 2 + 2),
      features: featureGroup.feature_card,
    }));

  return (
    <section className="w-full bg-white py-15 px-4 lg:px-8">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#42454a] mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-[#42454a] max-w-2xl mx-auto">
            {data.sub_title}
          </p>
        </div>

        {/* Accessories List */}
        <div className="space-y-20">
          {accessories.map((accessory, index) => {
            const isOdd = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-15 lg:gap-30 ${
                  isOdd
                    ? "lg:flex-row-reverse justify-between"
                    : "justify-start ml-[-32px]"
                }`}
              >
                {/* Images */}
                <div className="flex gap-6 justify-center">
                  {accessory.images.map((img: Asset) => (
                    <div
                      key={img.uid}
                      className="relative w-32 h-48 lg:w-75 lg:h-75 flex-shrink-0"
                    >
                      <Image
                        src={img.url}
                        alt={img.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="max-w-xl">
                  <h3 className="text-4xl lg:text-5xl font-bold text-[#42454a] mb-8">
                    {accessory.name}
                  </h3>

                  <div className="space-y-4">
                    {accessory.features.map((feature: FeatureCard) => (
                      <div
                        key={feature._metadata.uid}
                        className="flex items-center gap-4"
                      >
                        {/* Icon */}
                        <div className="relative w-12 h-12 flex-shrink-0">
                          {feature.feature_image?.url ? (
                            <Image
                              src={feature.feature_image.url}
                              alt={feature.feature_image.title}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#42454a] text-white rounded">
                              <i className="ri-check-line"></i>
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <p className="text-lg text-[#42454a] leading-relaxed">
                          {feature.feature_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button */}
        {data.cta?.[0] && (
          <div className="flex justify-center mt-20">
            <button className="border-2 border-[#42454a] text-[#42454a] px-12 py-4 rounded-lg font-bold text-xl hover:bg-[#42454a] hover:text-white transition-colors">
              {data.cta[0].title}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accessories;