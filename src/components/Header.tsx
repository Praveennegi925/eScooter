"use client";
import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { stackLink, Metadata, Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";
import Link from "next/link";


export interface SubItem {
  url: stackLink;
  _metadata: Metadata;
}

export interface NavItem {
  url: stackLink;
  _metadata: Metadata;
  sub_items: SubItem[];
}

export interface HeaderAction {
  url: stackLink;
  _metadata: Metadata;
  varient: "primary" | "secondary" | string;
}

export interface HeaderEntry extends BaseEntry {
  title: string;
  logo: Asset;
  tags: string[];
  _in_progress: boolean;
  actions: HeaderAction[];
  nav_item: NavItem[];
}

const Header: React.FC = () => {
 
  const [headerContent, setHeaderContent] = useState<HeaderEntry | null>(
    null,
  );

  useEffect(() => {
    const fetchHeaderContent = async () => {
      const content = await getHomePage<HeaderEntry>("header");
      setHeaderContent(content);
    };
    fetchHeaderContent();
  }, []);

  return (
    <header className="relative w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-center justify-between relative">
        {headerContent && (
          <>
            {/* Logo */}
            <div className="relative h-[47px] w-[69px] flex-shrink-0">
              <Image
                alt={headerContent?.logo?.title || "logo"}
                src={headerContent?.logo?.url || ""}
                fill
                className="object-contain"
                sizes="69px"
                priority
              />
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-16 flex-grow justify-center">
              {headerContent?.nav_item?.map((ni) => {
                const hasSubItems = ni.sub_items?.length > 0;

                return (
                  <div key={ni._metadata.uid} className="relative group">
                    {/* Main Nav Link */}
                    <Link
                      href={ni.url.href}
                      className="flex items-center gap-1 text-[#42454a] text-sm font-medium tracking-wider hover:text-black transition-colors"
                    >
                      {ni.url.title.toUpperCase()}

                      {hasSubItems && (
                        <i className="ri-arrow-down-s-line text-base transition-transform group-hover:rotate-180"></i>
                      )}
                    </Link>

                    {/* Dropdown */}
                    {hasSubItems && (
                      <div className="absolute z-1 top-full left-0 mt-3 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {ni?.sub_items?.map((sub) => (
                          <Link
                            key={sub?._metadata?.uid}
                            href={sub?.url?.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {sub?.url?.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Action Buttons */}
              <div className="flex items-center gap-3">
              {headerContent?.actions?.map((action) => {
                const isPrimary = action?.varient === "primary";

                return (
                  <Link
                    key={action?._metadata?.uid}
                    href={action?.url?.href}
                    className={`px-[26.5px] py-3 border border-gray-200 rounded-[4px] text-[#42454a] text-sm font-medium tracking-wider transition-colors shadow-[0px_12px_25px_-10px_rgba(0,0,0,0.04)] ${
                      isPrimary
                        ? "bg-[#42454A] text-white hover:bg-gray-600"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {action?.url?.title?.toUpperCase()}
                  </Link>

                );
              })}
            </div>
        
          </>
        )}
      </div>

      {/* Divider */}
      <div className="relative w-full h-[1px]">
         <hr className="text-[#EAE8F3]" />
      </div>
    </header>
  );
};

export default Header;
