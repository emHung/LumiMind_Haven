import React from 'react';
import Navbar from '@/components/home/navbar';
import HeroSection from '@/components/home/hero-section';
import FeaturesGrid from '@/components/home/features-grid';
import SolutionsGrid from '@/components/home/solutions-grid';
import TestimonialsSection from '@/components/home/testimonials-section';
import ContactSection from '@/components/home/contact-section';
import Footer from '@/components/home/footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <SolutionsGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;