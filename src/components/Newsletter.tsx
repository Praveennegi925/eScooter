"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Link from "next/link";

interface CTA {
  title: string;
  href: string;
}

interface NewsletterEntry extends BaseEntry {
  title: string;
  description: string;
  placeholder: string;
  cta: CTA;
}


const Newsletter: React.FC = () => {
  const [data, setData] = useState<NewsletterEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<NewsletterEntry>(
        "newsletter",
        {
          entryUid: "blt28fb3518a1b3d5a7",
        }
      );
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="w-full py-15 px-4 lg:px-8">
      <div className="max-w-[1440px] mx-auto text-center mb-12">
        <h2 className="text-5xl lg:text-6xl font-bold text-[#42454a] mb-4">
          {data.title}
        </h2>

        <p className="text-lg text-[#42454a] max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-center gap-3">

          {/* Input */}
          <input
            type="text"
            placeholder={data.placeholder}
            className="border px-4 py-3 rounded w-80"
          />

          {/* Button */}
          <Link href={data.cta.href}>
            <button
              type="button"
              className="bg-[#42454a] text-white px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              {data.cta.title}
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;