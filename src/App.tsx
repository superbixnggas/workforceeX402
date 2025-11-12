import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import ParticleEffects from './components/ParticleEffects';
import HeroSection from './components/HeroSection';
import AgentsShowcase from './components/AgentsShowcase';
import CustomAgentsSection from './components/CustomAgentsSection';
import X402TokenSection from './components/X402TokenSection';
import Footer from './components/Footer';

// Lazy load heavy components for better performance
const CreateAgentModal = lazy(() => import('./components/CreateAgentModal'));

// Loading component for lazy-loaded content
const LazyLoader: React.FC = () => (
  <div className="glass-card p-8 text-center animate-pulse">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-yellow mx-auto mb-4"></div>
    <p className="text-text-muted">Loading...</p>
  </div>
);

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateAgent = () => {
    setIsCreateModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Particle Effects Background */}
      <ParticleEffects />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Smooth Scrolling Container */}
        <div className="snap-y snap-mandatory h-screen overflow-y-auto">
          {/* Hero Section - Full Screen */}
          <section className="snap-start min-h-screen flex items-center">
            <HeroSection onCreateAgent={handleCreateAgent} />
          </section>

          {/* Agents Showcase Section */}
          <section className="snap-start min-h-screen flex items-center py-20">
            <AgentsShowcase />
          </section>

          {/* Custom Agents Section */}
          <section className="snap-start min-h-screen flex items-center py-20">
            <CustomAgentsSection />
          </section>

          {/* X402 Token Section */}
          <section className="snap-start min-h-screen flex items-center py-20">
            <X402TokenSection />
          </section>

          {/* Footer Section */}
          <section className="snap-start min-h-screen flex items-end">
            <Footer />
          </section>
        </div>
      </main>

      {/* Custom Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-yellow to-accent-blue z-50"
        style={{
          scaleX: 0,
          transformOrigin: '0%',
        }}
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: typeof window !== 'undefined' ? 
            window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0 
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-text-muted text-sm z-40"
      >
        <div className="flex flex-col items-center space-y-2">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border border-text-muted rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-accent-yellow rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;