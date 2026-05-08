# BeyondCareer - Master Strategic Logic

A 5-week high-performance intensive designed to decode the internal logic of MBB strategy firms.

## 🎯 Project Overview

BeyondCareer is a premium consulting education platform that helps aspiring strategy consultants master the frameworks, thinking patterns, and skills required to succeed at top-tier firms like McKinsey, BCG, and Bain.

## ✨ Recent Updates

### Design System Implementation
The application has been redesigned following the **Build Something Wonderful** design system specifications:

- ✅ **Typography**: Inter font family with semantic type scale (17px base)
- ✅ **Colors**: OKLAB-based color system with semantic tokens
- ✅ **Spacing**: Consistent spacing scale (10px, 20px, 32px, 40px, 48px, 96px)
- ✅ **Accessibility**: WCAG 2.2 AA compliant with comprehensive keyboard navigation
- ✅ **Motion**: Standardized transitions (150ms, 200ms, 300ms)
- ✅ **Component States**: All interactive elements define 7 states (default, hover, focus, active, disabled, loading, error)

### Deployment Fix
Project structure has been corrected for seamless deployment to hosting platforms like Vercel and Netlify.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd beyondcareer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Remove dist folder

## 🏗️ Project Structure

```
.
├── public/                 # Static assets
│   ├── blob.png
│   ├── ceo.png
│   ├── faq_illustration.png
│   ├── founder.png
│   ├── robot-bulb.png
│   └── robot-head.png
├── src/                    # Source code
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles & design system
│   └── main.tsx           # Application entry point
├── .env.example           # Environment variables template
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── DESIGN_SYSTEM.md       # Design system documentation
├── REDESIGN_SUMMARY.md    # Redesign details
├── DEPLOYMENT_FIX.md      # Deployment guide
└── DESIGN_CHANGES.md      # Before/after comparison
```

## 🎨 Design System

The application follows a comprehensive design system with:

### Typography
- **Font**: Inter (with lastik fallback)
- **Base Size**: 17px
- **Scale**: 16px, 17px, 18px, 20px, 30px, 32px, 36px, 50px

### Colors (Semantic Tokens)
- `--color-text-primary`: oklab(0 0 0 / 0.7)
- `--color-surface-base`: #000000
- `--color-surface-raised`: #197dd8
- `--color-surface-muted`: #ffffff

### Spacing Scale
- `--space-1`: 10px
- `--space-2`: 20px
- `--space-3`: 32px
- `--space-4`: 40px
- `--space-5`: 48px
- `--space-6`: 96px

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

## ♿ Accessibility

The application is **WCAG 2.2 AA compliant** with:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Visible focus indicators
- ✅ Sufficient color contrast
- ✅ ARIA labels and semantic HTML
- ✅ Touch target sizes (44x44px minimum)

### Testing Accessibility

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for navigation (where applicable)

**Screen Readers:**
- Test with NVDA (Windows)
- Test with JAWS (Windows)
- Test with VoiceOver (macOS/iOS)

## 🚢 Deployment

### Deploy to Vercel

1. **Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import repository in Vercel dashboard
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy!

### Deploy to Netlify

1. **Via Netlify CLI**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

2. **Via Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import repository in Netlify dashboard
   - Build settings auto-detected
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy!

See [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) for detailed deployment instructions.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1
- **Animations**: Framer Motion 12
- **3D Graphics**: Three.js + React Three Fiber
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **AI**: Google Gemini API

## 📚 Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete design system documentation
- [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md) - Detailed redesign summary
- [DEPLOYMENT_FIX.md](./DEPLOYMENT_FIX.md) - Deployment troubleshooting
- [DESIGN_CHANGES.md](./DESIGN_CHANGES.md) - Before/after comparison
- [PRODUCT.md](./PRODUCT.md) - Product specifications

## 🧪 Testing

### Manual Testing Checklist
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content correctly
- [ ] All focus indicators are visible
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are adequate size

### Automated Testing
```bash
# Run TypeScript checks
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Copyright © 2026 Beyond Career Pvt Ltd. All rights reserved.

## 🔗 Links

- **Live Site**: [Coming Soon]
- **AI Studio**: https://ai.studio/apps/e5e96931-a4a8-4694-a411-c1554c685105
- **Documentation**: See docs folder

## 💬 Support

For questions or support, please contact:
- Email: [Your Email]
- Website: [Your Website]

---

**Built with ❤️ by the BeyondCareer team**

*Precision-engineered for strategic minds.*
