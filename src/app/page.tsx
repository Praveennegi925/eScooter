'use client';
import { LoadingProvider } from '@/context/LoadingContext';
import HomePageContent from '@/components/HomePage';

export default function Home() {
  return (
    <LoadingProvider>
      <HomePageContent />
    </LoadingProvider>
  );
}