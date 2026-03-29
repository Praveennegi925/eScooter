"use client";

import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { Asset, Metadata } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  title: string;
  href: string;
}

interface Navigation {
  title: string;
  link: NavLink[];
  _metadata: Metadata;
}

interface Social {
  social_logo: Asset;
  social_link: NavLink;
  _metadata: Metadata;
}

interface FooterEntry extends BaseEntry {
  title: string;
  navigation: Navigation[];
  social: Social[];
  logo: Asset;
  copyright: any;
}

const Footer: React.FC = () => {
  const [data, setData] = useState<FooterEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getHomePage<FooterEntry>("footer", {
        entryUid: "blt2deb63d5c9dc0b2d",
      });
      setData(content);
    };

    fetchData();
  }, []);

  if (!data) return null;

  const copyrightText = data?.copyright?.children?.[0]?.children?.[0]?.text;

  return (
    <footer className="bg-[#42454A] text-white">
      {/* Main row */}
      <div className="relative flex items-end min-h-[340px] overflow-visible">

        {/* Scooter — overflows upward out of the footer */}
        <div className="absolute  left-0 bottom-0 w-[35%] h-[130%] pointer-events-none select-none">
          <Image
            src={data.logo.url}
            alt={data.logo.title || "scooter"}
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Nav + Social — right side */}
        <div className=" w-full  flex  justify-end items-center py-14 mr-30">
          <div className="flex gap-30">

            {data.navigation.map((nav, navIndex) => (
              <div key={nav._metadata.uid}>
                <h4 className="text-white font-semibold text-base mb-5 tracking-wide">
                  {nav.title}
                </h4>
                <ul className="space-y-6">
                  {nav.link.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}

                  {/* Social icons render below the last nav column's links */}
                  {navIndex === data.navigation.length - 1 && (
                    <li className="pt-4">
                      <div className="flex gap-3">
                        {data.social.map((item) => (
                          <Link
                            key={item._metadata.uid}
                            href={item.social_link.href}
                            aria-label={item.social_link.title}
                            className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors duration-200"
                          >
                            <div className="relative w-4 h-4">
                              <Image
                                src={item.social_logo.url}
                                alt={item.social_logo.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="py-4 text-center">
        <p className="text-gray-400 text-sm">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;