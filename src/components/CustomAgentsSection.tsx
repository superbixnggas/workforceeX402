import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Download, Sparkles, Star, Zap, Clock } from 'lucide-react';

// Lazy load CreateAgentModal for performance
const CreateAgentModal = lazy(() => import('./CreateAgentModal'));
import { CustomAgent } from './CreateAgentModal';

const CustomAgentsSection: React.FC = () => {
  const [customAgents, setCustomAgents] = useState<CustomAgent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<CustomAgent | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Load custom agents from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workforcex402-custom-agents');
    if (saved) {
      try {
        const parsedAgents = JSON.parse(saved);
        setCustomAgents(parsedAgents);
      } catch (error) {
        console.error('Error loading custom agents:', error);
      }
    }
  }, []);

  // Save custom agents to localStorage
  const saveCustomAgents = (agents: CustomAgent[]) => {
    try {
      localStorage.setItem('workforcex402-custom-agents', JSON.stringify(agents));
      setCustomAgents(agents);
    } catch (error) {
      console.error('Error saving agents:', error);
    }
  };

  // Handle agent save (create or update)
  const handleSaveAgent = (agent: CustomAgent) => {
    const existingIndex = customAgents.findIndex(a => a.id === agent.id);
    
    if (existingIndex >= 0) {
      // Update existing agent
      const updatedAgents = [...customAgents];
      updatedAgents[existingIndex] = agent;
      saveCustomAgents(updatedAgents);
      showSuccessMessage('Agent updated successfully!');
    } else {
      // Add new agent
      const updatedAgents = [...customAgents, agent];
      saveCustomAgents(updatedAgents);
      showSuccessMessage('Custom agent created successfully!');
    }
  };

  // Handle agent edit
  const handleEditAgent = (agent: CustomAgent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  // Handle agent delete
  const handleDeleteAgent = (agent: CustomAgent) => {
    if (window.confirm(`Are you sure you want to delete "${agent.name}"?`)) {
      const updatedAgents = customAgents.filter(a => a.id !== agent.id);
      saveCustomAgents(updatedAgents);
      showSuccessMessage('Agent deleted successfully!');
    }
  };

  // Show success notification
  const showSuccessMessage = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Handle export
  const handleExport = () => {
    const dataStr = JSON.stringify(customAgents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-agents-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showSuccessMessage('Agents exported successfully!');
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            My Custom <span className="text-gradient">Agents</span>
          </h2>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto mb-8">
            Create and manage your own AI agents tailored to your specific needs. 
            Build a personalized workforce that matches your exact requirements.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary px-8 py-3 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Custom Agent
            </button>
            
            {customAgents.length > 0 && (
              <button
                onClick={handleExport}
                className="btn-secondary px-8 py-3 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Export Agents
              </button>
            )}
          </div>
        </motion.div>

        {/* Custom Agents Grid */}
        {customAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="glass rounded-3xl p-12 max-w-2xl mx-auto">
              <Sparkles className="w-16 h-16 text-accent-yellow mx-auto mb-6 animate-float" />
              <h3 className="text-h2 font-semibold text-text-primary mb-4">
                No Custom Agents Yet
              </h3>
              <p className="text-text-secondary mb-8">
                Start building your personalized AI workforce by creating your first custom agent. 
                Define its skills, specialization, and pricing to match your exact needs.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary px-8 py-4 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Agent
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-auto-fit gap-6"
          >
            {customAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card card-hover card-glow group relative"
              >
                {/* Action Menu */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAgent(agent)}
                      className="p-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded-lg transition-colors"
                      title="Edit Agent"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAgent(agent)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      title="Delete Agent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4 pr-16">
                  <div className="flex-1">
                    <h3 className="text-h3 font-semibold text-text-primary mb-1 group-hover:text-gradient transition-all duration-300">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">{agent.specialization}</p>
                    <p className="text-xs text-text-muted">Custom AI Agent</p>
                  </div>
                  <div className={`badge-${
                    agent.availability === 'available' ? 'online' : 
                    agent.availability === 'beta-testing' ? 'coming-soon' : 'offline'
                  }`}>
                    {agent.availability === 'available' ? (
                      <>
                        <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse mr-1"></div>
                        Available
                      </>
                    ) : agent.availability === 'beta-testing' ? (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Beta Testing
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-text-muted rounded-full mr-1"></div>
                        In Development
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {agent.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Core Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-glass-secondary rounded text-xs text-text-muted border border-glass-border"
                      >
                        {skill}
                      </span>
                    ))}
                    {agent.skills.length > 3 && (
                      <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded text-xs border border-accent-blue/30">
                        +{agent.skills.length - 3} more
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
                    <div className="text-sm font-semibold text-text-primary">
                      {agent.performance_metrics.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="bg-glass-secondary rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-3 h-3 text-accent-blue" />
                      <span className="text-xs text-text-muted">Response</span>
                    </div>
                    <div className="text-sm font-semibold text-text-primary">
                      {Math.round(agent.performance_metrics.response_time)}ms
                    </div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-glass-secondary rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Success Rate</span>
                    <span className="text-sm font-semibold text-accent-green">
                      {agent.performance_metrics.success_rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-glass-primary rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-accent-green to-accent-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${agent.performance_metrics.success_rate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-text-secondary">Starting at</span>
                  <div className="text-lg font-bold text-accent-green">
                    {agent.pricing} X402
                  </div>
                </div>

                {/* Creation Date */}
                <div className="text-xs text-text-muted border-t border-glass-border pt-3">
                  Created: {new Date(agent.created_at).toLocaleDateString()}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleEditAgent(agent)}
                    className="flex-1 btn-secondary text-sm py-2"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button className="flex-1 btn-primary text-sm py-2 group-hover:btn-secondary transition-all duration-300">
                    {agent.availability === 'available' ? 'Hire Now' : 'Get Notified'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Statistics */}
        {customAgents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-h2 font-bold text-accent-yellow mb-2">
                {customAgents.length}
              </div>
              <div className="text-sm text-text-muted">Total Agents</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-h2 font-bold text-accent-blue mb-2">
                {customAgents.filter(a => a.availability === 'available').length}
              </div>
              <div className="text-sm text-text-muted">Available Now</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-h2 font-bold text-accent-green mb-2">
                {customAgents.filter(a => a.availability === 'beta-testing').length}
              </div>
              <div className="text-sm text-text-muted">In Beta</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-h2 font-bold text-text-secondary mb-2">
                {Math.round(customAgents.reduce((acc, agent) => acc + agent.performance_metrics.rating, 0) / customAgents.length * 10) / 10}
              </div>
              <div className="text-sm text-text-muted">Avg Rating</div>
            </div>
          </motion.div>
        )}

        {/* Create Agent Modal */}
        <Suspense fallback={<div className="glass-card p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-yellow mx-auto mb-4"></div><p className="text-text-muted">Loading modal...</p></div>}>
          <CreateAgentModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingAgent(null);
            }}
            onSave={handleSaveAgent}
            editingAgent={editingAgent}
          />
        </Suspense>

        {/* Success Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="glass-card p-4 border border-accent-green/50 bg-accent-green/10">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-text-primary">
                    {notificationMessage}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomAgentsSection;