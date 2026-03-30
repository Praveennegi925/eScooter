"use client";
import React, { useEffect, useState } from "react";
import { getHomePage } from "@/app/contentstack-sdk";
import { stackLink, Metadata, Asset } from "@/app/contentstack-sdk/types";
import { BaseEntry } from "@contentstack/delivery-sdk";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";


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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const { setHeaderLoaded } = useLoading();

  useEffect(() => {
    const fetchHeaderContent = async () => {
      const content = await getHomePage<HeaderEntry>("header");
      setHeaderContent(content);
      setHeaderLoaded(true);
    };
    fetchHeaderContent();
  }, [setHeaderLoaded]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setExpandedSubMenu(null);
  };

  const toggleSubMenu = (uid: string) => {
    setExpandedSubMenu(expandedSubMenu === uid ? null : uid);
  };

  return (
    <header className="relative w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex items-center justify-between relative">
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

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-16 flex-grow justify-center">
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

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-[#42454a] hover:text-black transition-colors"
              aria-label="Toggle mobile menu"
            >
              <i className={`ri-${mobileMenuOpen ? "close" : "menu"}-line text-2xl`}></i>
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+1px)] left-0 right-0 bg-white shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          <nav className="max-w-[1440px] mx-auto px-4 py-4 border-b border-[#EAE8F3]">
            {headerContent?.nav_item?.map((ni) => {
              const hasSubItems = ni.sub_items?.length > 0;
              const isExpanded = expandedSubMenu === ni._metadata.uid;

              return (
                <div key={ni._metadata.uid} className="mb-4">
                  {/* Main Nav Link */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={ni.url.href}
                      className="flex items-center gap-2 text-[#42454a] text-sm font-medium tracking-wider hover:text-black transition-colors flex-1"
                      onClick={() => !hasSubItems && setMobileMenuOpen(false)}
                    >
                      {ni.url.title.toUpperCase()}
                    </Link>

                    {/* Submenu Toggle */}
                    {hasSubItems && (
                      <button
                        onClick={() => toggleSubMenu(ni._metadata.uid)}
                        className="p-2 text-[#42454a] hover:text-black transition-colors"
                      >
                        <i
                          className={`ri-arrow-down-s-line text-base transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        ></i>
                      </button>
                    )}
                  </div>

                  {/* Submenu Items */}
                  {hasSubItems && isExpanded && (
                    <div className="mt-3 ml-4 space-y-2 border-l border-gray-200 pl-3">
                      {ni?.sub_items?.map((sub) => (
                        <Link
                          key={sub?._metadata?.uid}
                          href={sub?.url?.href}
                          className="block text-sm text-gray-600 hover:text-black transition-colors py-1"
                          onClick={() => setMobileMenuOpen(false)}
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

          {/* Mobile Action Buttons */}
          <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-3">
            {headerContent?.actions?.map((action) => {
              const isPrimary = action?.varient === "primary";

              return (
                <Link
                  key={action?._metadata?.uid}
                  href={action?.url?.href}
                  className={`w-full px-[26.5px] py-3 border rounded-[4px] text-sm font-medium tracking-wider transition-colors text-center shadow-[0px_12px_25px_-10px_rgba(0,0,0,0.04)] ${
                    isPrimary
                      ? "bg-[#42454A] text-white border-[#42454A] hover:bg-gray-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {action?.url?.title?.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="relative w-full h-[1px]">
         <hr className="text-[#EAE8F3]" />
      </div>
    </header>
  );
};

export default Header;
