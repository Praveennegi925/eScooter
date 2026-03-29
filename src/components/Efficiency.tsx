"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";

export interface EfficiencyEntry extends BaseEntry {
  title: string;
  sub_title: string;
  image: Asset[];
  tags: string[];
  _in_progress: boolean;
}

const Efficiency: React.FC = () => {
  const [data, setData] = useState<EfficiencyEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<EfficiencyEntry>(
        "product_detail", { includeReferences: ["feature"],entryUid:"blt320dd23e7e3baf3e"}
      );
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

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

        {/* Image */}
        <div className="flex justify-center">
          {data.image?.[0]?.url && (
            <Image
              src={data.image[0].url}
              alt={data.image[0].title || "efficiency image"}
              width={800}
              height={500}
              className="w-full max-w-4xl object-contain"
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default Efficiency;