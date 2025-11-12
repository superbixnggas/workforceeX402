import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Twitter, 
  Github, 
  Linkedin, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
  ];

  const quickLinks = [
    { text: 'AI Agents', href: '#agents' },
    { text: 'X402 Tokens', href: '#tokens' },
    { text: 'Documentation', href: '#docs' },
    { text: 'API Reference', href: '#api' },
  ];

  const companyLinks = [
    { text: 'About Us', href: '#about' },
    { text: 'Careers', href: '#careers' },
    { text: 'Press Kit', href: '#press' },
    { text: 'Contact', href: '#contact' },
  ];

  const betaFeatures = [
    { icon: Zap, text: 'Early Access to New Agents' },
    { icon: Shield, text: 'Priority Support & Security' },
    { icon: Users, text: 'Community Governance Rights' },
  ];

  return (
    <footer className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 mb-16 text-center relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/5 via-transparent to-accent-blue/5"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-accent-yellow animate-pulse" />
              <h2 className="text-display font-bold text-text-primary">
                Ready to Transform Your Workforce?
              </h2>
              <Sparkles className="w-8 h-8 text-accent-yellow animate-pulse" />
            </div>
            
            <p className="text-body-large text-text-secondary max-w-3xl mx-auto mb-8">
              Join the beta program dan be among the first to experience the future of AI-powered workforce management. 
              Get exclusive access, governance rights, dan premium rewards.
            </p>

            {/* Beta Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {betaFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3 glass rounded-xl p-4"
                >
                  <feature.icon className="w-6 h-6 text-accent-yellow" />
                  <span className="text-text-secondary text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-10 py-4 group"
              >
                <div className="flex items-center space-x-2">
                  <span>Join Beta Program</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-10 py-4 group"
              >
                <div className="flex items-center space-x-2">
                  <span>Connect Wallet</span>
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </motion.button>
            </div>

            <p className="text-text-muted text-sm mt-6">
              No credit card required • Free to join • Limited beta spots available
            </p>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-h3 font-bold text-text-primary">WorkforceX402</h3>
                <p className="text-text-muted text-sm">AI Workforce Platform</p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6">
              Revolutionizing workforce management dengan cutting-edge AI agents, 
              blockchain-powered X402 tokens, dan premium glassmorphism design.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-yellow transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-h3 font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-text-secondary hover:text-accent-yellow transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-h3 font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-text-secondary hover:text-accent-yellow transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-accent-blue" />
              <div>
                <h5 className="text-text-primary font-medium">Email Support</h5>
                <p className="text-text-secondary text-sm">hello@workforcex402.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-6 h-6 text-accent-green" />
              <div>
                <h5 className="text-text-primary font-medium">Community Discord</h5>
                <p className="text-text-secondary text-sm">Join our growing community</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-glass-border"
        >
          <div className="text-text-muted text-sm mb-4 md:mb-0">
            © 2025 WorkforceX402. All rights reserved. Powered by AI & Blockchain.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-text-muted hover:text-accent-yellow transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-text-muted hover:text-accent-yellow transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-text-muted hover:text-accent-yellow transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;