import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Plus, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onCreateAgent?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCreateAgent }) => {
  const stats = [
    { label: 'AI Agents', value: '25+', icon: Zap, color: 'text-accent-yellow' },
    { label: 'Specializations', value: '12', icon: BarChart3, color: 'text-accent-blue' },
    { label: 'Success Rate', value: '98.5%', icon: Shield, color: 'text-accent-green' },
  ];

  const statusIndicators = [
    { text: 'System Online', status: 'online' },
    { text: 'Data Live', status: 'online' },
    { text: 'Analytics Ready', status: 'online' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-hero-responsive font-bold text-text-primary mb-6 text-shadow">
            AI Workforce
            <span className="block text-gradient mt-2">Platform</span>
          </h1>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Revolutionizing workforce management dengan AI-powered agents, X402 token ecosystem, 
            dan premium glassmorphism design untuk masa depan kerja digital.
          </p>
        </motion.div>

        {/* Statistics Pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass glass-hover rounded-2xl px-6 py-4 flex items-center space-x-3 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div className="text-left">
                <div className="text-xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {statusIndicators.map((indicator, index) => (
            <div
              key={index}
              className="badge-online flex items-center space-x-2"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{indicator.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <h3 className="text-h2 text-text-primary mb-4">Market Intelligence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-h2 font-bold text-accent-yellow mb-2">$5.4B</div>
              <div className="text-text-muted text-sm">AI Agents Market 2025</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-bold text-accent-blue mb-2">45.8%</div>
              <div className="text-text-muted text-sm">Annual Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-bold text-accent-green mb-2">62%</div>
              <div className="text-text-muted text-sm">Enterprise Adoption</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <button 
            onClick={() => {
              if (onCreateAgent) onCreateAgent();
            }}
            className="btn-primary text-lg px-8 py-4 flex items-center justify-center group hover:scale-105 transition-transform duration-200"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Create Your Own Agent
          </button>
          <button 
            onClick={() => document.getElementById('agents-showcase')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
          >
            Explore AI Agents
          </button>
        </motion.div>
      </div>

      {/* Hero Overlay */}
      <div className="absolute inset-0 bg-gradient-hero-overlay pointer-events-none" />
    </section>
  );
};

export default HeroSection;