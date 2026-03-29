"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";
import Link from "next/link";


interface FeatureCard {
  feature_title: string;
  feature_description: string;
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

interface CTA {
  title: string;
  href: string;
}

interface ProductInformationEntry extends BaseEntry {
  title: string;
  sub_title: string;
  image: Asset[];
  feature: FeatureGroup[];
  cta: CTA[];
}

const ProductInformation: React.FC = () => {
  const [data, setData] = useState<ProductInformationEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getHomePage<ProductInformationEntry>("product_detail", { includeReferences: ["feature"],entryUid:"blt2b43d6c2f3610587"});
        setData(content || null);
      } catch (err) {
        console.error("Error fetching product info:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  const features =
    data.feature?.flatMap((group) => group.feature_card) || [];

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

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 items-center">

          {/* Image */}
          <div className="flex justify-center lg:justify-start">
            {data.image?.[0]?.url && (
              <Image
                src={data.image[0].url}
                alt={data.image[0].title || "product image"}
                width={500}
                height={500}
                className="w-full max-w-md lg:max-w-full object-contain"
                priority
              />
            )}
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature._metadata.uid}
                className="flex items-center gap-4"
              >
                {/* Icon */}
                {feature.feature_image?.url ? (
                  <Image
                    src={feature.feature_image.url}
                    alt={feature.feature_image.title || "icon"}
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-[#42454a] text-white rounded">
                    <i className="ri-check-line"></i>
                  </div>
                )}

                {/* Text */}
                <p className="text-lg text-[#42454a] leading-relaxed">
                  {feature.feature_title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {data.cta?.length > 0 && (
          <div className="flex justify-center mt-12 gap-4">
            {data.cta.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                {cta.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductInformation;