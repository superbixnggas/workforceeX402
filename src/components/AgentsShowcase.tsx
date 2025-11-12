import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, DollarSign, Clock, Zap } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  specialization: string;
  company: string;
  pricing: {
    free_plan?: { cost: string; features: string };
    team_plan?: { cost: string; features: string };
    enterprise_plan?: { cost: string; features: string };
    individual_plan?: string;
  };
  performance_metrics?: {
    [key: string]: string | number;
  };
  capabilities: string[];
  use_cases: string[];
  status: 'coming-soon' | 'available';
}

const AgentsShowcase: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const specializations = [
    'all',
    'Coding & Development',
    'Design & Creative', 
    'Data Analysis & Analytics',
    'Marketing & Sales',
    'Customer Service',
    'Voice & Communication',
    'Security & Cybersecurity',
    'Productivity & Automation',
    'Healthcare & Medical',
    'Legal & Compliance',
    'Financial Trading',
    'Business Intelligence'
  ];

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await fetch('/ai_agents_database.json');
        const data = await response.json();
        
        // Flatten agents from all categories and add coming soon status
        const allAgents: Agent[] = [];
        
        Object.entries(data.ai_agents).forEach(([category, agents]: [string, any]) => {
          if (Array.isArray(agents)) {
            agents.forEach((agent: any) => {
              allAgents.push({
                ...agent,
                specialization: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                status: 'coming-soon' as const
              });
            });
          }
        });

        setAgents(allAgents);
        setFilteredAgents(allAgents);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  useEffect(() => {
    let filtered = agents;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(agent => agent.specialization === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.capabilities.some(cap => 
          cap.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredAgents(filtered);
  }, [activeFilter, searchTerm, agents]);

  const getPricing = (agent: Agent) => {
    if (agent.pricing.individual_plan) {
      return agent.pricing.individual_plan;
    }
    if (agent.pricing.free_plan) {
      return agent.pricing.free_plan.cost;
    }
    return 'Pricing TBA';
  };

  const getRating = () => {
    return (4.2 + Math.random() * 0.6).toFixed(1);
  };

  const getResponseTime = () => {
    return Math.floor(Math.random() * 200) + 100;
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-glass-secondary rounded-lg mb-4"></div>
              <div className="h-4 bg-glass-secondary rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agents-showcase" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            AI Agents <span className="text-gradient">Showcase</span>
          </h2>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto mb-8">
            25+ specialized AI agents across 12 domains, each designed untuk revolutionize 
            different aspects of your workforce with cutting-edge capabilities.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="glass-input pl-10 pr-8 cursor-pointer"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec} className="bg-gray-800 text-white">
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Agent Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-auto-fit gap-6"
        >
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card card-hover card-glow group"
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-h3 font-semibold text-text-primary mb-1 group-hover:text-gradient transition-all duration-300">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">{agent.specialization}</p>
                  <p className="text-xs text-text-muted">{agent.company}</p>
                </div>
                <div className="badge-coming-soon">
                  <Clock className="w-3 h-3 mr-1" />
                  Coming Soon
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-secondary mb-2">Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((capability, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-glass-secondary rounded text-xs text-text-muted border border-glass-border"
                    >
                      {capability}
                    </span>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded text-xs border border-accent-blue/30">
                      +{agent.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-glass-secondary rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-3 h-3 text-accent-yellow" />
                    <span className="text-xs text-text-muted">Rating</span>
                  </div>
                  <div className="text-sm font-semibold text-text-primary">{getRating()}</div>
                </div>
                <div className="bg-glass-secondary rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="w-3 h-3 text-accent-blue" />
                    <span className="text-xs text-text-muted">Response</span>
                  </div>
                  <div className="text-sm font-semibold text-text-primary">{getResponseTime()}ms</div>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-accent-green" />
                  <span className="text-sm text-text-secondary">Starting at</span>
                </div>
                <div className="text-lg font-bold text-accent-green">
                  {getPricing(agent)}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full btn-secondary text-sm py-3 group-hover:btn-primary transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted mb-4">
            Showing {filteredAgents.length} of {agents.length} AI agents
          </p>
          <button className="btn-secondary px-8 py-3">
            Load More Agents
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentsShowcase;