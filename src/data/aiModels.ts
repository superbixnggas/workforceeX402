export interface AIModel {
  id: string;
  name: string;
  brand: string;
  description: string;
  capabilities: string[];
  strengths: string[];
  use_cases: string[];
  icon: string; // lucide-react icon name
  brand_color: string;
  pricing_factor: number; // Multiplier for base pricing
  performance_score: number; // 1-5 scale
  release_date: string;
  popularity: 'new' | 'popular' | 'established';
  compatibility: string[]; // Specializations it works well with
}

export const AI_MODELS_DATABASE: Record<string, AIModel[]> = {
  'Coding & Development': [
    {
      id: 'gpt4-coding',
      name: 'GPT-4 Code',
      brand: 'OpenAI',
      description: 'Advanced coding with reasoning and complex problem-solving',
      capabilities: ['Multi-language Programming', 'Code Analysis', 'Bug Detection', 'Architecture Design'],
      strengths: ['Complex reasoning', 'Code explanation', 'Debugging assistance'],
      use_cases: ['Full-stack development', 'Code reviews', 'System architecture'],
      icon: 'Code',
      brand_color: '#10B981',
      pricing_factor: 1.2,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Coding & Development', 'Data Analysis']
    },
    {
      id: 'claude-sonnet',
      name: 'Claude 3.5 Sonnet',
      brand: 'Anthropic',
      description: 'Code analysis & optimization with safety focus',
      capabilities: ['Code Optimization', 'Security Analysis', 'Documentation', 'Code Review'],
      strengths: ['Security-focused', 'Clear documentation', 'Optimized code generation'],
      use_cases: ['Code optimization', 'Security audits', 'Documentation'],
      icon: 'Shield',
      brand_color: '#8B5CF6',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Coding & Development', 'Security & Cybersecurity']
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      brand: 'Google',
      description: 'Multi-language programming with Google integration',
      capabilities: ['Multi-language Support', 'Google APIs', 'Cloud Integration', 'Real-time Collaboration'],
      strengths: ['Multi-language', 'Google ecosystem', 'Cloud native'],
      use_cases: ['Google Cloud projects', 'Multi-platform apps', 'API development'],
      icon: 'Cloud',
      brand_color: '#4285F4',
      pricing_factor: 1.0,
      performance_score: 4,
      release_date: '2023-12-06',
      popularity: 'established',
      compatibility: ['Coding & Development', 'Data Analysis', 'Business Intelligence']
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      brand: 'GitHub',
      description: 'Real-time code completion and assistance',
      capabilities: ['Real-time Completion', 'Context Awareness', 'Code Generation', 'IDE Integration'],
      strengths: ['Real-time assistance', 'IDE integration', 'Context aware'],
      use_cases: ['Daily coding', 'IDE productivity', 'Quick prototyping'],
      icon: 'Zap',
      brand_color: '#24292E',
      pricing_factor: 0.9,
      performance_score: 4,
      release_date: '2021-06-29',
      popularity: 'popular',
      compatibility: ['Coding & Development']
    },
    {
      id: 'cursor-ai',
      name: 'Cursor AI',
      brand: 'Cursor',
      description: 'Full-stack development with AI pair programming',
      capabilities: ['Full-stack Generation', 'AI Pair Programming', 'Project Structure', 'Testing'],
      strengths: ['Full-stack focus', 'Project management', 'Testing automation'],
      use_cases: ['Full-stack projects', 'Project scaffolding', 'Automated testing'],
      icon: 'Terminal',
      brand_color: '#FF6B6B',
      pricing_factor: 1.3,
      performance_score: 5,
      release_date: '2024-01-01',
      popularity: 'new',
      compatibility: ['Coding & Development']
    }
  ],
  
  'Design & Creative': [
    {
      id: 'gpt4-dalle3',
      name: 'GPT-4 + DALL-E 3',
      brand: 'OpenAI',
      description: 'Creative design generation with advanced reasoning',
      capabilities: ['Visual Design', 'Creative Concepts', 'Brand Guidelines', 'User Experience'],
      strengths: ['Creative reasoning', 'Brand consistency', 'UX focus'],
      use_cases: ['Brand design', 'UI/UX concepts', 'Creative campaigns'],
      icon: 'Palette',
      brand_color: '#10B981',
      pricing_factor: 1.4,
      performance_score: 5,
      release_date: '2023-09-20',
      popularity: 'popular',
      compatibility: ['Design & Creative', 'Marketing & Sales']
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      brand: 'Midjourney',
      description: 'Visual concept creation with artistic flair',
      capabilities: ['Artistic Generation', 'Concept Art', 'Style Transfer', 'Visual Storytelling'],
      strengths: ['Artistic quality', 'Style diversity', 'Concept visualization'],
      use_cases: ['Concept art', 'Marketing visuals', 'Brand imagery'],
      icon: 'Camera',
      brand_color: '#6366F1',
      pricing_factor: 1.5,
      performance_score: 4,
      release_date: '2022-07-12',
      popularity: 'popular',
      compatibility: ['Design & Creative']
    },
    {
      id: 'adobe-firefly',
      name: 'Adobe Firefly',
      brand: 'Adobe',
      description: 'Design automation with creative suite integration',
      capabilities: ['Creative Suite Integration', 'Brand Consistency', 'Asset Generation', 'Design Automation'],
      strengths: ['Adobe ecosystem', 'Brand compliance', 'Workflow automation'],
      use_cases: ['Brand assets', 'Marketing materials', 'Design systems'],
      icon: 'Flame',
      brand_color: '#FF0000',
      pricing_factor: 1.2,
      performance_score: 4,
      release_date: '2023-05-23',
      popularity: 'new',
      compatibility: ['Design & Creative', 'Marketing & Sales']
    },
    {
      id: 'figma-ai',
      name: 'Figma AI',
      brand: 'Figma',
      description: 'Interface design assistance and prototyping',
      capabilities: ['Interface Design', 'Prototyping', 'Design Systems', 'Collaboration'],
      strengths: ['UI focus', 'Real-time collaboration', 'Design systems'],
      use_cases: ['UI design', 'Prototyping', 'Design systems'],
      icon: 'Layout',
      brand_color: '#F24E1E',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2024-03-15',
      popularity: 'new',
      compatibility: ['Design & Creative']
    },
    {
      id: 'canva-ai',
      name: 'Canva AI',
      brand: 'Canva',
      description: 'Template optimization and design assistance',
      capabilities: ['Template Optimization', 'Brand Templates', 'Content Generation', 'Design Automation'],
      strengths: ['Template focus', 'Easy to use', 'Brand templates'],
      use_cases: ['Social media', 'Marketing materials', 'Quick design'],
      icon: 'Image',
      brand_color: '#00C4CC',
      pricing_factor: 0.8,
      performance_score: 3,
      release_date: '2023-11-08',
      popularity: 'established',
      compatibility: ['Design & Creative', 'Marketing & Sales']
    }
  ],

  'Data Analysis & Analytics': [
    {
      id: 'gpt4-analytics',
      name: 'GPT-4 Advanced Analytics',
      brand: 'OpenAI',
      description: 'Complex data insights with advanced reasoning',
      capabilities: ['Statistical Analysis', 'Predictive Modeling', 'Data Visualization', 'Insight Generation'],
      strengths: ['Complex analysis', 'Insight generation', 'Visualization'],
      use_cases: ['Business intelligence', 'Predictive analytics', 'Data reporting'],
      icon: 'BarChart3',
      brand_color: '#10B981',
      pricing_factor: 1.3,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Data Analysis & Analytics', 'Business Intelligence', 'Financial Trading']
    },
    {
      id: 'claude-analysis',
      name: 'Claude 3.5 Analysis',
      brand: 'Anthropic',
      description: 'Statistical analysis with data safety focus',
      capabilities: ['Statistical Modeling', 'Data Privacy', 'Compliance Analysis', 'Risk Assessment'],
      strengths: ['Privacy focused', 'Compliance ready', 'Risk analysis'],
      use_cases: ['Financial analysis', 'Compliance reporting', 'Risk assessment'],
      icon: 'Shield',
      brand_color: '#8B5CF6',
      pricing_factor: 1.2,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Data Analysis & Analytics', 'Financial Trading', 'Legal & Compliance']
    },
    {
      id: 'gemini-analytics',
      name: 'Gemini Pro Analytics',
      brand: 'Google',
      description: 'Predictive modeling with Google Cloud integration',
      capabilities: ['Predictive Modeling', 'Google Analytics', 'Cloud Processing', 'Real-time Analysis'],
      strengths: ['Cloud native', 'Real-time processing', 'Predictive focus'],
      use_cases: ['Cloud analytics', 'Real-time dashboards', 'Predictive insights'],
      icon: 'Cloud',
      brand_color: '#4285F4',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2023-12-06',
      popularity: 'established',
      compatibility: ['Data Analysis & Analytics', 'Business Intelligence']
    },
    {
      id: 'jupyter-ai',
      name: 'Jupyter AI',
      brand: 'Project Jupyter',
      description: 'Code generation for data science workflows',
      capabilities: ['Code Generation', 'Notebook Integration', 'Data Exploration', 'Reproducible Analysis'],
      strengths: ['Code focused', 'Reproducible', 'Notebook native'],
      use_cases: ['Data science', 'Research analysis', 'Academic research'],
      icon: 'FileText',
      brand_color: '#DA5B0B',
      pricing_factor: 0.9,
      performance_score: 4,
      release_date: '2023-09-12',
      popularity: 'established',
      compatibility: ['Data Analysis & Analytics']
    },
    {
      id: 'tableau-ai',
      name: 'Tableau AI',
      brand: 'Tableau',
      description: 'Business intelligence with automated insights',
      capabilities: ['Business Intelligence', 'Automated Insights', 'Dashboard Creation', 'Data Storytelling'],
      strengths: ['BI focused', 'Automated insights', 'Dashboard automation'],
      use_cases: ['Business reporting', 'Executive dashboards', 'Data storytelling'],
      icon: 'TrendingUp',
      brand_color: '#1F77B4',
      pricing_factor: 1.4,
      performance_score: 4,
      release_date: '2024-02-28',
      popularity: 'new',
      compatibility: ['Data Analysis & Analytics', 'Business Intelligence']
    }
  ],

  'Marketing & Sales': [
    {
      id: 'gpt4-marketing',
      name: 'GPT-4 Marketing',
      brand: 'OpenAI',
      description: 'Campaign optimization with audience targeting',
      capabilities: ['Campaign Optimization', 'Audience Analysis', 'Content Strategy', 'A/B Testing'],
      strengths: ['Campaign focus', 'Audience insights', 'Strategy development'],
      use_cases: ['Marketing campaigns', 'Audience targeting', 'Content strategy'],
      icon: 'Target',
      brand_color: '#10B981',
      pricing_factor: 1.2,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Marketing & Sales', 'Customer Service']
    },
    {
      id: 'claude-content',
      name: 'Claude 3.5 Content',
      brand: 'Anthropic',
      description: 'Content strategy with brand consistency focus',
      capabilities: ['Content Strategy', 'Brand Guidelines', 'SEO Optimization', 'Brand Voice'],
      strengths: ['Brand consistency', 'SEO focused', 'Voice development'],
      use_cases: ['Content strategy', 'Brand voice', 'SEO content'],
      icon: 'PenTool',
      brand_color: '#8B5CF6',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Marketing & Sales', 'Design & Creative']
    },
    {
      id: 'hubspot-ai',
      name: 'HubSpot AI',
      brand: 'HubSpot',
      description: 'CRM automation with lead generation',
      capabilities: ['CRM Automation', 'Lead Generation', 'Sales Forecasting', 'Customer Insights'],
      strengths: ['CRM native', 'Lead generation', 'Sales forecasting'],
      use_cases: ['Lead generation', 'Sales automation', 'CRM optimization'],
      icon: 'Users',
      brand_color: '#FF7A59',
      pricing_factor: 1.3,
      performance_score: 4,
      release_date: '2023-10-15',
      popularity: 'established',
      compatibility: ['Marketing & Sales', 'Customer Service']
    },
    {
      id: 'instantly-ai',
      name: 'Instantly AI',
      brand: 'Instantly',
      description: 'Email automation with personalization',
      capabilities: ['Email Automation', 'Personalization', 'Cold Outreach', 'Response Optimization'],
      strengths: ['Email focused', 'Personalization', 'Cold outreach'],
      use_cases: ['Cold email', 'Outreach campaigns', 'Lead nurturing'],
      icon: 'Mail',
      brand_color: '#4F46E5',
      pricing_factor: 1.0,
      performance_score: 3,
      release_date: '2023-08-20',
      popularity: 'established',
      compatibility: ['Marketing & Sales', 'Customer Service']
    }
  ],

  'Customer Service': [
    {
      id: 'gpt4-support',
      name: 'GPT-4 Support',
      brand: 'OpenAI',
      description: 'Complex query resolution with context understanding',
      capabilities: ['Query Resolution', 'Context Understanding', 'Multi-language', 'Escalation Detection'],
      strengths: ['Complex queries', 'Context aware', 'Multi-language'],
      use_cases: ['Customer support', 'Technical assistance', 'Multi-language support'],
      icon: 'MessageCircle',
      brand_color: '#10B981',
      pricing_factor: 1.1,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Customer Service', 'Voice & Communication']
    },
    {
      id: 'claude-empathetic',
      name: 'Claude 3.5 Empathetic',
      brand: 'Anthropic',
      description: 'Empathetic responses with emotional intelligence',
      capabilities: ['Emotional Intelligence', 'Empathetic Responses', 'Conflict Resolution', 'Tone Adaptation'],
      strengths: ['Emotional intelligence', 'Empathy focus', 'Tone adaptation'],
      use_cases: ['Emotional support', 'Conflict resolution', 'Sensitive conversations'],
      icon: 'Heart',
      brand_color: '#8B5CF6',
      pricing_factor: 1.2,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Customer Service', 'Healthcare & Medical']
    },
    {
      id: 'intercom-fin',
      name: 'Intercom Fin',
      brand: 'Intercom',
      description: 'Multi-language support with business context',
      capabilities: ['Multi-language Support', 'Business Context', 'Knowledge Base', 'Conversation Flow'],
      strengths: ['Business context', 'Knowledge base', 'Multi-language'],
      use_cases: ['Customer queries', 'Product support', 'Business assistance'],
      icon: 'Globe',
      brand_color: '#1F8CEB',
      pricing_factor: 1.0,
      performance_score: 4,
      release_date: '2023-07-10',
      popularity: 'established',
      compatibility: ['Customer Service', 'Voice & Communication']
    },
    {
      id: 'zendesk-ai',
      name: 'Zendesk AI',
      brand: 'Zendesk',
      description: 'Ticket automation with routing optimization',
      capabilities: ['Ticket Automation', 'Smart Routing', 'SLA Management', 'Priority Detection'],
      strengths: ['Ticket focused', 'Smart routing', 'SLA management'],
      use_cases: ['Ticket management', 'Support routing', 'SLA optimization'],
      icon: 'Ticket',
      brand_color: '#03363D',
      pricing_factor: 0.9,
      performance_score: 3,
      release_date: '2023-05-18',
      popularity: 'established',
      compatibility: ['Customer Service']
    },
    {
      id: 'ada-ai',
      name: 'Ada',
      brand: 'Ada',
      description: 'Conversational AI with platform integration',
      capabilities: ['Conversational AI', 'Platform Integration', 'Workflow Automation', 'Custom Flows'],
      strengths: ['Conversational focus', 'Platform integration', 'Custom flows'],
      use_cases: ['Chatbots', 'Conversational interfaces', 'Workflow automation'],
      icon: 'Bot',
      brand_color: '#6734FF',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2023-12-01',
      popularity: 'new',
      compatibility: ['Customer Service', 'Voice & Communication']
    }
  ],

  'Security & Cybersecurity': [
    {
      id: 'gpt4-security',
      name: 'GPT-4 Security',
      brand: 'OpenAI',
      description: 'Threat analysis with security reasoning',
      capabilities: ['Threat Analysis', 'Vulnerability Assessment', 'Security Documentation', 'Risk Evaluation'],
      strengths: ['Security reasoning', 'Threat analysis', 'Risk assessment'],
      use_cases: ['Security analysis', 'Threat detection', 'Risk assessment'],
      icon: 'Lock',
      brand_color: '#10B981',
      pricing_factor: 1.4,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Security & Cybersecurity', 'Data Analysis & Analytics']
    },
    {
      id: 'claude-security',
      name: 'Claude 3.5 Security',
      brand: 'Anthropic',
      description: 'Security documentation with compliance focus',
      capabilities: ['Security Documentation', 'Compliance Analysis', 'Policy Generation', 'Audit Support'],
      strengths: ['Compliance focus', 'Documentation', 'Policy generation'],
      use_cases: ['Compliance reporting', 'Policy documentation', 'Audit support'],
      icon: 'FileText',
      brand_color: '#8B5CF6',
      pricing_factor: 1.3,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Security & Cybersecurity', 'Legal & Compliance']
    },
    {
      id: 'crowdstrike',
      name: 'CrowdStrike',
      brand: 'CrowdStrike',
      description: 'Endpoint protection with AI threat hunting',
      capabilities: ['Endpoint Protection', 'Threat Hunting', 'Behavioral Analysis', 'Incident Response'],
      strengths: ['Endpoint focus', 'Threat hunting', 'Behavioral analysis'],
      use_cases: ['Endpoint security', 'Threat hunting', 'Incident response'],
      icon: 'Shield',
      brand_color: '#FF6B35',
      pricing_factor: 1.5,
      performance_score: 5,
      release_date: '2023-01-15',
      popularity: 'established',
      compatibility: ['Security & Cybersecurity']
    },
    {
      id: 'sentinelone',
      name: 'SentinelOne',
      brand: 'SentinelOne',
      description: 'AI-powered threat hunting and response',
      capabilities: ['AI Threat Hunting', 'Automated Response', 'Forensic Analysis', 'Threat Intelligence'],
      strengths: ['AI powered', 'Automated response', 'Forensic analysis'],
      use_cases: ['Threat hunting', 'Automated response', 'Forensic investigation'],
      icon: 'Target',
      brand_color: '#E53E3E',
      pricing_factor: 1.6,
      performance_score: 4,
      release_date: '2023-04-20',
      popularity: 'established',
      compatibility: ['Security & Cybersecurity']
    }
  ],

  'Voice & Communication': [
    {
      id: 'gpt4-voice',
      name: 'GPT-4 Voice',
      brand: 'OpenAI',
      description: 'Natural conversation with context retention',
      capabilities: ['Natural Conversation', 'Context Retention', 'Voice Synthesis', 'Emotion Detection'],
      strengths: ['Natural conversation', 'Context retention', 'Emotion detection'],
      use_cases: ['Voice assistants', 'Customer service', 'Personal assistants'],
      icon: 'Mic',
      brand_color: '#10B981',
      pricing_factor: 1.3,
      performance_score: 5,
      release_date: '2023-11-06',
      popularity: 'popular',
      compatibility: ['Voice & Communication', 'Customer Service']
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      brand: 'ElevenLabs',
      description: 'Voice synthesis with emotional expression',
      capabilities: ['Voice Synthesis', 'Emotional Expression', 'Multi-language', 'Custom Voices'],
      strengths: ['Voice quality', 'Emotional expression', 'Custom voices'],
      use_cases: ['Voice overs', 'Audiobooks', 'Character voices'],
      icon: 'Volume2',
      brand_color: '#FF6B6B',
      pricing_factor: 1.4,
      performance_score: 5,
      release_date: '2023-09-20',
      popularity: 'popular',
      compatibility: ['Voice & Communication', 'Design & Creative']
    },
    {
      id: 'bland-ai',
      name: 'Bland AI',
      brand: 'Bland',
      description: 'Call automation with conversation flow',
      capabilities: ['Call Automation', 'Conversation Flow', 'Lead Qualification', 'Appointment Setting'],
      strengths: ['Call focused', 'Lead qualification', 'Appointment setting'],
      use_cases: ['Sales calls', 'Lead qualification', 'Appointment scheduling'],
      icon: 'Phone',
      brand_color: '#8B5CF6',
      pricing_factor: 1.2,
      performance_score: 4,
      release_date: '2024-01-30',
      popularity: 'new',
      compatibility: ['Voice & Communication', 'Marketing & Sales']
    },
    {
      id: 'retell-ai',
      name: 'Retell AI',
      brand: 'Retell',
      description: 'Voice interfaces with natural interaction',
      capabilities: ['Voice Interfaces', 'Natural Interaction', 'Integration Ready', 'Real-time Processing'],
      strengths: ['Voice interfaces', 'Natural interaction', 'Integration ready'],
      use_cases: ['Voice apps', 'Voice interfaces', 'Voice automation'],
      icon: 'Headphones',
      brand_color: '#06B6D4',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2024-03-10',
      popularity: 'new',
      compatibility: ['Voice & Communication', 'Productivity & Automation']
    }
  ],

  'Productivity & Automation': [
    {
      id: 'gpt4-workflow',
      name: 'GPT-4 Workflow',
      brand: 'OpenAI',
      description: 'Workflow optimization with process automation',
      capabilities: ['Workflow Optimization', 'Process Automation', 'Task Management', 'Integration APIs'],
      strengths: ['Workflow focus', 'Process automation', 'API integration'],
      use_cases: ['Workflow optimization', 'Process automation', 'Task management'],
      icon: 'Settings',
      brand_color: '#10B981',
      pricing_factor: 1.2,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Productivity & Automation', 'Data Analysis & Analytics']
    },
    {
      id: 'notion-ai',
      name: 'Notion AI',
      brand: 'Notion',
      description: 'Knowledge management with intelligent organization',
      capabilities: ['Knowledge Management', 'Smart Organization', 'Content Generation', 'Team Collaboration'],
      strengths: ['Knowledge focus', 'Smart organization', 'Team collaboration'],
      use_cases: ['Knowledge bases', 'Team documentation', 'Content organization'],
      icon: 'BookOpen',
      brand_color: '#000000',
      pricing_factor: 1.0,
      performance_score: 4,
      release_date: '2023-02-22',
      popularity: 'established',
      compatibility: ['Productivity & Automation', 'Customer Service']
    },
    {
      id: 'clickup-ai',
      name: 'ClickUp AI',
      brand: 'ClickUp',
      description: 'Project automation with team coordination',
      capabilities: ['Project Automation', 'Team Coordination', 'Progress Tracking', 'Resource Optimization'],
      strengths: ['Project focus', 'Team coordination', 'Resource optimization'],
      use_cases: ['Project management', 'Team coordination', 'Resource planning'],
      icon: 'CheckSquare',
      brand_color: '#7B68EE',
      pricing_factor: 1.1,
      performance_score: 4,
      release_date: '2024-01-15',
      popularity: 'new',
      compatibility: ['Productivity & Automation', 'Business Intelligence']
    },
    {
      id: 'airtable-ai',
      name: 'Airtable AI',
      brand: 'Airtable',
      description: 'Database automation with intelligent workflows',
      capabilities: ['Database Automation', 'Intelligent Workflows', 'Data Processing', 'Record Management'],
      strengths: ['Database focus', 'Intelligent workflows', 'Data processing'],
      use_cases: ['Database management', 'Workflow automation', 'Data processing'],
      icon: 'Database',
      brand_color: '#18BFFF',
      pricing_factor: 0.9,
      performance_score: 4,
      release_date: '2023-11-30',
      popularity: 'established',
      compatibility: ['Productivity & Automation', 'Data Analysis & Analytics']
    }
  ],

  'Healthcare & Medical': [
    {
      id: 'gpt4-medical',
      name: 'GPT-4 Medical',
      brand: 'OpenAI',
      description: 'Clinical documentation with medical knowledge',
      capabilities: ['Clinical Documentation', 'Medical Knowledge', 'Patient Communication', 'Treatment Support'],
      strengths: ['Medical knowledge', 'Clinical focus', 'Patient communication'],
      use_cases: ['Clinical documentation', 'Patient communication', 'Treatment planning'],
      icon: 'Stethoscope',
      brand_color: '#10B981',
      pricing_factor: 1.5,
      performance_score: 4,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Healthcare & Medical', 'Customer Service']
    },
    {
      id: 'claude-medical',
      name: 'Claude 3.5 Medical',
      brand: 'Anthropic',
      description: 'Medical research with safety protocols',
      capabilities: ['Medical Research', 'Safety Protocols', 'Literature Review', 'Compliance Support'],
      strengths: ['Medical research', 'Safety focus', 'Literature review'],
      use_cases: ['Medical research', 'Literature review', 'Compliance documentation'],
      icon: 'Microscope',
      brand_color: '#8B5CF6',
      pricing_factor: 1.6,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Healthcare & Medical', 'Legal & Compliance']
    }
  ],

  'Legal & Compliance': [
    {
      id: 'gpt4-legal',
      name: 'GPT-4 Legal',
      brand: 'OpenAI',
      description: 'Legal research with case law analysis',
      capabilities: ['Legal Research', 'Case Law Analysis', 'Contract Review', 'Compliance Monitoring'],
      strengths: ['Legal research', 'Case analysis', 'Contract review'],
      use_cases: ['Legal research', 'Contract analysis', 'Compliance monitoring'],
      icon: 'Scale',
      brand_color: '#10B981',
      pricing_factor: 1.4,
      performance_score: 4,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Legal & Compliance', 'Security & Cybersecurity']
    },
    {
      id: 'claude-legal',
      name: 'Claude 3.5 Legal',
      brand: 'Anthropic',
      description: 'Contract analysis with risk assessment',
      capabilities: ['Contract Analysis', 'Risk Assessment', 'Regulatory Compliance', 'Document Review'],
      strengths: ['Contract analysis', 'Risk assessment', 'Regulatory focus'],
      use_cases: ['Contract analysis', 'Risk assessment', 'Regulatory compliance'],
      icon: 'FileText',
      brand_color: '#8B5CF6',
      pricing_factor: 1.5,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Legal & Compliance', 'Security & Cybersecurity']
    },
    {
      id: 'spellbook',
      name: 'Spellbook',
      brand: 'Spellbook',
      description: 'Document drafting with legal templates',
      capabilities: ['Document Drafting', 'Legal Templates', 'Clause Generation', 'Document Review'],
      strengths: ['Document drafting', 'Legal templates', 'Clause generation'],
      use_cases: ['Document drafting', 'Contract templates', 'Legal document review'],
      icon: 'PenTool',
      brand_color: '#6366F1',
      pricing_factor: 1.3,
      performance_score: 4,
      release_date: '2023-08-15',
      popularity: 'established',
      compatibility: ['Legal & Compliance']
    }
  ],

  'Financial Trading': [
    {
      id: 'gpt4-finance',
      name: 'GPT-4 Finance',
      brand: 'OpenAI',
      description: 'Financial modeling with market analysis',
      capabilities: ['Financial Modeling', 'Market Analysis', 'Risk Assessment', 'Portfolio Optimization'],
      strengths: ['Financial modeling', 'Market analysis', 'Risk assessment'],
      use_cases: ['Financial analysis', 'Market research', 'Portfolio management'],
      icon: 'DollarSign',
      brand_color: '#10B981',
      pricing_factor: 1.5,
      performance_score: 4,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Financial Trading', 'Data Analysis & Analytics']
    },
    {
      id: 'claude-finance',
      name: 'Claude 3.5 Finance',
      brand: 'Anthropic',
      description: 'Risk assessment with regulatory compliance',
      capabilities: ['Risk Assessment', 'Regulatory Compliance', 'Market Research', 'Due Diligence'],
      strengths: ['Risk assessment', 'Regulatory focus', 'Due diligence'],
      use_cases: ['Risk analysis', 'Regulatory compliance', 'Market research'],
      icon: 'BarChart3',
      brand_color: '#8B5CF6',
      pricing_factor: 1.6,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Financial Trading', 'Legal & Compliance']
    },
    {
      id: 'trading-ai',
      name: 'Trading AI',
      brand: 'TradingAI',
      description: 'Portfolio management with algorithmic trading',
      capabilities: ['Portfolio Management', 'Algorithmic Trading', 'Market Prediction', 'Trade Execution'],
      strengths: ['Portfolio focus', 'Algorithmic trading', 'Market prediction'],
      use_cases: ['Portfolio management', 'Automated trading', 'Market analysis'],
      icon: 'TrendingUp',
      brand_color: '#22C55E',
      pricing_factor: 1.8,
      performance_score: 5,
      release_date: '2023-12-01',
      popularity: 'established',
      compatibility: ['Financial Trading', 'Data Analysis & Analytics']
    }
  ],

  'Business Intelligence': [
    {
      id: 'gpt4-bi',
      name: 'GPT-4 Business Intelligence',
      brand: 'OpenAI',
      description: 'Executive insights with strategic analysis',
      capabilities: ['Executive Insights', 'Strategic Analysis', 'KPI Monitoring', 'Decision Support'],
      strengths: ['Executive focus', 'Strategic analysis', 'Decision support'],
      use_cases: ['Executive dashboards', 'Strategic planning', 'Decision support'],
      icon: 'BarChart3',
      brand_color: '#10B981',
      pricing_factor: 1.4,
      performance_score: 5,
      release_date: '2023-03-14',
      popularity: 'popular',
      compatibility: ['Business Intelligence', 'Data Analysis & Analytics']
    },
    {
      id: 'claude-bi',
      name: 'Claude 3.5 BI',
      brand: 'Anthropic',
      description: 'Data insights with predictive analytics',
      capabilities: ['Data Insights', 'Predictive Analytics', 'Trend Analysis', 'Anomaly Detection'],
      strengths: ['Data insights', 'Predictive focus', 'Anomaly detection'],
      use_cases: ['Data analysis', 'Trend analysis', 'Anomaly detection'],
      icon: 'Search',
      brand_color: '#8B5CF6',
      pricing_factor: 1.3,
      performance_score: 4,
      release_date: '2024-06-20',
      popularity: 'new',
      compatibility: ['Business Intelligence', 'Data Analysis & Analytics']
    }
  ]
};

export function getModelsForSpecialization(specialization: string): AIModel[] {
  return AI_MODELS_DATABASE[specialization] || [];
}

export function getRecommendedModels(specialization: string): AIModel[] {
  const models = getModelsForSpecialization(specialization);
  return models.filter(model => model.popularity === 'popular' || model.popularity === 'new');
}

export function getModelById(id: string): AIModel | undefined {
  for (const specialization in AI_MODELS_DATABASE) {
    const model = AI_MODELS_DATABASE[specialization].find(m => m.id === id);
    if (model) return model;
  }
  return undefined;
}