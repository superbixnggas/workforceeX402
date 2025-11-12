/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
			extend: {
				gridTemplateColumns: {
					'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
					'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
				},
				fontFamily: {
				primary: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			colors: {
				// Glassmorphism Colors
				glass: {
					primary: 'rgba(255, 255, 255, 0.08)',
					secondary: 'rgba(255, 255, 255, 0.05)',
					elevated: 'rgba(255, 255, 255, 0.12)',
					border: 'rgba(255, 255, 255, 0.18)',
					'border-strong': 'rgba(255, 255, 255, 0.25)',
				},
				// Accent Colors
				accent: {
					yellow: '#FFD700',
					green: '#10b981',
					blue: '#3b82f6',
					pink: '#ec4899',
				},
				// Text Colors
				text: {
					primary: '#FFFFFF',
					secondary: '#CBD5E1',
					muted: '#94A3B8',
					accent: '#FFD700',
				},
				// Semantic Colors
				semantic: {
					success: '#10b981',
					warning: '#f59e0b',
					info: '#3b82f6',
					premium: '#a855f7',
				},
				// Keep some defaults for shadcn compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#4A90E2',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 35%, #0f0f23 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-hero-overlay': 'linear-gradient(180deg, rgba(26,26,46,0) 0%, rgba(26,26,46,0.8) 100%)',
			},
			borderRadius: {
				'sm': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '32px',
			},
			spacing: {
				'xs': '8px',
				'sm': '16px',
				'md': '24px',
				'lg': '32px',
				'xl': '48px',
				'2xl': '64px',
				'3xl': '96px',
				'4xl': '128px',
			},
			fontSize: {
				'hero': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'h1': ['40px', { lineHeight: '1.3' }],
				'h2': ['32px', { lineHeight: '1.3' }],
				'h3': ['24px', { lineHeight: '1.4' }],
				'body-large': ['20px', { lineHeight: '1.6' }],
				'body': ['16px', { lineHeight: '1.6' }],
				'small': ['14px', { lineHeight: '1.5' }],
				'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'shimmer': 'shimmer 3s linear infinite',
				'fade-in': 'fadeIn 0.8s ease-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'slide-down': 'slideDown 0.6s ease-out',
				'particles': 'particles 20s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
					'100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideDown: {
					'0%': { opacity: '0', transform: 'translateY(-40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				particles: {
					'0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			backdropBlur: {
				'xs': '2px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}