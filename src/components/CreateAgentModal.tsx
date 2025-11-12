import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Minus, Save, Eye, Sparkles, Bot, Star, Zap, Award,
  Code, Shield, Cloud, Terminal, Palette, Camera, Flame, Layout,
  Image, BarChart3, FileText, TrendingUp, Target, PenTool, Users,
  Mail, MessageCircle, Heart, Globe, Ticket, Lock, Mic, Volume2,
  Phone, Headphones, Settings, BookOpen, CheckSquare, Database,
  Stethoscope, Microscope, Scale, DollarSign, Search
} from 'lucide-react';
import { AIModel, getModelsForSpecialization, getRecommendedModels, getModelById } from '../data/aiModels';

interface CustomAgent {
  id: string;
  name: string;
  specialization: string;
  ai_model: AIModel | null; // Allow null untuk backward compatibility
  skills: string[];
  description: string;
  pricing: number;
  performance_metrics: {
    rating: number;
    response_time: number;
    success_rate: number;
  };
  availability: 'available' | 'in-development' | 'beta-testing';
  created_at: string;
}

// Icon mapping component for dynamic icons
const IconComponent: React.FC<{ iconName: string; className?: string }> = ({ iconName, className = "w-5 h-5" }) => {
  const iconMap = {
    'Code': Code,
    'Shield': Shield, 
    'Cloud': Cloud,
    'Terminal': Terminal,
    'Palette': Palette,
    'Camera': Camera,
    'Flame': Flame,
    'Layout': Layout,
    'Image': Image,
    'BarChart3': BarChart3,
    'FileText': FileText,
    'TrendingUp': TrendingUp,
    'Target': Target,
    'PenTool': PenTool,
    'Users': Users,
    'Mail': Mail,
    'MessageCircle': MessageCircle,
    'Heart': Heart,
    'Globe': Globe,
    'Ticket': Ticket,
    'Lock': Lock,
    'Mic': Mic,
    'Volume2': Volume2,
    'Phone': Phone,
    'Headphones': Headphones,
    'Settings': Settings,
    'BookOpen': BookOpen,
    'CheckSquare': CheckSquare,
    'Database': Database,
    'Stethoscope': Stethoscope,
    'Microscope': Microscope,
    'Scale': Scale,
    'DollarSign': DollarSign,
    'Search': Search,
    'Zap': Zap,
    'Bot': Bot
  };

  const Icon = iconMap[iconName as keyof typeof iconMap] || Bot;
  return <Icon className={className} />;
};

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: CustomAgent) => void;
  editingAgent?: CustomAgent | null;
}

// Model Card Component for dropdown selection
const ModelCard: React.FC<{
  model: AIModel;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ model, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-3 rounded-lg border transition-all hover:bg-glass-secondary ${
        isSelected
          ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
          : 'bg-glass-primary border-glass-border text-text-primary hover:border-accent-blue/50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <IconComponent iconName={model.icon} className="w-5 h-5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm truncate">{model.name}</h4>
            <div className="flex items-center space-x-1 ml-2">
              {model.popularity === 'new' && (
                <span className="px-1 py-0.5 bg-accent-yellow/20 text-accent-yellow rounded text-xs">
                  New
                </span>
              )}
              {model.popularity === 'popular' && (
                <span className="px-1 py-0.5 bg-accent-green/20 text-accent-green rounded text-xs">
                  Popular
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-text-muted mb-1">{model.brand}</p>
          <p className="text-xs text-text-secondary line-clamp-2">{model.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1">
              {model.capabilities.slice(0, 2).map((cap, idx) => (
                <span
                  key={idx}
                  className="px-1 py-0.5 bg-glass-secondary rounded text-xs text-text-muted"
                >
                  {cap}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-accent-green" />
              <span className="text-xs text-accent-green font-medium">
                {model.pricing_factor}x
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingAgent
}) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    ai_model: null as AIModel | null,
    skills: [] as string[],
    description: '',
    pricing: 50,
    availability: 'in-development' as 'available' | 'in-development' | 'beta-testing',
    newSkill: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isPreview, setIsPreview] = useState(false);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const specializations = [
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
    if (editingAgent) {
      setFormData({
        name: editingAgent.name,
        specialization: editingAgent.specialization,
        ai_model: editingAgent.ai_model,
        skills: editingAgent.skills,
        description: editingAgent.description,
        pricing: editingAgent.pricing,
        availability: editingAgent.availability,
        newSkill: ''
      });
    } else {
      setFormData({
        name: '',
        specialization: '',
        ai_model: null,
        skills: [],
        description: '',
        pricing: 50,
        availability: 'in-development',
        newSkill: ''
      });
      setSearchTerm('');
      setShowModelDropdown(false);
    }
    setErrors({});
    setIsPreview(false);
  }, [editingAgent, isOpen]);

  // Handle specialization change and update available models
  useEffect(() => {
    if (formData.specialization) {
      const models = getModelsForSpecialization(formData.specialization);
      setAvailableModels(models);
      setFilteredModels(models);
      
      // Clear model selection if it doesn't match new specialization
      if (formData.ai_model && !models.find(m => m.id === formData.ai_model?.id)) {
        setFormData(prev => ({ ...prev, ai_model: null }));
      }
    } else {
      setAvailableModels([]);
      setFilteredModels([]);
      setFormData(prev => ({ ...prev, ai_model: null }));
    }
  }, [formData.specialization]);

  // Filter models based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = availableModels.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(availableModels);
    }
  }, [searchTerm, availableModels]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Agent name is required';
    }
    
    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    
    if (!formData.ai_model) {
      newErrors.ai_model = 'AI Model selection is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }
    
    if (formData.pricing < 10 || formData.pricing > 500) {
      newErrors.pricing = 'Pricing must be between 10 and 500 X402 tokens';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const customAgent: CustomAgent = {
        id: editingAgent?.id || `custom-${Date.now()}`,
        name: formData.name.trim(),
        specialization: formData.specialization,
        ai_model: formData.ai_model!,
        skills: formData.skills,
        description: formData.description.trim(),
        pricing: Math.round(formData.pricing * (formData.ai_model?.pricing_factor || 1)),
        performance_metrics: {
          rating: 4.0 + Math.random() * 1.0,
          response_time: 150 + Math.random() * 200,
          success_rate: 85 + Math.random() * 10
        },
        availability: formData.availability,
        created_at: editingAgent?.created_at || new Date().toISOString()
      };
      
      onSave(customAgent);
      onClose();
    }
  };

  const generatePreviewAgent = (): CustomAgent => {
    return {
      id: 'preview',
      name: formData.name || 'Your Agent Name',
      specialization: formData.specialization || 'Specialization',
      ai_model: formData.ai_model || { id: 'preview', name: 'No Model Selected', brand: 'Unknown', description: 'Select a model', capabilities: [], strengths: [], use_cases: [], icon: 'Bot', brand_color: '#6B7280', pricing_factor: 1, performance_score: 3, release_date: '', popularity: 'established', compatibility: [] },
      skills: formData.skills,
      description: formData.description || 'Agent description will appear here...',
      pricing: formData.ai_model ? Math.round(formData.pricing * formData.ai_model.pricing_factor) : formData.pricing,
      performance_metrics: {
        rating: 4.0 + Math.random() * 1.0,
        response_time: 150 + Math.random() * 200,
        success_rate: 85 + Math.random() * 10
      },
      availability: formData.availability,
      created_at: new Date().toISOString()
    };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-gradient-to-br from-glass-primary to-glass-secondary rounded-3xl border border-glass-border overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-glass-border bg-gradient-to-r from-accent-purple/10 to-accent-blue/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-accent-yellow" />
                <h2 className="text-h2 font-bold text-text-primary">
                  {editingAgent ? 'Edit Custom Agent' : 'Create Custom Agent'}
                </h2>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`btn-secondary px-4 py-2 ${isPreview ? 'btn-primary' : ''}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {isPreview ? 'Edit Form' : 'Preview'}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-glass-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-120px)]">
            {/* Form Section */}
            <div className={`${isPreview ? 'hidden lg:block' : 'block'} lg:w-1/2 p-6 overflow-y-auto`}>
              <div className="space-y-6">
                {/* Agent Name */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Agent Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`glass-input w-full ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your agent's name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Specialization *
                  </label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    className={`glass-input w-full ${errors.specialization ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-red-400 text-xs mt-1">{errors.specialization}</p>}
                </div>

                {/* AI Model */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    AI Model *
                  </label>
                  {formData.specialization ? (
                    <div className="space-y-3">
                      {/* Search Input */}
                      <div className="relative">
                        <IconComponent iconName="Bot" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="glass-input pl-10 w-full"
                          placeholder="Search models..."
                        />
                      </div>
                      
                      {/* Model Selection */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowModelDropdown(!showModelDropdown)}
                          className={`glass-input w-full text-left flex items-center justify-between ${errors.ai_model ? 'border-red-500' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent iconName={formData.ai_model?.icon || 'Bot'} className="w-5 h-5" />
                            <div>
                              <div className="text-text-primary font-medium">
                                {formData.ai_model ? formData.ai_model.name : 'Select an AI model'}
                              </div>
                              <div className="text-xs text-text-muted">
                                {formData.ai_model ? formData.ai_model.brand : 'Choose a model for your specialization'}
                              </div>
                            </div>
                          </div>
                          <div className="text-text-muted">
                            {showModelDropdown ? '▲' : '▼'}
                          </div>
                        </button>
                        
                        {/* Model Dropdown */}
                        {showModelDropdown && (
                          <div className="absolute z-10 w-full mt-2 bg-glass-primary border border-glass-border rounded-lg shadow-xl max-h-96 overflow-y-auto">
                            {/* Recommended Models */}
                            {getRecommendedModels(formData.specialization).length > 0 && (
                              <div className="p-3 border-b border-glass-border">
                                <h4 className="text-xs font-medium text-accent-yellow mb-2">Recommended</h4>
                                <div className="space-y-2">
                                  {getRecommendedModels(formData.specialization).map((model) => (
                                    <ModelCard
                                      key={model.id}
                                      model={model}
                                      isSelected={formData.ai_model?.id === model.id}
                                      onSelect={() => {
                                        setFormData(prev => ({ ...prev, ai_model: model }));
                                        setShowModelDropdown(false);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* All Models */}
                            <div className="p-3">
                              <h4 className="text-xs font-medium text-text-secondary mb-2">
                                {searchTerm ? `Search Results (${filteredModels.length})` : 'All Models'}
                              </h4>
                              <div className="space-y-2">
                                {filteredModels.map((model) => (
                                  <ModelCard
                                    key={model.id}
                                    model={model}
                                    isSelected={formData.ai_model?.id === model.id}
                                    onSelect={() => {
                                      setFormData(prev => ({ ...prev, ai_model: model }));
                                      setShowModelDropdown(false);
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Selected Model Details */}
                      {formData.ai_model && (
                        <div className="glass rounded-lg p-4 bg-accent-blue/10 border border-accent-blue/30">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{formData.ai_model.icon}</span>
                              <div>
                                <h4 className="font-semibold text-text-primary">{formData.ai_model.name}</h4>
                                <p className="text-sm text-accent-blue font-medium">{formData.ai_model.brand}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {formData.ai_model.popularity === 'new' && (
                                <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow rounded text-xs font-medium">
                                  New
                                </span>
                              )}
                              {formData.ai_model.popularity === 'popular' && (
                                <span className="px-2 py-1 bg-accent-green/20 text-accent-green rounded text-xs font-medium">
                                  Popular
                                </span>
                              )}
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < formData.ai_model.performance_score
                                        ? 'text-accent-yellow fill-current'
                                        : 'text-text-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-text-secondary mb-3">{formData.ai_model.description}</p>
                          
                          <div className="flex flex-wrap gap-1">
                            {formData.ai_model.capabilities.slice(0, 3).map((cap, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-glass-secondary text-text-muted rounded text-xs border border-glass-border"
                              >
                                {cap}
                              </span>
                            ))}
                            {formData.ai_model.capabilities.length > 3 && (
                              <span className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded text-xs border border-accent-blue/30">
                                +{formData.ai_model.capabilities.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border">
                            <span className="text-xs text-text-muted">Pricing Factor</span>
                            <span className="text-sm font-medium text-accent-green">
                              {formData.ai_model.pricing_factor}x
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="glass-input w-full text-center py-8 text-text-muted">
                      <IconComponent iconName="Bot" className="w-8 h-8 mx-auto opacity-50" />
                      <p>Select a specialization first to see available AI models</p>
                    </div>
                  )}
                  {errors.ai_model && <p className="text-red-400 text-xs mt-1">{errors.ai_model}</p>}
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Core Skills *
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={formData.newSkill}
                      onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                      onKeyPress={handleKeyPress}
                      className="glass-input flex-1"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="btn-primary px-4 py-2"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-lg text-sm border border-accent-blue/30"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 hover:text-red-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-400 text-xs mt-1">{errors.skills}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={`glass-input w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="Describe your agent's capabilities and purpose"
                  />
                  {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Pricing (X402 Tokens) *
                  </label>
                <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={formData.pricing}
                      onChange={(e) => setFormData(prev => ({ ...prev, pricing: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <div className="glass-input px-4 py-2 w-20 text-center">
                      {formData.pricing}
                    </div>
                  </div>
                  {formData.ai_model && (
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-text-muted">Base Price</span>
                      <span className="text-text-muted">× {formData.ai_model.pricing_factor} = </span>
                      <span className="text-accent-green font-bold">
                        {Math.round(formData.pricing * formData.ai_model.pricing_factor)} X402
                      </span>
                    </div>
                  )}
                  {errors.pricing && <p className="text-red-400 text-xs mt-1">{errors.pricing}</p>}
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Availability Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['available', 'in-development', 'beta-testing'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFormData(prev => ({ ...prev, availability: status as any }))}
                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                          formData.availability === status
                            ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
                            : 'glass border-glass-border text-text-secondary'
                        }`}
                      >
                        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className={`${isPreview ? 'block' : 'hidden lg:block'} lg:w-1/2 p-6 overflow-y-auto bg-glass-secondary/30`}>
              <AgentPreview agent={generatePreviewAgent()} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-glass-border bg-gradient-to-r from-glass-primary to-glass-secondary">
            <div className="flex justify-end space-x-3">
              <button onClick={onClose} className="btn-secondary px-6 py-3">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary px-6 py-3">
                <Save className="w-4 h-4 mr-2" />
                {editingAgent ? 'Update Agent' : 'Create Agent'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const AgentPreview: React.FC<{ agent: CustomAgent }> = ({ agent }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Live Preview</h3>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card card-hover card-glow group"
      >
        {/* Agent Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-h3 font-semibold text-text-primary mb-1 group-hover:text-gradient transition-all duration-300">
              {agent.name}
            </h4>
            <p className="text-sm text-text-secondary mb-2">{agent.specialization}</p>
            <p className="text-xs text-text-muted">Custom AI Agent</p>
          </div>
          <div className={`badge-${agent.availability === 'available' ? 'online' : agent.availability === 'beta-testing' ? 'coming-soon' : 'offline'}`}>
            {agent.availability === 'available' ? 'Available' : 
             agent.availability === 'beta-testing' ? 'Beta Testing' : 'In Development'}
          </div>
        </div>

        {/* AI Model Badge */}
        {agent.ai_model && (
          <div className="mb-4 p-3 glass rounded-lg bg-accent-blue/10 border border-accent-blue/30">
            <div className="flex items-center space-x-3">
              <IconComponent iconName={agent.ai_model.icon} className="w-5 h-5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-accent-blue">Powered by {agent.ai_model.name}</h5>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < agent.ai_model.performance_score
                            ? 'text-accent-yellow fill-current'
                            : 'text-text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-text-secondary">{agent.ai_model.brand}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3 text-accent-green" />
                <span className="text-xs text-accent-green font-medium">
                  {agent.ai_model.pricing_factor}x
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-text-secondary mb-2">Core Skills:</h5>
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
            <div className="text-xs text-text-muted mb-1">Rating</div>
            <div className="text-sm font-semibold text-text-primary">
              {agent.performance_metrics.rating.toFixed(1)} ⭐
            </div>
          </div>
          <div className="bg-glass-secondary rounded-lg p-3">
            <div className="text-xs text-text-muted mb-1">Response</div>
            <div className="text-sm font-semibold text-text-primary">
              {Math.round(agent.performance_metrics.response_time)}ms
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-secondary">Starting at</span>
          <div className="text-lg font-bold text-accent-green">
            {agent.pricing} X402
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full btn-secondary text-sm py-3 group-hover:btn-primary transition-all duration-300">
          {agent.availability === 'available' ? 'Hire Now' : 'Get Notified'}
        </button>
      </motion.div>
    </div>
  );
};

export default CreateAgentModal;
export type { CustomAgent };