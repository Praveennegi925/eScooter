'use client';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductInformation from '../components/ProductInformation';
import Accessories from '../components/Accessories';
import Gallery from '../components/Gallery';
import Colors from '@/components/Colors';
import Testimonials from '@/components/Testmonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Efficiency from '@/components/Efficiency';

export default function Home() {
  return (
     <>
          <Header />
          <Hero />
          <ProductInformation />
          <Efficiency />
          <Accessories />
          <Gallery />
          <Colors/>
          <Testimonials />
          <Newsletter />
          <Footer />
     </>
  );
}