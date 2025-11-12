import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  TrendingUp, 
  Shield, 
  Crown, 
  Zap, 
  Users, 
  Target, 
  Sparkles 
} from 'lucide-react';

const X402TokenSection: React.FC = () => {
  const benefits = [
    {
      icon: Coins,
      title: 'Earn Rewards',
      description: 'Get X402 tokens for agent interactions, task completions, and platform participation',
      features: [
        'Task completion rewards',
        'Performance bonuses',
        'Referral incentives',
        'Community contributions'
      ],
      gradient: 'from-accent-yellow to-orange-400',
      glowColor: 'shadow-accent-yellow/25'
    },
    {
      icon: TrendingUp,
      title: 'Stake for Returns',
      description: 'Increase your earnings through token staking with attractive yield rates',
      features: [
        '12-18% annual yield',
        'Flexible staking periods',
        'Compound rewards',
        'Liquidity options'
      ],
      gradient: 'from-accent-green to-emerald-400',
      glowColor: 'shadow-accent-green/25'
    },
    {
      icon: Shield,
      title: 'Governance Rights',
      description: 'Participate in platform decisions and shape the future of AI workforce',
      features: [
        'Voting on platform features',
        'Proposal submissions',
        'Community governance',
        'Decision influence'
      ],
      gradient: 'from-accent-blue to-blue-400',
      glowColor: 'shadow-accent-blue/25'
    },
    {
      icon: Crown,
      title: 'Premium Access',
      description: 'Unlock exclusive features, priority support, and early access to new agents',
      features: [
        'Priority agent access',
        'Exclusive features',
        'Premium support',
        'Beta program access'
      ],
      gradient: 'from-semantic-premium to-purple-400',
      glowColor: 'shadow-semantic-premium/25'
    }
  ];

  const tokenStats = [
    { label: 'Total Supply', value: '1,000,000', suffix: 'X402' },
    { label: 'Staking APY', value: '12-18', suffix: '%' },
    { label: 'Transaction Fee', value: '0.5', suffix: '%' },
    { label: 'Burn Mechanism', value: 'Quarterly', suffix: '' }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Zap className="w-8 h-8 text-accent-yellow" />
            <h2 className="text-h1 font-bold text-text-primary">
              X402 Token <span className="text-gradient">Ecosystem</span>
            </h2>
            <Zap className="w-8 h-8 text-accent-yellow" />
          </div>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto mb-8">
            Blockchain-powered token system yang merevolusi cara Anda earn, stake, dan govern 
            dalam AI workforce ecosystem dengan transparansi dan incentive yang optimal.
          </p>
          
          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {tokenStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="text-h2 font-bold text-accent-yellow mb-1">
                  {stat.value}
                  <span className="text-lg text-text-secondary">{stat.suffix}</span>
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`glass-card card-hover card-glow group ${benefit.glowColor}`}
            >
              {/* Icon and Title */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-h3 font-semibold text-text-primary mb-2 group-hover:text-gradient transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {benefit.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-accent-green rounded-full flex-shrink-0"></div>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-3 rounded-lg bg-gradient-to-r ${benefit.gradient} text-white font-semibold transition-all duration-300 hover:shadow-lg group-hover:shadow-xl`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Learn More</span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Token Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h3 className="text-h2 font-semibold text-text-primary mb-6">X402 Token Flow</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            {/* User Actions */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center border border-accent-blue/30">
                <Users className="w-8 h-8 text-accent-blue" />
              </div>
              <div className="text-sm text-text-secondary">
                <div className="font-medium">Use Agents</div>
                <div>Complete Tasks</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-accent-yellow"></div>
              <Zap className="w-5 h-5 text-accent-yellow" />
              <div className="w-8 h-0.5 bg-accent-yellow"></div>
            </div>

            {/* Token Rewards */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center border border-accent-yellow/30">
                <Coins className="w-8 h-8 text-accent-yellow" />
              </div>
              <div className="text-sm text-text-secondary">
                <div className="font-medium">Earn X402</div>
                <div>Token Rewards</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-accent-green"></div>
              <TrendingUp className="w-5 h-5 text-accent-green" />
              <div className="w-8 h-0.5 bg-accent-green"></div>
            </div>

            {/* Staking & Governance */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-semantic-premium/20 rounded-full flex items-center justify-center border border-semantic-premium/30">
                <Target className="w-8 h-8 text-semantic-premium" />
              </div>
              <div className="text-sm text-text-secondary">
                <div className="font-medium">Stake & Vote</div>
                <div>Earn More</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3">
              <Coins className="w-5 h-5 mr-2" />
              Get X402 Tokens
            </button>
            <button className="btn-secondary px-8 py-3">
              <Shield className="w-5 h-5 mr-2" />
              Learn Staking
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default X402TokenSection;