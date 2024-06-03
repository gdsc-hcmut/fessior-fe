'use client';

import 'aos/dist/aos.css';
import './index.css';

import AOS from 'aos';
import { useEffect } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

import AvailableTools from './components/AvailableTools';
import HeroSection from './components/HeroSection';
import Projects from './components/Projects';
import Statistics from './components/Statistics';

export default function HomePage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <div className='flex flex-col'>
        <HeroSection />
        <AvailableTools />
        <Statistics />
        <Projects />
      </div>
      <Footer />
    </>
  );
}
