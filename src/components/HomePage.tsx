'use client';

import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductInformation from './ProductInformation';
import Accessories from './Accessories';
import Gallery from './Gallery';
import Colors from '@/components/Colors';
import Testimonials from '@/components/Testmonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Efficiency from '@/components/Efficiency';
import Loader from './Loader';
import { useLoading } from '@/context/LoadingContext';

const HomePageContent: React.FC = () => {
  const { isHeaderLoaded, isHeroLoaded } = useLoading();
  const isLoading = !isHeaderLoaded || !isHeroLoaded;

  return (
    <>
      {isLoading && <Loader />}
      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
        <Header />
        <Hero />
        <ProductInformation />
        <Efficiency />
        <Accessories />
        <Gallery />
        <Colors />
        <Testimonials />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default HomePageContent;
